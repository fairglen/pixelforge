/**
 * Enhanced Google Apps Script for Form Submissions
 * This includes server-side validation and security measures
 */

// Configuration
const CONFIG = {
  MAX_EMAIL_LENGTH: 254,
  MAX_INTERESTS_LENGTH: 500,
  ALLOWED_LANGUAGES: ['en', 'pt'],
  RATE_LIMIT_MINUTES: 5, // Minutes to check for duplicate submissions
  MAX_SUBMISSIONS_PER_EMAIL: 3, // Max submissions from same email in rate limit window
  RECAPTCHA_SECRET_KEY: '', // Add your reCAPTCHA secret key here (optional)
  RECAPTCHA_MIN_SCORE: 0.5, // Minimum score to accept (0.0 = bot, 1.0 = human)
  SHEET_NAME: 'responses' // Change this to your actual sheet name (e.g., 'Responses', 'Form Data', etc.)
};

/**
 * Handle POST requests from the web form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate the data
    const validation = validateData(data);
    if (!validation.valid) {
      return createErrorResponse(validation.error);
    }
    
    // Verify reCAPTCHA if token provided and secret key configured
    if (data.recaptchaToken && CONFIG.RECAPTCHA_SECRET_KEY) {
      const recaptchaValid = verifyRecaptcha(data.recaptchaToken);
      if (!recaptchaValid) {
        return createErrorResponse('reCAPTCHA verification failed');
      }
    }
    
    // Check for rate limiting
    const rateLimitCheck = checkRateLimit(data.email);
    if (!rateLimitCheck.allowed) {
      return createErrorResponse('Too many submissions. Please try again later.');
    }
    
    // Get the correct sheet by name (not active sheet)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    // If sheet doesn't exist, use the first sheet
    if (!sheet) {
      sheet = spreadsheet.getSheets()[0];
      console.log('Sheet not found, using first sheet: ' + sheet.getName());
    }
    
    // Sanitize and prepare data
    const sanitizedData = sanitizeData(data);
    
    // Log what we're about to append (for debugging)
    console.log('Appending data to sheet: ' + sheet.getName());
    console.log('Data: ' + JSON.stringify(sanitizedData));
    
    // Append the data to the sheet
    sheet.appendRow([
      sanitizedData.timestamp,
      sanitizedData.email,
      sanitizedData.interests,
      sanitizedData.language,
      sanitizedData.source,
      sanitizedData.userAgent
    ]);
    
    // Return success response
    return createSuccessResponse();
    
  } catch (error) {
    console.log('Error in doPost: ' + error.toString());
    return createErrorResponse('Server error. Please try again later.');
  }
}

/**
 * Validate incoming data
 */
function validateData(data) {
  // Check if required fields exist (email is now optional)
  if (!data.interests || !data.language || !data.timestamp) {
    return { valid: false, error: 'Missing required fields' };
  }
  
  // Validate email format only if provided
  if (data.email && data.email !== 'Not provided') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { valid: false, error: 'Invalid email format' };
    }
    
    // Validate email length
    if (data.email.length > CONFIG.MAX_EMAIL_LENGTH) {
      return { valid: false, error: 'Email too long' };
    }
  }
  
  // Validate interests length
  if (data.interests.length > CONFIG.MAX_INTERESTS_LENGTH) {
    return { valid: false, error: 'Interests data too long' };
  }
  
  // Validate language
  if (!CONFIG.ALLOWED_LANGUAGES.includes(data.language)) {
    return { valid: false, error: 'Invalid language' };
  }
  
  // Validate timestamp (must be recent - within last hour)
  const submittedTime = new Date(data.timestamp);
  const now = new Date();
  const hourAgo = new Date(now.getTime() - (60 * 60 * 1000));
  
  if (submittedTime < hourAgo || submittedTime > now) {
    return { valid: false, error: 'Invalid timestamp' };
  }
  
  return { valid: true };
}

/**
 * Check rate limiting for an email address
 * Skip if no email provided
 */
function checkRateLimit(email) {
  // Skip rate limiting if no email provided
  if (!email || email === 'Not provided') {
    return { allowed: true };
  }
  
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  
  // If sheet doesn't exist, use the first sheet
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
  }
  
  const data = sheet.getDataRange().getValues();
  
  // Get current time and rate limit cutoff
  const now = new Date();
  const cutoffTime = new Date(now.getTime() - (CONFIG.RATE_LIMIT_MINUTES * 60 * 1000));
  
  // Count recent submissions from this email
  let recentSubmissions = 0;
  
  for (let i = data.length - 1; i >= 1; i--) { // Start from bottom, skip header
    const rowTimestamp = new Date(data[i][0]); // Timestamp is in column A
    const rowEmail = data[i][1]; // Email is in column B
    
    // If we've gone past the cutoff time, we can stop checking
    if (rowTimestamp < cutoffTime) {
      break;
    }
    
    // Count submissions from this email
    if (rowEmail === email) {
      recentSubmissions++;
    }
  }
  
  // Check if limit exceeded
  if (recentSubmissions >= CONFIG.MAX_SUBMISSIONS_PER_EMAIL) {
    return { allowed: false };
  }
  
  return { allowed: true };
}

/**
 * Verify reCAPTCHA token
 */
function verifyRecaptcha(token) {
  if (!CONFIG.RECAPTCHA_SECRET_KEY) {
    return true; // Skip if not configured
  }
  
  try {
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const payload = {
      secret: CONFIG.RECAPTCHA_SECRET_KEY,
      response: token
    };
    
    const options = {
      method: 'post',
      payload: payload,
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    // Check if verification succeeded and score is acceptable
    if (result.success && result.score >= CONFIG.RECAPTCHA_MIN_SCORE) {
      return true;
    }
    
    console.log('reCAPTCHA failed: ' + JSON.stringify(result));
    return false;
    
  } catch (error) {
    console.log('reCAPTCHA verification error: ' + error.toString());
    return false;
  }
}

/**
 * Sanitize data to prevent injection attacks
 */
function sanitizeData(data) {
  return {
    timestamp: new Date(data.timestamp),
    email: data.email && data.email !== 'Not provided' ? data.email.trim().toLowerCase() : 'Not provided',
    interests: data.interests.trim().replace(/[<>]/g, ''), // Remove < and >
    language: data.language.trim(),
    source: (data.source || 'qr-direct').trim().substring(0, 50), // Track traffic source
    userAgent: (data.userAgent || 'Not provided').substring(0, 200)
  };
}

/**
 * Create a success response
 */
function createSuccessResponse() {
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'Form submitted successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create an error response
 */
function createErrorResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'error',
    'error': message
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Set up the spreadsheet with proper headers
 * Run this once manually to initialize
 */
function setupSpreadsheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  console.log('Using sheet: ' + sheet.getName());
  // If sheet doesn't exist, use the first sheet
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
    console.log('Using sheet: ' + sheet.getName());
  }
  
  // Check if headers already exist
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Email', 'Interests', 'Language', 'Source', 'User Agent']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    sheet.setFrozenRows(1);
    console.log('Headers added to sheet: ' + sheet.getName());
  } else {
    console.log('Sheet already has data. Row count: ' + sheet.getLastRow());
  }
}
