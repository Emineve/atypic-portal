import os
import sys
from datetime import datetime

# Import des modules d'extraction et de gestion
from scraper_archicollect import scrape_architecture_de_collection
from scraper_archik import scrape_archik_paris
from scraper_junot import scrape_junot_paris
from classifier_junot import evaluate_listing_with_ai, has_atypic_keywords
from db_manager import upsert_listing, mark_missing_listings_as_inactive

def process_and_save(raw: dict):
    """Filtre, qualifie et enregistre une annonce unique."""
    # 1. Filtre sur le prix plancher (750 000 €)
    price = raw.get("price")
    if not price or price < 750000:
        return None

    agency = raw.get("source_agency")
    
    # 2. Qualification sémantique
    if agency in ["Junot", "Engel & Völkers"]:
        full_text = f"{raw.get('title', '')} {raw.get('description', '')}"
        if not has_atypic_keywords(full_text):
            return None
        
        ai_eval = evaluate_listing_with_ai(raw["title"], raw.get("description", ""))
        if not ai_eval or not ai_eval.is_atypic or ai_eval.confidence_score < 0.75:
            return None
        
        category = ai_eval.category
        tags = ai_eval.key_features
        short_desc = ai_eval.summary
        score = ai_eval.confidence_score
    else:
        # Agences spécialisées natives (Archik, Architecture de Collection)
        category = raw.get("atypic_category", "Architecture remarquable")
        tags = ["Architecture contemporaine", "Patrimoine"]
        short_desc = raw.get("short_description") or raw.get("title")
        score = 1.0

    payload = {
        "source_agency": agency,
        "source_url": raw["source_url"],
        "title": raw["title"],
        "short_description": short_desc,
        "price": price,
        "surface_sqm": raw.get("surface_sqm"),
        "city": raw.get("city", "Paris / Île-de-France"),
        "atypic_category": category,
        "atypic_tags": tags,
        "curation_score": score,
        "cover_image_
