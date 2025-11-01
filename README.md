# pixelforge

TCG + Hobby Space Landing Page for Portela de Sintra

## About

This is a landing page to gauge interest in opening a TCG (Trading Card Game) + hobby space in Portela de Sintra. The page collects email addresses, optional city area information, and tracks interest in three key services:

- Playing in local TCG events
- Buying cards/sleeves locally  
- Using 3D printing and repair services

## Deployment to GitHub Pages

1. Go to your repository settings
2. Navigate to Pages section
3. Select the branch you want to deploy (e.g., `main` or `copilot/add-landing-page-for-tcg`)
4. Set the source to "/ (root)"
5. Save and wait for deployment

Your landing page will be available at: `https://<username>.github.io/<repository-name>/`

## Local Development

To test the page locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/index.html` in your browser.

## Features

- Email capture (required field)
- Optional city area field
- Three clickable interest buttons with multi-select capability
- Form validation
- Success message feedback
- Mobile-responsive design
- Modern UI with gradient styling

## Production Considerations

The current implementation stores form submissions in the browser's localStorage for demonstration purposes. For production use, consider integrating with a form service such as:

- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [Firebase](https://firebase.google.com/)
- [Google Forms](https://www.google.com/forms/about/)