import anthropic
import os
import json

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

def generate_outfit(
    clothes: list,
    weather: dict,
    event_type: str,
    excluded_combinations: list = []
) -> dict:
    
    clothes_list = "\n".join([
        f"- ID: {c['id']}, Nom: {c['name']}, Catégorie: {c['category']}, Couleur: {c['color']}"
        for c in clothes
    ])
    
    excluded_text = ""
    if excluded_combinations:
        excluded_text = f"\nTenues à NE PAS reproduire (déjà portées cette semaine): {json.dumps(excluded_combinations)}"
    
    prompt = f"""Tu es un styliste personnel expert. Génère une tenue complète pour l'utilisatrice.

Météo actuelle: {weather.get('summary', '25°C, ensoleillé')}
Type d'événement: {event_type}

Vêtements disponibles:
{clothes_list}
{excluded_text}

Réponds UNIQUEMENT en JSON avec ce format exact:
{{
    "top_id": "uuid du haut choisi",
    "bottom_id": "uuid du bas choisi", 
    "shoes_id": "uuid des chaussures choisies",
    "explanation": "Explication courte du choix en français"
}}

Si une catégorie n'est pas disponible, mets null pour cet ID."""

    try:
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        message = client.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=500,
            messages=[{"role": "user", "content": prompt}]
        )
        response_text = message.content[0].text
        return json.loads(response_text)
    except Exception as e:
        return {
            "top_id": None,
            "bottom_id": None,
            "shoes_id": None,
            "explanation": f"Erreur IA: {str(e)}"
        }
