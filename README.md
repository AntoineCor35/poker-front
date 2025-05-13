# Poker Front-End Application

Projet libre développé par Antoine Cormier, répondant à l'exercice suivant :
[Exercice Poker Front-End sur GitLab](https://gitlab.com/docusland-courses/javascript/poker-front-end-application)

> **Statut :** En cours de développement

## Description

Cette application est une interface front-end pour un jeu de poker en ligne, réalisée dans le cadre d'un exercice pédagogique. Elle communique avec une API REST back-end dédiée (voir lien ci-dessous).

## API Back-End

Le projet utilise l'API suivante pour la gestion des utilisateurs, tables, parties, etc. :

- [Repo GitHub de l'API Poker (pokerAPI-MDS)](https://github.com/AntoineCor35/pokerAPI-MDS)

## Dockerisation

L'application est dockerisée pour faciliter le déploiement et les tests.

### Build et lancement (développement)

```bash
docker-compose up --build
```

- L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Build et lancement (production)

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Variables d'environnement

- `.env` et `.env.development` contiennent les variables nécessaires (API URL, etc.)

## Tests

### Tests unitaires (Jest)

Lancer tous les tests unitaires :

```bash
npm run test
```

### Tests end-to-end (Cypress)

Lancer l'interface Cypress :

```bash
npx cypress open
```

Lancer les tests Cypress en mode headless :

```bash
npx cypress run
```

Les scénarios de sécurité (XSS, injection, duplication, etc.) sont couverts dans `src/__tests__/e2e/`.

## Contributeur

Antoine Cormier — créateur et unique contributeur du projet.

---

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue ou à me contacter.
