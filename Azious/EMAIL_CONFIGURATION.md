# Configuration Email - Azious

## ✅ Configuration Complétée

### 1. Configuration dans `settings.py`

Les paramètres email ont été ajoutés à la fin du fichier `Azious/settings.py` :

```python
# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'noreply@azious.com'
EMAIL_HOST_PASSWORD = 'yxai vvrp uhzg cdvj'
DEFAULT_FROM_EMAIL = 'noreply@azious.com'
BUSINESS_EMAIL = 'Business@azious.com'
```

### 2. Vues créées dans `Interface/views.py`

Deux nouvelles vues ont été ajoutées pour gérer les formulaires :

#### a) `submit_contact_form` - Formulaire de contact
- **URL**: `/api/submit-contact/`
- **Méthode**: POST
- **Données attendues**:
  - `prenom`: Prénom du client
  - `nom`: Nom du client
  - `email`: Email du client
  - `sujet`: Sujet du message
  - `message`: Message du client

**Emails envoyés**:
1. À `Business@azious.com` : Notification du nouveau message avec tous les détails
2. Au client : Message de remerciement automatique

#### b) `submit_project_form` - Formulaire de projet
- **URL**: `/api/submit-project/`
- **Méthode**: POST
- **Données attendues**:
  - `prenom`: Prénom du client
  - `nom`: Nom du client
  - `email`: Email du client (⚠️ champ ajouté au modal)
  - `company_name`: Nom de l'entreprise (optionnel)
  - `company_type`: Type d'entreprise
  - `service`: Service demandé
  - `other_service`: Autre service (si applicable)
  - `budget`: Budget du projet
  - `description`: Description du projet
  - `deadline`: Délai souhaité

**Emails envoyés**:
1. À `Business@azious.com` : Notification de la nouvelle demande de projet avec tous les détails
2. Au client : Message de remerciement automatique

### 3. URLs ajoutées dans `Interface/url.py`

```python
path('api/submit-contact/', views.submit_contact_form, name='submit_contact'),
path('api/submit-project/', views.submit_project_form, name='submit_project'),
```

### 4. JavaScript mis à jour dans `Interface/static/Interface/js/script.js`

#### Formulaire de contact (`initContactForm`)
- Envoie les données à `/api/submit-contact/` via fetch API
- Affiche un message de succès ou d'erreur
- Déclenche des confettis en cas de succès

#### Formulaire de projet (`initProjectModal`)
- Envoie les données à `/api/submit-project/` via fetch API
- Affiche un message de succès ou d'erreur dans le modal
- Déclenche des confettis en cas de succès
- Ferme le modal après 3 secondes en cas de succès

### 5. Modifications HTML

#### `_module-Project.html`
- ✅ Ajout du champ "Courriel" (email) après les champs Nom et Prénom
- Ce champ est obligatoire pour permettre l'envoi de l'email de remerciement au client

## 📧 Flux d'envoi d'emails

### Pour chaque formulaire soumis :

1. **Validation côté client** : JavaScript valide les champs
2. **Envoi à l'API** : Les données sont envoyées au backend Django
3. **Validation côté serveur** : Django reçoit et valide les données
4. **Envoi de 2 emails** :
   - Email à Business@azious.com avec les détails complets
   - Email de remerciement au client
5. **Réponse au client** : Message de succès ou d'erreur

## 🔒 Sécurité

- Les vues utilisent `@csrf_exempt` pour le développement
- En production, il faudra configurer CSRF correctement
- Le mot de passe d'application Gmail est stocké dans settings.py
- ⚠️ **IMPORTANT** : Déplacer le mot de passe dans les variables d'environnement en production

## ✅ Prochaines étapes recommandées

1. **Tester les formulaires** :
   - Remplir le formulaire de contact sur `/contact/`
   - Remplir le formulaire de projet (bouton "Démarrer un projet")
   - Vérifier la réception des emails sur Business@azious.com
   - Vérifier la réception de l'email de remerciement

2. **Pour la production** :
   - Déplacer les credentials email dans les variables d'environnement
   - Configurer CSRF correctement
   - Ajouter un rate limiting pour éviter le spam
   - Ajouter un captcha (reCAPTCHA) pour plus de sécurité

3. **Optionnel** :
   - Créer des templates HTML pour les emails (au lieu de texte brut)
   - Ajouter des logs pour suivre les envois d'emails
   - Configurer un service de monitoring pour les erreurs d'envoi

## 📝 Notes importantes

- Le serveur SMTP utilisé est Gmail (smtp.gmail.com)
- Port 587 avec TLS activé
- L'adresse d'envoi est : noreply@azious.com
- L'adresse de réception business est : Business@azious.com
- Les emails sont envoyés en texte brut (pas de HTML)

## 🧪 Test manuel

Pour tester :
1. Assurez-vous que le serveur Django est en cours d'exécution
2. Allez sur http://localhost:8000/contact/
3. Remplissez et soumettez le formulaire de contact
4. Vérifiez vos emails sur Business@azious.com
5. Testez aussi le modal de projet en cliquant sur "Démarrer un projet"

## ⚠️ Dépannage

Si les emails ne sont pas envoyés :
1. Vérifiez que le mot de passe d'application Gmail est correct
2. Vérifiez que l'authentification à 2 facteurs est activée sur le compte Gmail
3. Vérifiez les logs du serveur Django pour les erreurs
4. Assurez-vous que le port 587 n'est pas bloqué par un pare-feu
