# 🔍 Prompt de Validation de Page - Azious

## Instructions d'utilisation

Copiez et collez ce prompt à chaque fois que vous voulez valider une page :

---

## 📋 PROMPT DE VALIDATION

```
Valide cette page selon les 4 étapes suivantes et donne-moi un rapport détaillé :

## ÉTAPE 1 - ACCESSIBILITÉ (WCAG 2.1)
Vérifie :
- [ ] Attributs ARIA présents et corrects (aria-label, aria-labelledby, aria-describedby, role)
- [ ] Textes alternatifs (alt) sur toutes les images
- [ ] Hiérarchie des titres logique (h1 → h2 → h3, pas de saut)
- [ ] Contraste des couleurs suffisant (ratio minimum 4.5:1 pour texte normal)
- [ ] Navigation au clavier fonctionnelle (focus visible, tab order logique)
- [ ] Skip link présent pour sauter au contenu principal
- [ ] Formulaires avec labels associés correctement
- [ ] Liens avec texte descriptif (pas de "cliquez ici")
- [ ] Lang attribut sur la balise HTML
- [ ] Focus visible sur tous les éléments interactifs

## ÉTAPE 2 - SEO (Référencement)
Vérifie :
- [ ] Balise <title> unique et descriptive (50-60 caractères)
- [ ] Meta description présente et optimisée (150-160 caractères)
- [ ] Meta keywords pertinents
- [ ] Un seul <h1> par page
- [ ] Structure sémantique HTML5 (header, nav, main, section, article, footer)
- [ ] URLs propres et descriptives
- [ ] Attributs alt optimisés pour le SEO
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Cards (twitter:card, twitter:title, twitter:description)
- [ ] Canonical URL si nécessaire
- [ ] Données structurées (Schema.org) si applicable

## ÉTAPE 3 - BONNES PRATIQUES
Vérifie :
- [ ] HTML valide (pas d'erreurs de syntaxe)
- [ ] CSS externe (pas de styles inline sauf exception)
- [ ] JavaScript en fin de body ou avec defer/async
- [ ] Images optimisées (format WebP/PNG, taille appropriée)
- [ ] Lazy loading sur les images hors écran
- [ ] Responsive design (viewport meta, media queries)
- [ ] Pas de console.log ou code de debug
- [ ] Commentaires de code pertinents
- [ ] Nommage BEM ou convention cohérente
- [ ] Pas de !important excessifs en CSS
- [ ] Fichiers minifiés en production

## ÉTAPE 4 - SÉCURITÉ
Vérifie :
- [ ] Protection CSRF sur les formulaires Django ({% csrf_token %})
- [ ] Échappement des données utilisateur ({{ variable|escape }} ou auto-escape)
- [ ] Pas d'informations sensibles dans le code source
- [ ] Headers de sécurité (X-Content-Type-Options, X-Frame-Options)
- [ ] Liens externes avec rel="noopener noreferrer"
- [ ] Validation côté serveur (pas seulement côté client)
- [ ] Pas de secrets/clés API exposés
- [ ] HTTPS en production
- [ ] Content Security Policy (CSP) configurée
- [ ] Attributs autocomplete appropriés sur les formulaires

---

## 📊 FORMAT DU RAPPORT

Pour chaque étape, donne :
1. ✅ Ce qui est correct
2. ⚠️ Avertissements (améliorations suggérées)
3. ❌ Erreurs critiques à corriger

Puis un score global : X/100

---

Fichier(s) à valider : [INSÉRER LE NOM DU FICHIER]
```

---

## 📝 Historique des Validations

| Date | Page | Accessibilité | SEO | Bonnes Pratiques | Sécurité | Score Global |
|------|------|---------------|-----|------------------|----------|--------------|
| ___ | ___ | _/25 | _/25 | _/25 | _/25 | _/100 |

---

## 🛠️ Outils de Validation Recommandés

### Accessibilité
- [WAVE](https://wave.webaim.org/) - Extension navigateur
- [axe DevTools](https://www.deque.com/axe/) - Extension Chrome/Firefox
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Intégré à Chrome DevTools

### SEO
- [Google Search Console](https://search.google.com/search-console)
- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/)
- Lighthouse (onglet SEO)

### Bonnes Pratiques
- [W3C Validator](https://validator.w3.org/) - HTML
- [CSS Validator](https://jigsaw.w3.org/css-validator/) - CSS
- Lighthouse (onglet Best Practices)

### Sécurité
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- Django Debug Toolbar (en développement)
