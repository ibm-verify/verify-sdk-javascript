# IBM Verify SDK pour Javascript

Ce dépôt est destiné au développement actif du SDK IBM Verify pour Javascript.

## Mise en route

Pour commencer à utiliser un composant spécifique, consultez le fichier **README.md** situé dans le dossier du projet de chaque composant.

### Prérequis

- [nœud](https://nodejs.org/en)v16.13.0 ou supérieur)
- Un locataire valide de IBM Verify ou IBM Verify Access est requis.

### Composants

Les versions de tous les paquets sont disponibles ici : [Communiqués de presse](https://github.com/ibm-verify/verify-sdk-javascript/tags)

Les composants suivants sont actuellement proposés dans le paquet.
| Composant | Description |
| ----------- | ----------- |
| [Privacy](sdk/privacy) | Composant de protection de la vie privée simple, rapide, avec avis, qui s'appuie sur le moteur de protection des données et de consentement d' IBM Verify. |

### Installation

Installer à l'aide de [Node Package Manager](https://www.npmjs.com):

```javascript
# install the privacy sdk
npm i @ibm-verify/privacy
```

La commande ci-dessus ajoutera le SDK de protection de la vie privée à la section `dependencies` de votre site `package.json`, comme le montre l'exemple suivant :

```javascript
"dependencies": {
    "@ibm-verify/privacy": "^1.0.0"
}
```

<!-- v2.3.7 : caits-prod-app-gp_webui_20241231T140448-3_en_fr -->