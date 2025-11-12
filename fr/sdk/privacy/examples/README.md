# Exemples d' IBM Verify Privacy SDK

Une série d'exemples est fournie dans ce référentiel pour présenter l'utilisation du [SDK IBM Verify pour Javascript.](https://github.com/ibm-verify/verify-sdk-javascript)

## Prérequis

1. Installer Node et Git sur votre machine
2. [Créer un locataire sur IBM Verify](https://docs.verify.ibm.com/verify/docs/signing-up-for-a-free-trial)
3. Cloner ce repo sur votre machine

## Configuration

Il n'y a actuellement qu'un seul exemple disponible qui fonctionne sur l'interface de ligne de commande pour illustrer le flux.

### Exemple CLI

#### Configuration

Dans le fichier dotenv, vous remarquerez les éléments suivants -

* TENANT_URL : Il s'agit de l' URL votre locataire IBM Verify. Remarquez que le protocole est inclus et qu'il n'y a pas de barre oblique à la fin.
* APP_CLIENT_ID : Il s'agit de l'identifiant client d'une application OIDC configurée dans IBM Verify et activée avec le type de subvention ROPC.
* APP_CLIENT_SECRET : il s'agit d'un secret client de l'application OIDC configuré sur IBM Verify et activé avec le type de subvention ROPC.
* USERNAME : Il s'agit d'un utilisateur de Cloud Directory sur le locataire IBM Verify. Il est possible de ne pas le configurer et l'application exemple demandera le nom d'utilisateur sur la ligne de commande.
* MOT DE PASSE : Il s'agit du mot de passe de l'utilisateur de Cloud Directory sur le locataire IBM Verify  Il est possible de ne pas le configurer et l'application exemple demandera le nom d'utilisateur sur la ligne de commande.
* CONSENT_ITEMS : Il s'agit d'une représentation des éléments pour lesquels cette application nécessite un consentement/une approbation pour effectuer certaines activités hypothétiques. Le format diffère selon qu'il s'agit d'un CLUF ou d'un attribut. Les identifiants mentionnés ci-dessous peuvent être copiés à partir de la console d'administration de votre locataire IBM Verify. Il est fortement recommandé de choisir des noms conviviaux pour ces identifiants.
   - Le format d'un élément d'attribut sensible à la finalité est le suivant : `purposeID/attributeID:accessTypeID`.
   - Le format d'un article de CLUF est le suivant `eulaID`

#### Configuration de IBM Verify

Si vous avez l'intention d'utiliser le site `dotenv` tel quel, assurez-vous que les étapes 2 et 3 sont terminées. Dans le cas contraire, vous devrez modifier le site `CONSENT_ITEMS`.

1. Créez une application OIDC sur IBM Verify avec la subvention ROPC activée. Notez les `client_id` et `client_secret`.
2. Dans la section IBM Verify Admin Console > Data Privacy, créez un "Purpose" avec l'ID `marketing` et ajoutez-y l'attribut `email`. Choisissez `default` comme type d'accès.
3. Dans la section IBM Verify Admin Console > Data Privacy, créez un CLUF avec l'ID `defaultEULA`.

#### Exécuter l'échantillon

1. Installer les dépendances de node

   ```bash
   npm install
   ```

2. Lancez l'application.

   ```bash
   node cli/cli.js
   ```

3. Suivre les signaux

#### Conditions

* ÉVALUATION : Il s'agit de l'évaluation des éléments demandés par rapport aux règles de confidentialité configurées
* METADATA : Il s'agit des métadonnées utilisées pour construire la page de consentement (ou, dans ce cas, les invites de consentement sur la ligne de commande)

<!-- v2.3.7 : caits-prod-app-gp_webui_20241231T140449-12_en_fr -->