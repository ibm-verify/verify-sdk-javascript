# IBM Verify Privacy SDK pour Javascript

SDK de protection de la vie privée pour [Node](https://nodejs.org), rapide, simple et fondé sur des opinions
qui exploite le moteur de confidentialité des données et de consentement d' IBM Verify.

---

```js
const Privacy = require('@ibm-verify/privacy');

// tenant information and other global config
const config = { tenantUrl: "https://abc.verify.ibm.com" };
// access token generated using any OAuth client library
const auth = { accessToken: getToken() };
// optional context
const context = { "ipAddress": "1.2.3.4" };

const privacy = new Privacy(config, auth, context);

// determine items that need assessment
let items = [
    {
        "purposeId": "marketing",
        "attributeId": "mobile_number",
        "accessTypeId": "default"
    }
];

doAssess = async (req, res) => {
  // assess if the item can be used
  let decision = await privacy.assess(items);
  if (decision.status == "consent") {
    // metadata used to render a user consent page
    let r = await privacy.getConsentMetadata(items);
    res.render('consent', { metadata: r.metadata });
  }
  // handle other cases
}

storeConsents = async (req, res) => {
  // assuming the request.body is a JSON array of
  // consent records that need to be stored
  let r = await privacy.storeConsents(req.body);
  if (r.status == "success") {
    // done. Respond accordingly
  } else if (r.status == "fail") {
    // something didn't save. For example - an attempt was made to store a consent
    // for an attribute that isn't linked to a purpose on Verify.
    // Render an appropriate error code to the user.
  }
}

```

## Prérequis

* Inscrivez-vous à [IBM Verify Tenant](https://docs.verify.ibm.com/verify/docs/signing-up-for-a-free-trial).
* Si vous n'utilisez pas d'application OAuth/OIDC pour obtenir un jeton d'utilisateur/délégué, obtenez un jeton d'accès privilégié en configurant un [client API](https://docs.verify.ibm.com/verify/docs/create-api-client) avec les droits suivants.
   - Vérifier l'approbation de l'utilisation des données _pour évaluer l'utilisation des éléments de données demandés_
   - Récupérer les objectifs de protection de la vie privée et le consentement de l'utilisateur associé _afin de présenter une expérience complète de consentement de l'utilisateur_
   - Créer des dossiers de consentement à la protection de la vie privée _pour enregistrer les consentements_
   - Lire les consentements à la protection de la vie privée _pour obtenir les consentements de l'utilisateur_
* Identifiez les attributs que vous avez l'intention d'utiliser dans votre application et qui doivent être évalués
* Identifier le but de l'utilisation de ces attributs

## Installation

Utilisez [npm](https://github.com/npm/cli) pour installer le SDK :

```bash
$ npm install @ibm-verify/privacy
```

## Fonctions

- Intégrer le moteur de confidentialité des données de Verify à l'aide d'API
- Insérez l'évaluation de la protection de la vie privée et le consentement à n'importe quel point de votre flux d'application. Les règles de confidentialité et de conformité sont configurées de manière centralisée sur le locataire Verify
- Créer des expériences agréables pour le consentement et les préférences de l'utilisateur en utilisant l'objet simplifié renvoyé par la fonction `getConsentMetadata`

## Documentation

* [Documentation de la bibliothèque](https://ibm-verify.github.io/javascript/privacy/docs/index.html)
* [Exemples d'utilisation](https://github.com/ibm-verify/verify-sdk-javascript/tree/main/sdk/privacy/examples)

## Tests

Avant d'exécuter les tests, le locataire Verify doit être configuré avec les éléments suivants :

* Objectif avec ID `marketing`
* Objectif `marketing` doit être configuré avec deux attributs - `mobile_number` et `email`
* Objet `marketing` doit être configuré avec le type d'accès `default`

L'environnement de test doit être configuré comme suit :

1. Dans le répertoire où ce dépôt Git est cloné, exécutez :

```
$ npm install
```

2. Copier `./test/dotenv` sur `./test/.env`
3. Utilisez n'importe quelle application OIDC configurée sur le locataire Verify pour générer un jeton OAuth. Il est associé au compte d'utilisateur utilisé pour se connecter à l'application.

Vous pouvez maintenant lancer le test en exécutant :

```bash
$ npm test
```

Si vous voulez voir les journaux de débogage, exécutez :

```js
$ npm run testdebug
```

<!-- v2.3.7 : caits-prod-app-gp_webui_20241231T140451-15_en_fr -->