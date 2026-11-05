import os
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Les variables SUPABASE_URL et SUPABASE_SERVICE_KEY doivent être définies.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def upsert_listing(listing_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Insère une nouvelle annonce ou met à jour les champs dynamiques (prix, statut, dernière vue)
    en s'appuyant sur l'unicité de 'source_url'.
    """
    now_iso = datetime.now(timezone.utc).isoformat()
    
    payload = {
        **listing_data,
        "is_active": True,
        "last_scraped_at": now_iso
    }

    try:
        response = supabase.table("listings").upsert(
            payload,
            on_conflict="source_url"
        ).execute()
        
        if response.data:
            print(f"✅ Annonce synchronisée : {listing_data.get('title')} ({listing_data.get('source_agency')})")
            return response.data[0]
        return None

    except Exception as e:
        print(f"❌ Erreur lors de l'upsert de l'annonce {listing_data.get('source_url')}: {e}")
        return None

def mark_missing_listings_as_inactive(source_agency: str, seen_urls: list):
    """
    Désactive automatiquement les annonces qui ne sont plus présentes sur le site source.
    À exécuter à la fin de chaque session de scraping complète d'une agence.
    """
    try:
        now_iso = datetime.now(timezone.utc).isoformat()
        
        existing = supabase.table("listings").select("id, source_url").eq("source_agency", source_agency).eq("is_active", True).execute()
        
        for item in existing.data:
            if item["source_url"] not in seen_urls:
                supabase.table("listings").update({
                    "is_active": False,
                    "sold_or_removed_at": now_iso
                }).eq("id", item["id"]).execute()
                print(f"📦 Archivée (retirée de la vente) : {item['source_url']}")

    except Exception as e:
        print(f"❌ Erreur lors du nettoyage des annonces obsolètes : {e}")
