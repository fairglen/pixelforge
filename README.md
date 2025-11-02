# Sintra Game & Maker Hub - Landing Page

A bilingual (EN/PT) interest registration landing page for Sintra's first Game & Maker Hub in Portela de Sintra.

## 🎯 Project Overview

This landing page collects interest for a community space focused on:
- 🃏 Trading Card Games (Pokémon, Magic, One Piece, Lorcana)
- 🎲 Board game nights and tournaments
- 🖨️ 3D printing services
- 🔧 Tech repair services

## 🌐 Live Site

**Production URL:** [https://fairglen.github.io/pixelforge/](https://fairglen.github.io/pixelforge/)

## 📁 Project Structure

```
pixelforge/
├── index.html              # Main landing page with form
├── poster.html            # Printable A4 poster (bilingual)
├── google-apps-script.js  # Server-side validation script
├── SECURITY.md           # Security documentation
└── README.md             # This file
```

## ✨ Features

### Landing Page (`index.html`)
- ✅ Bilingual support (English/Portuguese) with language toggle
- ✅ Interest form with multi-select options
- ✅ Email validation (client & server-side)
- ✅ Google Sheets integration
- ✅ Security features (honeypot, rate limiting)
- ✅ reCAPTCHA v3 integration
- ✅ Mobile-responsive design
- ✅ SEO optimized with meta tags
- ✅ Accessible (semantic HTML, ARIA labels)

### Printable Poster (`poster.html`)
- ✅ A4 print-ready format
- ✅ Bilingual (both languages on one page)
- ✅ QR codes linking to landing page
- ✅ Scissor-cut divider
- ✅ Print-optimized styles

### Server Integration (`google-apps-script.js`)
- ✅ Server-side validation
- ✅ Rate limiting (3 submissions per email per 5 minutes)
- ✅ Data sanitization
- ✅ Timestamp validation
- ✅ reCAPTCHA verification
- ✅ Error handling & logging

## 🚀 Setup Instructions

### 1. Google Sheets Setup

1. Create a new Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Copy the contents of `google-apps-script.js` into the editor
4. **Optional:** Add your reCAPTCHA secret key to `CONFIG.RECAPTCHA_SECRET_KEY`
5. Run `setupSpreadsheet()` once to initialize headers
6. Deploy as Web App:
   - Click **Deploy** → **New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Copy the deployment URL

### 2. Update Landing Page

1. Open `index.html`
2. Find the form tag: `<form id="interestForm" data-sheet-url="..."`
3. Replace with your Google Apps Script URL

### 3. reCAPTCHA Setup (Optional but Recommended)

1. Get keys at [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Choose reCAPTCHA v3
3. Add your domain
4. Update `index.html` with your **site key** (replace `6LfEOf8rAAAAAJs0dHh0K84m9xIZdj_c4euvq57W`)
5. Update `google-apps-script.js` with your **secret key**

### 4. Deploy to GitHub Pages

1. Push code to GitHub
2. Go to **Settings** → **Pages**
3. Source: Deploy from branch `main`
4. Folder: `/ (root)`
5. Save and wait 2-3 minutes

Your site will be live at: `https://[username].github.io/[repository-name]/`

## 🔒 Security Features

See [SECURITY.md](SECURITY.md) for detailed information.

**Implemented:**
- ✅ Honeypot field for bot detection
- ✅ Client-side rate limiting (5 second cooldown)
- ✅ Server-side rate limiting (3 per email per 5 min)
- ✅ Email format validation
- ✅ Data sanitization
- ✅ Timestamp validation
- ✅ Input length limits
- ✅ reCAPTCHA v3 integration

## 🧪 Local Development

### Option 1: Python HTTP Server
```bash
python3 -m http.server 8080
```
Open: `http://localhost:8080/index.html`

### Option 2: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

### Option 3: Node.js HTTP Server
```bash
npx http-server -p 8080
```

## 📊 Analytics Setup (Optional)

1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Uncomment and update the analytics code at the bottom of `index.html`

## 🎨 Customization

### Colors
Edit CSS variables in `index.html`:
```css
--bg: #ff8800;  /* Orange gradient background */
--ink: #0b0b0b; /* Near-black text */
```

### Form Fields
Add/remove interests by editing the `.interest-buttons` section in `index.html`

### Languages
Add new languages by:
1. Adding `data-lang="xx"` attributes to elements
2. Updating the language selector dropdown
3. Adding to `CONFIG.ALLOWED_LANGUAGES` in Apps Script

## 📝 TODO / Future Improvements

- [ ] Add email confirmation flow
- [ ] Create custom "Thank You" page
- [ ] Add social media integration
- [ ] Create OG image for better social sharing
- [ ] Add location-based filtering
- [ ] Export data analytics dashboard
- [ ] Add A/B testing for copy

## 🐛 Troubleshooting

### Form not submitting
1. Check browser console for errors
2. Verify Google Script URL is correct
3. Ensure Apps Script is deployed with "Anyone" access

### reCAPTCHA not working
1. Check site key matches your domain
2. Verify domain is registered in reCAPTCHA admin
3. Check browser console for errors

### Rate limiting too strict
Adjust values in `google-apps-script.js`:
```javascript
RATE_LIMIT_MINUTES: 5,
MAX_SUBMISSIONS_PER_EMAIL: 3
```

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to submit issues or pull requests for improvements!

## 📞 Contact

For questions about the Sintra Game & Maker Hub project, check the live site for contact information.

---

Made with ❤️ for the Sintra gaming community