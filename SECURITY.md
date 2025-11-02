# Security Measures for Sintra Hub Landing Page

## Implemented Security Features

### 1. **Honeypot Field** 🍯
- **What it is**: A hidden form field that humans won't see or fill, but bots will
- **How it works**: If the field is filled, the submission is silently rejected
- **Location**: Hidden `website` field in the HTML form

### 2. **Client-Side Rate Limiting** ⏱️
- **What it is**: Prevents rapid repeated submissions
- **How it works**: 5-second cooldown between submissions
- **Why it matters**: Prevents spam and abuse from automated scripts

### 3. **Enhanced Email Validation** 📧
- **Client-side**: HTML5 validation + regex pattern
- **Server-side**: Additional regex validation in Google Apps Script
- **Features**:
  - Format validation (must be valid email structure)
  - Length validation (max 254 characters per RFC 5321)
  - Lowercase normalization to prevent duplicates

### 4. **Server-Side Rate Limiting** 🚦
- **What it is**: Prevents the same email from submitting too many times
- **Configuration**:
  - Max 3 submissions per email address
  - Within a 5-minute window
  - Configurable in the Apps Script CONFIG object

### 5. **Timestamp Validation** 🕐
- **What it is**: Ensures submissions are recent and not replayed
- **How it works**: Server checks timestamp is within the last hour
- **Why it matters**: Prevents replay attacks and stale submissions

### 6. **Data Sanitization** 🧹
- **Email**: Trimmed and converted to lowercase
- **Interests**: HTML special characters removed (< and >)
- **User Agent**: Truncated to 200 characters max
- **All strings**: Length limits enforced

### 7. **Input Length Limits** 📏
- Email: Max 254 characters
- Interests: Max 500 characters
- User Agent: Max 200 characters
- Prevents buffer overflow and database bloat

### 8. **Language Whitelist** 🌐
- Only allows 'en' and 'pt'
- Prevents injection of arbitrary values

### 9. **No-CORS Mode** 🔒
- Prevents response data from being read by malicious scripts
- Google Apps Script requirement that adds extra security

## Additional Security Recommendations

### For Production Use:

#### 1. **Add reCAPTCHA v3** (Recommended) ✅
Google's invisible CAPTCHA that doesn't interrupt user experience:

```html
<!-- Add to <head> -->
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```

**Benefits**:
- Invisible to legitimate users
- Scores user behavior (0.0 = bot, 1.0 = human)
- Industry standard protection
- Free for most websites

**Setup**:
1. Get keys at https://www.google.com/recaptcha/admin
2. Add site key to HTML
3. Add secret key to Apps Script
4. Validate token server-side

#### 2. **Enable HTTPS** 🔐
- Required for production
- Encrypts data in transit
- Free with services like:
  - Netlify
  - Vercel
  - GitHub Pages
  - Cloudflare Pages

#### 3. **Add Content Security Policy (CSP)** 🛡️
Add to your HTML `<head>`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; 
               style-src 'self' 'unsafe-inline';
               connect-src 'self' https://script.google.com;">
```

#### 4. **Monitor Your Google Sheet** 📊
- Set up email notifications for new submissions
- Regularly check for suspicious patterns
- Keep backups of your data

#### 5. **Consider Email Verification** ✉️
For higher security:
- Send confirmation email with unique token
- Only count verified submissions
- Prevents fake email submissions

#### 6. **Add Domain Restrictions** (Advanced) 🌍
In Google Apps Script, check the referrer:

```javascript
function doPost(e) {
  const allowedDomains = ['yourdomain.com', 'www.yourdomain.com'];
  const referrer = e.parameter.referrer || '';
  
  // Validate referrer if provided
  // Note: This can be spoofed, so combine with other methods
}
```

## Current Security Level: **Good** ✅

Your form is now protected against:
- ✅ Basic bot submissions
- ✅ Spam attempts
- ✅ Rapid-fire submissions
- ✅ Invalid/malformed data
- ✅ Replay attacks
- ✅ Email flooding

Still vulnerable to (but unlikely):
- ⚠️ Determined manual spam
- ⚠️ Advanced bots (mitigated with reCAPTCHA)
- ⚠️ Email harvesting (publicly visible source code)

## Monitoring Tips

### In Google Sheets:
1. Sort by timestamp to see submission patterns
2. Look for duplicate emails
3. Check for suspicious interest patterns
4. Monitor submission frequency

### Red Flags:
- Multiple submissions within seconds
- Gibberish emails
- Same email with different interests repeatedly
- Submissions outside business hours (if unusual for your audience)

## Emergency Actions

If you detect spam:

1. **Immediate**: Temporarily remove the script URL from `index.html`
2. **Short-term**: Increase rate limiting values in Apps Script
3. **Long-term**: Implement reCAPTCHA

## Testing Your Security

1. **Test honeypot**: Fill the hidden field using browser dev tools - should fail silently
2. **Test rate limiting**: Submit multiple times quickly - should get cooldown message
3. **Test validation**: Try invalid emails - should get error message
4. **Test server rate limit**: Submit 4+ times from same email within 5 minutes - should fail on 4th

## Questions?

The implemented measures provide solid protection for a small community form. For higher traffic or more sensitive applications, consider adding reCAPTCHA as your next security layer.
