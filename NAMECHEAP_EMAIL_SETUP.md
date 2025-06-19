# Namecheap Private Email Setup Guide

## Overview
This guide will help you complete the switch from Brevo to Namecheap Private Email for your PerfectCircle application.

## 1. DNS Configuration (REQUIRED)
You mentioned that Namecheap provided you with these DNS records. Make sure these are added to your domain's DNS management panel:

### MX Records
```
@   MX   10   mx1.privateemail.com
@   MX   10   mx2.privateemail.com
```

### SPF Record
```
@   TXT   v=spf1 include:spf.privateemail.com ~all
```

### DKIM Record (IMPORTANT)
⚠️ **You MUST add a DKIM record after creating your email account**. This is mandatory for outgoing mail to work correctly.

1. Create your email account first: `info@perfectloop.tech`
2. Follow [this guide](https://www.namecheap.com/support/knowledgebase/article.aspx/10383/2176/how-to-set-up-a-dkim-record-for-private-email/) to generate and add the DKIM record

## 2. Environment Variables Configuration

Update your `.env` file with your actual email credentials:

```env
# Email Configuration (Namecheap Private Email)
SMTP_HOST=mail.privateemail.com
SMTP_PORT=587
SMTP_USER=info@perfectloop.tech  # Your actual Namecheap Private Email address
SMTP_PASSWORD=your_actual_email_password_here    # Replace with your actual email account password
SENDER_EMAIL=info@perfectloop.tech  # Your verified sender email
CONTACT_EMAIL=info@perfectloop.tech    # Email where contact form submissions will be sent
```

### How to get your email password:
1. Log into your Namecheap account
2. Go to your Private Email dashboard
3. Create the mailbox `info@perfectloop.tech` if not already created
4. Set/note the password for this email account

## 3. Code Changes (COMPLETED ✅)
The following files have been updated to use Namecheap Private Email:
- `src/app/api/contact/route.ts` - Contact form email functionality
- `src/app/api/test-email/route.ts` - Test email functionality
- `.env` - Environment variables template

## 4. Testing Your Setup

### Step 1: Update Environment Variables
1. Replace `your_actual_email_password_here` in `.env` with your real email password
2. Verify all other email settings are correct

### Step 2: Test Email Functionality
1. Start your application: `npm run dev`
2. Visit: `http://localhost:3000/api/test-email`
3. Check if the test email is sent successfully
4. If successful, test the contact form on your website

### Step 3: Verify Delivery
1. Check that emails arrive in your `info@perfectloop.tech` inbox
2. Verify emails are not marked as spam
3. Test reply functionality

## 5. SMTP Settings Reference

For Namecheap Private Email:
- **SMTP Server**: `mail.privateemail.com`
- **SMTP Port**: `587` (TLS/STARTTLS) or `465` (SSL)
- **Security**: TLS/STARTTLS (recommended)
- **Authentication**: Required
- **Username**: Your full email address
- **Password**: Your email account password

## 6. Troubleshooting

### Common Issues:

1. **"Authentication failed"**
   - Double-check your email password
   - Ensure the email account is created in Namecheap
   - Verify the username is the full email address

2. **"Connection timeout"**
   - Check if your VPS provider blocks SMTP ports
   - Try port 465 with SSL instead of 587
   - Contact your hosting provider about SMTP restrictions

3. **Emails marked as spam**
   - Ensure DKIM record is properly set up
   - Verify SPF record is correct
   - Consider adding a DMARC record

4. **DNS not propagated**
   - DNS changes can take up to 24-48 hours to propagate globally
   - Use `dig` or online DNS checkers to verify records

### Testing DNS Records:
```bash
# Check MX records
dig MX perfectloop.tech

# Check SPF record
dig TXT perfectloop.tech

# Check DKIM record (after setup)
dig TXT default._domainkey.perfectloop.tech
```

## 7. Next Steps

1. ✅ DNS records configured
2. ⏳ Create email account in Namecheap dashboard
3. ⏳ Update `.env` with real password
4. ⏳ Set up DKIM record
5. ⏳ Test email functionality
6. ⏳ Monitor email delivery

## 8. Additional Features

Namecheap Private Email also provides:
- Webmail access at: https://privateemail.com/
- Calendar and contacts sync
- Mobile app support
- Anti-spam protection

## Support

If you need help:
- Namecheap Support: Available 24/7 via live chat
- Email issues: Check the error logs in your application
- DNS issues: Use online DNS propagation checkers

---

**Important**: Keep your email credentials secure and never commit them to version control! 