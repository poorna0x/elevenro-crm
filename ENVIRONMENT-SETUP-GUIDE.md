# Environment Setup Guide

## 🚨 **500 Error Fix - Environment Variables Required**

The 500 error you're experiencing is caused by missing environment variables for the email service. Here's how to fix it:

## Required Environment Variables

### For Netlify (Production)
Set these in your Netlify dashboard under **Site Settings > Environment Variables**:

```bash
# Email Configuration (REQUIRED)
HOSTINGER_EMAIL_USER=your-email@yourdomain.com
HOSTINGER_EMAIL_PASS=your-email-password

# Supabase Configuration (REQUIRED)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Maps API (OPTIONAL - for location autocomplete and maps)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Optional
VITE_EMAIL_API_URL=/.netlify/functions/send-email
VITE_EMAIL_FROM=noreply@yourdomain.com
```

### For Local Development
Create a `.env.local` file in your project root:

```bash
# Copy from env.example and fill in your values
cp env.example .env.local
```

## Quick Fix Steps

### 1. **Immediate Fix (No Email Setup)**
The application will now work without email configuration. Bookings will be saved to the database but no confirmation emails will be sent.

### 2. **Complete Setup (With Email)**
1. **Get Hostinger Email Credentials:**
   - Log into your Hostinger control panel
   - Go to Email Accounts
   - Create an email account (e.g., `noreply@yourdomain.com`)
   - Note the password

2. **Set Environment Variables in Netlify:**
   - Go to your Netlify dashboard
   - Navigate to Site Settings > Environment Variables
   - Add the variables listed above

3. **Redeploy:**
   - Trigger a new deployment (or it will auto-deploy from git)

## Testing the Fix

### Test Email Function Locally:
```bash
cd netlify/functions
node -e "
const handler = require('./send-email.js');
const event = {
  httpMethod: 'POST', 
  body: JSON.stringify({
    to: 'test@example.com',
    subject: 'Test',
    html: '<p>Test email</p>'
  })
};
handler.handler(event, {}).then(r => console.log('Result:', r));
"
```

### Expected Results:
- **Without env vars**: 500 error with "Email configuration missing"
- **With env vars**: 200 success with email sent

## Troubleshooting

### If you still get 500 errors:
1. Check Netlify function logs in the dashboard
2. Verify environment variables are set correctly
3. Test the function locally with the command above

### If emails don't send:
1. Verify Hostinger email credentials
2. Check if your domain has proper DNS records
3. Test with a simple email client first

## Alternative Email Services

If Hostinger doesn't work, you can modify the function to use:
- Gmail SMTP
- SendGrid
- Mailgun
- AWS SES

Just update the transporter configuration in `netlify/functions/send-email.js`.
