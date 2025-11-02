# 🚀 Deployment Checklist

Use this checklist to ensure everything is configured correctly before going live.

## ☑️ Pre-Launch Checklist

### Google Sheets & Apps Script
- [ ] Google Sheet created with proper name
- [ ] Apps Script code from `google-apps-script.js` pasted
- [ ] `setupSpreadsheet()` function run once
- [ ] Apps Script deployed as Web App
- [ ] Deployment permissions set to "Anyone"
- [ ] Deployment URL copied
- [ ] Deployment URL added to `index.html` form `data-sheet-url`
- [ ] Test submission works (check Google Sheet)

### reCAPTCHA (Optional but Recommended)
- [ ] reCAPTCHA v3 account created at [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
- [ ] Domain added to reCAPTCHA settings
- [ ] Site key copied and added to `index.html`
- [ ] Secret key copied and added to `google-apps-script.js` CONFIG
- [ ] Test submission shows reCAPTCHA working in console

### GitHub Pages
- [ ] Code pushed to GitHub
- [ ] Repository settings → Pages configured
- [ ] Branch selected (usually `main`)
- [ ] Folder set to `/ (root)`
- [ ] Custom domain configured (if applicable)
- [ ] Wait 2-3 minutes for deployment
- [ ] Site accessible at GitHub Pages URL
- [ ] All resources loading correctly (no 404s)

### SEO & Meta Tags
- [ ] `index.html` meta description filled out
- [ ] Open Graph tags have correct URL
- [ ] Twitter Card tags have correct URL
- [ ] Create OG image (1200x630px) and add to repository
- [ ] Update OG image URLs in meta tags
- [ ] Favicon showing correctly

### Content Review
- [ ] All English text reviewed and proofread
- [ ] All Portuguese text reviewed and proofread
- [ ] Email placeholder appropriate
- [ ] Interest options match your services
- [ ] Success/error messages make sense
- [ ] QR codes on poster point to correct URL

### Testing
- [ ] Form submits successfully
- [ ] Email validation works (try invalid emails)
- [ ] Interest buttons select/deselect properly
- [ ] Language toggle works correctly
- [ ] Rate limiting works (try submitting quickly)
- [ ] Honeypot catches bots (fill hidden field via DevTools)
- [ ] Mobile responsive (test on phone)
- [ ] Works on Chrome, Firefox, Safari
- [ ] Success message displays
- [ ] Error messages display appropriately

### Analytics (Optional)
- [ ] Google Analytics 4 property created
- [ ] Tracking ID added to `index.html`
- [ ] Analytics code uncommented
- [ ] Test event showing in GA4 real-time

### Security
- [ ] HTTPS enabled (automatic with GitHub Pages)
- [ ] No sensitive data in public repository
- [ ] Google Script URL uses HTTPS
- [ ] Rate limiting tested and working
- [ ] Server-side validation working (check Apps Script logs)

### Marketing Assets
- [ ] Poster printed and ready (`poster.html`)
- [ ] QR codes tested with phone camera
- [ ] Social media posts prepared
- [ ] Launch announcement ready

## 🎯 Launch Day

1. **Final Test**: Submit a test form entry
2. **Verify**: Check it appears in Google Sheet
3. **Monitor**: Watch Google Sheet for first few submissions
4. **Share**: Post link on social mediax
5. **Physical**: Put up posters with QR codes

## 📊 Post-Launch Monitoring

### Daily (First Week)
- [ ] Check Google Sheet for spam patterns
- [ ] Review submission count
- [ ] Check for error patterns in Apps Script logs
- [ ] Monitor any user feedback

### Weekly
- [ ] Analyze interest patterns
- [ ] Check for duplicate emails
- [ ] Review reCAPTCHA scores (if enabled)
- [ ] Backup Google Sheet data

### Monthly
- [ ] Review analytics (if enabled)
- [ ] Plan follow-up communications
- [ ] Update security if needed

## 🐛 Common Issues & Fixes

### Form not submitting
**Check:**
1. Browser console for JavaScript errors
2. Google Script URL is correct in `index.html`
3. Apps Script deployment is still active
4. Apps Script permissions haven't changed

**Fix:**
- Re-deploy Apps Script if needed
- Check Apps Script execution logs

### Too much spam
**Quick fixes:**
1. Lower `MAX_SUBMISSIONS_PER_EMAIL` in Apps Script
2. Increase `SUBMIT_COOLDOWN` in `index.html`
3. Enable reCAPTCHA if not already

**Long-term:**
- Add email confirmation flow
- Increase reCAPTCHA minimum score

### GitHub Pages not updating
**Check:**
1. Actions tab for deployment status
2. Correct branch selected in settings
3. Files committed and pushed

**Fix:**
- Re-save Pages settings
- Try a dummy commit to trigger rebuild

### QR codes not working
**Check:**
1. URL in poster.html is correct
2. URL doesn't have typos
3. QR code image is loading

**Fix:**
- Update poster.html with correct URL
- Regenerate QR codes

## 🎉 Success Metrics

Track these to measure success:

- **Submission count**: Total interest registrations
- **Interest breakdown**: Which services are most popular
- **Language split**: EN vs PT submissions
- **Conversion rate**: Views → Submissions (if analytics enabled)
- **Source tracking**: Where traffic comes from

## 📞 Support

If you encounter issues not covered here:
1. Check browser console for errors
2. Review Apps Script execution logs
3. Check SECURITY.md for security-related issues
4. Review GitHub Issues for known problems

---

**Last Updated:** November 2, 2025
