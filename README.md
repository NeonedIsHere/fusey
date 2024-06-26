# Fus-&

![License](https://img.shields.io/github/license/NeonedIsHere/fusey)
![Node.js](https://img.shields.io/badge/node.js-v22.3.0-blue)

## Description

Ce bot Discord est conçu pour offrir diverses fonctionnalités telles que la modération, la gestion des utilisateurs, des commandes utiles, et bien plus encore. Il est construit en utilisant la bibliothèque [discord.js](https://discord.js.org/).

## Fonctionnalités

- Modération : bannissement, expulsion, mise en sourdine des utilisateurs.
- Gestion : gestion des rôles, annonces, etc.
- Utilitaires : commandes d'information, sondages, etc.
- Divertissement : mini-jeux, citations aléatoires, etc.

## Prérequis

- [Node.js](https://nodejs.org/) version 18 ou supérieure
- [npm](https://www.npmjs.com/) (fourni avec Node.js)
- Un compte Discord et un serveur où vous avez les droits d'administrateur
- Un jeton de bot Discord (disponible sur le [portail des développeurs Discord](https://discord.com/developers/applications))

## Installation

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```

2. Installez les dépendances :

    ```bash
    npm install discord.js os winstone moment mongoose
    ```

3. Lancez le bot :

    ```bash
    node index.js
    ```

## Configuration

Modifiez le fichier `config.json` pour personnaliser le bot selon vos besoins. Voici un exemple de configuration :

```json
{
    "token" : "ton token",
    "prefix" : "ton prefix",
    "support" : "ton lien",
    "devId" : [
        "TON ID"
    ]
}
```

## Utilisation

### Voici quelques commandes que vous pouvez utiliser avec ce bot :

- help : Affiche la liste des commandes disponibles.
- ban @utilisateur [raison] : Bannit un utilisateur du serveur.
- kick @utilisateur [raison] : Expulse un utilisateur du serveur.
- mute @utilisateur [durée] (raison) : Met en sourdine un utilisateur pour une durée spécifiée.
- userinfo @utilisateur : Affiche des informations sur un utilisateur.

## Contribuer

### Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez suivre ces étapes :

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité (git checkout -b nouvelle-fonctionnalité)
3. Commitez vos modifications (git commit -am 'Ajoute une nouvelle fonctionnalité')
4. Poussez la branche (git push origin nouvelle-fonctionnalité)
5. Ouvrez une Pull Request

## Contacte 

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub ou à rejoindre notre [serveur de support](https://discord/com/invite/jekhYmtNvD) .
