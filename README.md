# Photobooth : appli Android pour le Play Store

Ce dossier contient le projet Android complet. La compilation se fait gratuitement sur GitHub, sans rien installer sur ton PC.

## Ce qu'il y a dedans

| Dossier / fichier | Rôle |
|---|---|
| `www/index.html` | L'appli elle-même (écran, caméra, filtres, cadres) |
| `android/` | Le projet Android (permission caméra, plein écran, écran toujours allumé) |
| `.github/workflows/build.yml` | La compilation automatique sur GitHub |
| `docs/index.html` | Politique de confidentialité, exigée par Google |
| `store/` | Icône 512×512 et bannière 1024×500 pour la fiche Play Store |
| `assets/` | Images sources de l'icône et de l'écran de démarrage |

## Étape 1 : mettre le projet sur GitHub (gratuit)

1. Crée un compte sur github.com.
2. Clique sur **New repository**, nomme-le `photobooth` et choisis **Private** ou **Public**. Pour l'étape 4, il faut **Public** avec un compte gratuit.
3. Clique sur **uploading an existing file** et glisse **tout le contenu** de ce dossier dézippé (y compris le dossier `.github`).
   Astuce : sur ordinateur, les dossiers qui commencent par un point sont parfois cachés. Si `.github` n'apparaît pas, crée le fichier à la main avec **Add file > Create new file**, nomme-le `.github/workflows/build.yml` et colles-y le contenu.
4. Clique sur **Commit changes**.

## Étape 2 : récupérer l'APK de test

1. Dans ton dépôt, ouvre l'onglet **Actions**. La compilation démarre toute seule et prend environ 5 à 8 minutes.
2. Quand c'est vert ✔, clique dessus. En bas, télécharge **photobooth-apk-test**.
3. Dézippe et envoie `app-debug.apk` sur ton téléphone, puis ouvre-le. Android demandera d'autoriser l'installation d'applis inconnues.
4. Teste tout : caméra, compte à rebours, bande ×4, enregistrement dans la galerie, partage.

## Étape 3 : ajouter la clé de signature (pour le Play Store)

Dans le dépôt GitHub, va dans **Settings > Secrets and variables > Actions > New repository secret** et crée les 4 secrets indiqués dans le fichier `A-LIRE.txt` de la clé de signature (fournie à part).
Relance la compilation (**Actions > Construire l'appli Android > Run workflow**). Tu obtiens alors en plus **photobooth-playstore-aab**, qui contient `app-release.aab`, le fichier à envoyer à Google.

⚠️ Garde la clé `photobooth-upload.jks` et ses mots de passe en lieu sûr. Ne la mets jamais directement dans le dépôt.

## Étape 4 : publier la politique de confidentialité

1. Remplace `VOTRE-ADRESSE@EMAIL.FR` dans `docs/index.html` par ton adresse e-mail.
2. Dans le dépôt, va dans **Settings > Pages > Source : Deploy from a branch**, puis choisis **main** et **/docs**.
3. L'adresse obtenue (`https://TON-PSEUDO.github.io/photobooth/`) est à coller dans la Play Console.

## Étape 5 : publier sur le Play Store

1. Crée un compte développeur sur play.google.com/console. Il coûte **25 $ une seule fois** et demande une vérification d'identité.
2. Clique sur **Créer une application** : nom « Photobooth » (ou un autre nom), en français, Application, Gratuite.
3. Remplis la fiche : description, icône `store/icone-512.png`, bannière `store/banniere-1024x500.png` et au moins 2 captures d'écran du téléphone.
4. Remplis les questionnaires : contenu de l'appli, confidentialité (lien de l'étape 4), sécurité des données (« aucune donnée collectée ou partagée »), classification du contenu et public cible.
5. **Compte personnel récent** : Google impose un **test fermé avec au moins 12 testeurs pendant 14 jours** avant de pouvoir publier en production. Envoie l'`.aab` dans **Tests > Test fermé** et invite 12 personnes (famille, amis, collègues). Ensuite, demande l'accès à la production.

## Modifier l'appli plus tard

- **Nom ou identifiant** : l'identifiant `fr.julien.photobooth` est dans `capacitor.config.json`, `android/app/build.gradle` et `android/app/src/main/res/values/strings.xml`. Il est **définitif** une fois l'appli publiée, donc change-le avant si tu veux.
- **Nouvelle version** : modifie les fichiers sur GitHub. Chaque compilation augmente automatiquement le numéro de version, et il suffit d'envoyer le nouvel `.aab` dans la Play Console.
