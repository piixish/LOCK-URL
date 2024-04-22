## Démarrage du Bot

Pour que le bot fonctionne, suivez ces étapes simples :

### 1. Installation des dépendances

Exécutez la commande suivante pour installer les dépendances nécessaires :

```bash
npm i
```

### 2. Démarrage du Bot

Une fois les dépendances installées, utilisez la commande suivante pour démarrer le bot :

```bash
npm index
```

### 3. Configuration

Lorsque vous lancez le script, il vous demandera de remplir les informations suivantes :

- Remplissez le champ `"token"` avec le token de votre compte Discord.
- Remplissez le champ `"serverId"` avec l'identifiant du serveur Discord où vous souhaitez que le bot fonctionne.
- Remplissez le champ `"rateLimitUrl"` avec le nom de l'URL à utiliser pour la gestion des limites.

### 4. Version de Node.js

Le bot nécessite Node.js version 18. Si vous ne l'avez pas déjà installé, vous pouvez le faire en utilisant `nvm` (Node Version Manager). Voici comment procéder :

#### Installation de nvm (sur Windows)

Téléchargez et installez `nvm` depuis [ce lien](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe).

#### Installation de Node.js v18

Après avoir installé `nvm`, exécutez les commandes suivantes dans votre terminal :

```bash
nvm install v18
nvm use v18
```

Cela installera Node.js version 18 et l'utilisera pour exécuter le bot.
