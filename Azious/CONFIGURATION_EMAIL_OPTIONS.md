# Options de Configuration Email - Azious

## ⚠️ Problème actuel

L'erreur "Username and Password not accepted" signifie que :
- `noreply@azious.com` n'est PAS un compte Gmail valide
- Vous ne pouvez pas utiliser Gmail avec une adresse @azious.com
- Il faut soit un compte Gmail réel, soit un serveur SMTP personnalisé

## 🎯 Solutions possibles

### Option 1 : Utiliser un compte Gmail réel (RECOMMANDÉ pour tester)

**Étapes :**

1. **Créer ou utiliser un compte Gmail pour votre entreprise**
   - Exemple : `aziousweb@gmail.com` ou `contact.azious@gmail.com`

2. **Activer la validation en 2 étapes**
   - Allez sur https://myaccount.google.com/security
   - Activez la "Validation en deux étapes"

3. **Générer un mot de passe d'application**
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Mail" et "Autre (appareil personnalisé)"
   - Nommez-le "Django Azious"
   - Copiez le mot de passe généré (16 caractères)

4. **Mettre à jour `settings.py`**
   ```python
   EMAIL_HOST_USER = 'aziousweb@gmail.com'  # Votre Gmail
   EMAIL_HOST_PASSWORD = 'xxxx xxxx xxxx xxxx'  # Mot de passe d'app
   DEFAULT_FROM_EMAIL = 'aziousweb@gmail.com'
   ```

**Avantages :**
- ✅ Gratuit
- ✅ Facile à configurer
- ✅ Fonctionne immédiatement
- ✅ Parfait pour le développement et petits volumes

**Inconvénients :**
- ❌ Limite d'envoi : 500 emails/jour
- ❌ L'expéditeur sera @gmail.com (pas @azious.com)

---

### Option 2 : Mode Console (pour développement/test uniquement)

Si vous voulez juste tester SANS envoyer de vrais emails :

**Modifier `settings.py`** :
```python
# Pour le développement - affiche les emails dans la console
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

**Avantages :**
- ✅ Pas besoin de configuration SMTP
- ✅ Voir les emails dans le terminal
- ✅ Parfait pour déboguer

**Inconvénients :**
- ❌ N'envoie PAS de vrais emails
- ❌ Seulement pour le développement

---

### Option 3 : Utiliser SendGrid (RECOMMANDÉ pour production)

SendGrid offre 100 emails/jour GRATUITS et permet d'utiliser votre domaine.

**Étapes :**

1. **Créer un compte SendGrid gratuit**
   - https://sendgrid.com
   - Plan gratuit : 100 emails/jour

2. **Créer une clé API**
   - Settings → API Keys → Create API Key

3. **Mettre à jour `settings.py`**
   ```python
   EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   EMAIL_HOST = 'smtp.sendgrid.net'
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'apikey'  # Littéralement "apikey"
   EMAIL_HOST_PASSWORD = 'SG.votre_cle_api_ici'
   DEFAULT_FROM_EMAIL = 'noreply@azious.com'
   ```

4. **Vérifier votre domaine azious.com dans SendGrid**
   - Permet d'envoyer depuis @azious.com

**Avantages :**
- ✅ 100 emails/jour gratuits
- ✅ Peut utiliser @azious.com comme expéditeur
- ✅ Meilleure délivrabilité
- ✅ Statistiques d'envoi
- ✅ Professionnel

---

### Option 4 : Utiliser Mailgun (Alternative à SendGrid)

**Plan gratuit :** 1000 emails/mois les 3 premiers mois, puis 100/jour

1. **Créer un compte Mailgun**
   - https://mailgun.com

2. **Configuration similaire à SendGrid**
   ```python
   EMAIL_HOST = 'smtp.mailgun.org'
   EMAIL_PORT = 587
   EMAIL_HOST_USER = 'postmaster@votre-domaine'
   EMAIL_HOST_PASSWORD = 'votre-cle-api'
   ```

---

### Option 5 : Serveur SMTP de votre hébergeur

Si vous avez un hébergement web avec azious.com :

```python
EMAIL_HOST = 'mail.azious.com'  # ou smtp.azious.com
EMAIL_PORT = 587  # ou 465 pour SSL
EMAIL_USE_TLS = True  # ou EMAIL_USE_SSL = True
EMAIL_HOST_USER = 'noreply@azious.com'
EMAIL_HOST_PASSWORD = 'votre-mot-de-passe'
```

**Demandez à votre hébergeur :**
- Le serveur SMTP
- Le port (587 ou 465)
- Si c'est TLS ou SSL
- Les identifiants de connexion

---

## 🚀 Recommandation finale

### Pour le développement/test immédiat :
→ **Option 1 (Gmail)** ou **Option 2 (Console)**

### Pour la production :
→ **Option 3 (SendGrid)** - Plus professionnel et gratuit jusqu'à 100/jour

---

## 📝 Action immédiate

**Choisissez l'option 1 (Gmail) pour démarrer rapidement :**

1. Utilisez un compte Gmail existant ou créez `aziousweb@gmail.com`
2. Activez la validation en 2 étapes
3. Générez un mot de passe d'application
4. Mettez à jour ces 3 lignes dans `settings.py` :
   ```python
   EMAIL_HOST_USER = 'votre-gmail@gmail.com'
   EMAIL_HOST_PASSWORD = 'mot-de-passe-app'
   DEFAULT_FROM_EMAIL = 'votre-gmail@gmail.com'
   ```

Voulez-vous que je configure une de ces options pour vous ?
