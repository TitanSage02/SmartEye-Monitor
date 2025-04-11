
# SmartEye - Système Intelligent de Surveillance

## À propos du projet

SmartEye est une plateforme avancée de détection et de surveillance d'incidents en temps réel. Utilisant des technologies de pointe en traitement d'images et intelligence artificielle, le système détecte automatiquement les incidents tels que les accidents, incendies et actes de violence, puis transmet ces informations aux services compétents.

Cette interface de monitoring permet aux opérateurs et gestionnaires de visualiser l'ensemble des incidents signalés par le système, de filtrer et rechercher des événements spécifiques, et d'accéder rapidement aux informations détaillées pour une prise de décision efficace.

## Caractéristiques principales

- **Surveillance en temps réel** : Actualisation automatique des données toutes les 5 secondes
- **Visualisation intuitive** : Affichage des incidents sous forme de cartes organisées par type
- **Filtrage avancé** : Recherche textuelle et filtrage par type d'incident et période
- **Interface responsive** : Adaptation à tous les formats d'écran
- **Affichage d'images** : Visualisation des images associées aux incidents
- **Gestion des erreurs** : Notifications en cas de problème de connexion

## Architecture technique

Le projet est construit avec les technologies suivantes :

- **Frontend**:
  - React 18 avec TypeScript
  - Vite comme bundler
  - Tailwind CSS pour le styling
  - Shadcn UI pour les composants d'interface
  - React Query pour la gestion des requêtes API
  - Lucide React pour les icônes

- **Communication avec l'API**:
  - Polling régulier pour les mises à jour
  - Gestion des erreurs et état de chargement

## Installation et démarrage

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone <url-du-depot>
cd smart-eye-monitoring

# Installer les dépendances
npm install
# ou avec yarn
yarn install
```

### Lancement en développement

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173).

### Construction pour la production

```bash
npm run build
# ou
yarn build
```

Les fichiers optimisés pour la production seront générés dans le dossier `dist`.

## Structure du projet

```
smart-eye-monitoring/
├── public/                 # Ressources statiques
├── src/
│   ├── components/         # Composants React
│   │   ├── ui/             # Composants UI réutilisables
│   │   ├── Dashboard.tsx   # Composant principal du dashboard
│   │   ├── IncidentCard.tsx # Carte d'affichage d'un incident
│   │   ├── IncidentFilters.tsx # Filtres pour les incidents
│   │   └── IncidentGrid.tsx # Grille d'affichage des incidents
│   ├── hooks/              # Hooks React personnalisés
│   ├── lib/                # Utilitaires et fonctions
│   ├── pages/              # Composants de pages
│   ├── services/           # Services d'API et de données
│   ├── types/              # Définitions de types TypeScript
│   ├── utils/              # Fonctions utilitaires
│   ├── App.tsx             # Composant racine de l'application
│   ├── index.css           # Styles globaux
│   └── main.tsx            # Point d'entrée de l'application
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## Cas d'utilisation

1. **Surveillance en temps réel** : Les opérateurs peuvent observer tous les incidents détectés en temps réel.
2. **Analyse d'incidents** : Possibilité de filtrer et rechercher des incidents spécifiques pour analyse.
3. **Réponse rapide** : Visualisation immédiate des informations essentielles pour une prise de décision rapide.
4. **Suivi chronologique** : Analyse des incidents par période via les filtres de date.

## Évolutions futures

- Intégration de la géolocalisation sur carte interactive
- Système de notifications push pour les incidents critiques
- Tableaux de bord analytiques et statistiques
- Système d'authentification et gestion des utilisateurs
- Mode sombre/clair personnalisable

## Contribution

Les contributions sont les bienvenues! Pour contribuer:

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence propriétaire. Tous droits réservés.

## Contact

Équipe de développement - contact@smarteye.com

---

© 2025 SmartEye - Système intelligent de surveillance ^ Hackathon FRIARE 2025 | Tous droits réservés
