# 🔧 Configuration Guide

Quick reference for all configuration values in the project.

## 📝 File-by-File Configuration

### `index.html`

#### Line ~286: Google Sheets URL
```html
<form id="interestForm" data-sheet-url="YOUR_URL_HERE">
```
**What to change:** Replace with your Google Apps Script deployment URL
**Get it from:** Apps Script → Deploy → Manage deployments → Copy URL

---

#### Line ~498: reCAPTCHA Site Key
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```
**What to change:** Replace `YOUR_SITE_KEY` with your reCAPTCHA v3 site key
**Get it from:** [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)

---

#### Line ~477: reCAPTCHA Execution
```javascript
recaptchaToken = await grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'});
```
**What to change:** Replace `YOUR_SITE_KEY` with same key as above
**Must match:** The script tag site key

---

#### Lines 13-23: Meta Tags
```html
<meta property="og:url" content="https://fairglen.github.io/pixelforge/">
<meta property="og:image" content="https://fairglen.github.io/pixelforge/og-image.png">
```
**What to change:** 
- Replace URL with your actual site URL
- Add an og-image.png file (1200x630px)
**Used for:** Social media sharing (Facebook, Twitter, LinkedIn)

---

#### Lines ~505-510: Google Analytics (Optional)
```html
<!-- Uncomment and replace G-XXXXXXXXXX with your tracking ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```
**What to change:** Replace `G-XXXXXXXXXX` with your GA4 measurement ID
**Get it from:** Google Analytics → Admin → Data Streams

---

### `google-apps-script.js`

#### Lines 7-13: CONFIG Object
```javascript
const CONFIG = {
  MAX_EMAIL_LENGTH: 254,
  MAX_INTERESTS_LENGTH: 500,
  ALLOWED_LANGUAGES: ['en', 'pt'],
  RATE_LIMIT_MINUTES: 5,
  MAX_SUBMISSIONS_PER_EMAIL: 3,
  RECAPTCHA_SECRET_KEY: '',
  RECAPTCHA_MIN_SCORE: 0.5
};
```

**Configuration options:**

| Setting | Default | Description | When to change |
|---------|---------|-------------|----------------|
| `MAX_EMAIL_LENGTH` | 254 | Max characters for email | Rarely (RFC standard) |
| `MAX_INTERESTS_LENGTH` | 500 | Max characters for interests | If you add many options |
| `ALLOWED_LANGUAGES` | ['en', 'pt'] | Valid language codes | If adding more languages |
| `RATE_LIMIT_MINUTES` | 5 | Time window for rate limiting | If getting spam |
| `MAX_SUBMISSIONS_PER_EMAIL` | 3 | Max submits per email in window | If getting spam or legitimate resubmits |
| `RECAPTCHA_SECRET_KEY` | '' | Your reCAPTCHA secret key | Add from reCAPTCHA admin |
| `RECAPTCHA_MIN_SCORE` | 0.5 | Min score to accept (0-1) | If too many bots or false positives |

**Get reCAPTCHA secret key from:** [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin) → Settings → reCAPTCHA keys → Secret key

---

### `poster.html`

#### Lines ~92 & ~119: QR Code URLs
```html
src="https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=10&data=https://fairglen.github.io/pixelforge/"
```
**What to change:** Replace URL in `data=` parameter with your site URL
**Note:** URL will be encoded automatically by the QR service

---

## 🎨 Customization Options

### Colors

**Primary Orange Gradient:**
```css
background: linear-gradient(135deg, #ff8800 0%, #ff6600 100%);
```
Change these hex values for different colors.

**Text Color:**
```css
color: #0b0b0b;
```

**Hover/Focus Color:**
```css
border-color: #ff8800;
```

### Form Fields

To add a new interest option, add this in `index.html`:

```html
<button type="button" class="interest-btn" data-interest="your-new-option">
    <span class="active-lang" data-lang="en">English Text</span>
    <span data-lang="pt">Texto Português</span>
</button>
```

### Rate Limiting

**Client-side (JavaScript):**
```javascript
const SUBMIT_COOLDOWN = 5000; // milliseconds
```
Change to adjust time between submissions from same browser.

**Server-side (Apps Script):**
```javascript
RATE_LIMIT_MINUTES: 5,
MAX_SUBMISSIONS_PER_EMAIL: 3
```
Adjust these values in the CONFIG object.

---

## 🔐 Security Settings

### Recommended for Production:

1. **reCAPTCHA enabled** ✅
   - Site key in `index.html`
   - Secret key in `google-apps-script.js`
   - Minimum score: 0.5 (adjust based on spam levels)

2. **Rate limiting active** ✅
   - Client: 5 second cooldown
   - Server: 3 per email per 5 minutes

3. **Honeypot field** ✅
   - Already implemented, no config needed

### Adjust if experiencing spam:

```javascript
// More strict
RATE_LIMIT_MINUTES: 10,
MAX_SUBMISSIONS_PER_EMAIL: 2,
RECAPTCHA_MIN_SCORE: 0.7

// More lenient
RATE_LIMIT_MINUTES: 3,
MAX_SUBMISSIONS_PER_EMAIL: 5,
RECAPTCHA_MIN_SCORE: 0.3
```

---

## 🌍 Adding a New Language

1. **Update HTML (index.html):**
   ```html
   <option value="es">🇪🇸</option>
   ```

2. **Add translations:**
   ```html
   <span data-lang="es">Spanish text here</span>
   ```

3. **Update Apps Script:**
   ```javascript
   ALLOWED_LANGUAGES: ['en', 'pt', 'es']
   ```

4. **Update language function:**
   ```javascript
   if (savedLang && ['en', 'pt', 'es'].includes(savedLang)) {
       setLanguage(savedLang);
   }
   ```

---

## 📊 Google Sheet Setup

### Required Column Headers (in order):
1. **Timestamp** - Auto-filled with submission time
2. **Email** - User's email address
3. **Interests** - Selected interests (comma-separated)
4. **Language** - Selected language (en/pt)
5. **User Agent** - Browser information

### Setting Up Notifications:
1. In Google Sheets: **Tools** → **Notification rules**
2. Choose: "Any changes are made"
3. Frequency: Immediately or daily digest

---

## 🔄 Updating After Changes

### When you update `index.html`:
- Just push to GitHub
- GitHub Pages auto-deploys in 2-3 minutes
- No other action needed

### When you update `google-apps-script.js`:
1. Paste new code in Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click ✏️ edit icon
4. **Version**: New version
5. Click **Deploy**
6. URL stays the same (no need to update `index.html`)

### When you update `poster.html`:
- Just download/print the new version
- QR codes will automatically point to latest site

---

## 💡 Tips

- **Test in incognito** to see fresh user experience
- **Check mobile** responsiveness after changes
- **Backup Google Sheet** regularly
- **Monitor Apps Script logs** for errors
- **Keep reCAPTCHA keys secret** (never commit to public repo)

---

## 📞 Need Help?

Check these in order:
1. Browser console (F12) for JavaScript errors
2. Apps Script logs (View → Logs)
3. [SECURITY.md](SECURITY.md) for security questions
4. [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
