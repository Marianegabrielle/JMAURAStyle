# JmauraStyle — AI Personal Stylist

> Ton styliste personnel IA — combine météo en temps réel et garde-robe personnelle pour générer la tenue parfaite.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Python](https://img.shields.io/badge/python-3.11-green)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)
![React](https://img.shields.io/badge/React-19-blue)

## Table des matières
- [Présentation](#présentation)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Variables d'environnement](#variables-denvironnement)
- [Lancement](#lancement)
- [Tests](#tests)
- [API Documentation](#api-documentation)
- [Infrastructure](#infrastructure)
- [Équipe](#équipe)

## Présentation

JmauraStyle résout un problème quotidien : choisir quoi porter. L'application combine :
- **Intelligence Artificielle** (Claude API) pour générer des tenues
- **Météo en temps réel** (OpenWeatherMap) pour adapter les suggestions
- **Garde-robe digitale** pour gérer ses vêtements

## Architecture
JmauraStyle/
├── backend/          # FastAPI + PostgreSQL
│   ├── app/
│   │   ├── routers/  # Auth, Clothes, Outfit, Weather, Profile
│   │   ├── models/   # SQLAlchemy models
│   │   ├── schemas/  # Pydantic schemas
│   │   ├── services/ # AI, Weather services
│   │   └── core/     # Config, Security, Database
├── frontend/         # React + TailwindCSS
├── infra/
│   ├── docker/       # Docker Compose
│   ├── k8s/          # Kubernetes manifests
│   └── ansible/      # Ansible playbooks
└── Jenkinsfile       # CI/CD Pipeline

## Prérequis

- Docker & Docker Compose
- Node.js 18+
- Python 3.11+

## Installation

```bash
# Cloner le repo
git clone https://github.com/Marianegabrielle/JMAURAStyle.git
cd JMAURAStyle

# Configurer les variables d'environnement
cp backend/.env.example backend/.env
# Éditer backend/.env avec vos clés API

# Lancer avec Docker
cd infra/docker
docker compose up -d --build

 Variables d'environnement
DATABASE_URL=postgresql+psycopg2://jmaura:jmaura2026@postgres:5432/jmaurastyle
SECRET_KEY=your_secret_key
ANTHROPIC_API_KEY=your_anthropic_key
OPENWEATHER_API_KEY=your_openweather_key
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin2026

Lancement

# Backend seul (développement)
cd backend
source venv/Scripts/activate  # Windows
uvicorn app.main:app --reload

# Frontend seul
cd frontend
npm install && npm start

# Stack complète (production)
cd infra/docker
docker compose up -d

Tests
cd backend
source venv/Scripts/activate
python -m pytest app/tests/ -v --cov=app --cov-report=term-missing

Résultats : 10/10 tests passent — 83% de couverture

API Documentation

Swagger UI disponible sur : http://localhost:8000/docs

Endpoints principaux :

	•	POST /auth/register — Inscription
	•	POST /auth/login — Connexion
	•	GET /clothes/ — Liste des vêtements
	•	POST /clothes/ — Ajouter un vêtement
	•	POST /outfits/generate — Générer une tenue IA
	•	GET /outfits/history — Historique des tenues
	•	GET /weather/ — Météo actuelle


    Equipe
    
    NOM                                    ROLE                   
     TSAMENE MAFFO MARIANE GABRIELLE    Backend,DevOps, Tests
     MAKUETE TANETCHI JULIE FORTUNE     Frontend,Design


Projet SEN3244- SOFTWARE ARCHITECTURE
Sauvegarde puis push :

```bash
