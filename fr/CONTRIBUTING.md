# Contribuer

Consultez les lignes directrices suivantes pour soumettre des questions, des problèmes ou des modifications à ce référentiel.

## Style de codage

Le code source adhère à [Google Javascript](https://google.github.io/styleguide/jsguide.html) et à [eslint](https://github.com/google/eslint-config-google). Garantir à :

1. Utiliser les fonctions promises/async
2. Exécutez `npm run codecheck` et corrigez les erreurs
3. Disposer d'une documentation et d'exemples syntaxiques appropriés

## Enjeux et questions

Si vous rencontrez un problème, si vous avez une question ou si vous souhaitez suggérer une amélioration du SDK IBM Verify, n'hésitez pas à soumettre une [demande](https://github.com/ibm-verify/verify-sdk-javascript/issues).
Avant cela, veuillez rechercher des problèmes similaires. Il est possible que quelqu'un ait déjà rencontré ce problème.

## Demandes d'extraction

Si vous souhaitez contribuer au dépôt, voici un guide rapide :

1. Mettre le référentiel en fourche
2. Créer une branche de fonctionnalités ou de corrections de bogues sur votre dépôt forké
3. Développez et testez vos modifications de code :
   * Suivez le style de codage tel que documenté ci-dessus et validez-le avec eslint.
   * Veuillez ajouter un ou plusieurs tests pour valider vos changements.
4. Assurez-vous que tout est construit/testé proprement.
5. Validez vos modifications.
6. [Refondre](http://git-scm.com/book/en/Git-Branching-Rebasing) vos modifications locales
   sur la branche `main`.
7. Poussez vers la branche de votre fork et soumettez une pull request à la branche `main`.


## Générer de la documentation

Pour générer les documents HTML d'un composant SDK, exécutez `jsdoc` dans le répertoire contenant le fichier de projet du composant. Consultez ensuite les documents dans le répertoire `verify-sdk-docs/javascript/<component>/docs` :

```
open index.html
```


## Ressources supplémentaires

* [Documentation générale de GitHub](https://help.github.com/)
* [Documentation sur les demandes d'extraction GitHub](https://help.github.com/send-pull-requests/)


# Certificat d'origine du développeur 1.1

En apportant une contribution à ce projet, je certifie que :

(a) La contribution a été créée en tout ou en partie par moi et j'ai le droit de la soumettre sous une licence open source
j'ai le droit de la soumettre sous la licence open source
indiquée dans le fichier ; ou

(b) La contribution est basée sur des travaux antérieurs qui, à ma connaissance, sont couverts par une licence open source appropriée
à ma connaissance, est couvert par une licence open source appropriée et j'ai le droit, en vertu de cette licence, de soumettre ce travail
et j'ai le droit, en vertu de cette licence, de soumettre ce travail avec des modifications, qu'elles soient créées en totalité ou en partie
travail avec des modifications, qu'elles aient été créées en tout ou en partie par moi, sous la même licence de source ouverte (à moins que je n'aie pas
sous la même licence open source (à moins que je ne sois autorisé à le faire sous une autre licence)
sous une autre licence), comme indiqué dans le fichier ; ou
dans le fichier ; ou

(c) La contribution m'a été fournie directement par une autre personne qui a certifié (a), (b) ou (c) et je n'ai pas modifié la contribution
personne qui a certifié (a), (b) ou (c) et je ne l'ai pas modifiée
et je ne l'ai pas modifiée.

(d) Je comprends et j'accepte que ce projet et la contribution
sont publics et qu'un enregistrement de la contribution (y compris toutes les
informations personnelles que je soumets avec elle, y compris ma signature) est
indéfiniment et qu'elle peut être redistribuée conformément à ce projet ou à la (aux) licence(s) open source concernée(s)
ce projet ou de la (des) licence(s) open source concernée(s).

<!-- v2.3.7 : caits-prod-app-gp_webui_20241231T140457-5_en_fr -->