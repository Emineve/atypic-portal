import os
from supabase import create_client

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Les variables SUPABASE_URL et SUPABASE_SERVICE_KEY doivent être configurées.")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

SHOWCASE_LISTINGS = [
    {
        "source_agency": "Architecture de Collection",
        "source_url": "https://www.architecturedecollection.fr/exemple-atelier-montparnasse",
        "source_id": "ADC-75014",
        "title": "Atelier d'artiste sous verrière zénithale d'époque",
        "short_description": "Dans une allée arborée mythique de Montparnasse, volume spectaculaire de 115m² avec 5,80m de hauteur sous plafond et verrière métallique d'origine.",
        "price": 1490000.0,
        "surface_sqm": 115.0,
        "rooms": 4,
        "bedrooms": 2,
        "city": "Paris 14e",
        "postal_code": "75014",
        "district": "Montparnasse",
        "atypic_category": "Atelier d'artiste",
        "atypic_tags": ["Verrière zénithale", "HSP 5.8m", "Allée privée"],
        "curation_score": 0.98,
        "cover_image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "is_active": True
    },
    {
        "source_agency": "Espaces Atypiques",
        "source_url": "https://www.espaces-atypiques.com/exemple-peniche-neuilly",
        "source_id": "EA-92200",
        "title": "Bateau-logement Frey
