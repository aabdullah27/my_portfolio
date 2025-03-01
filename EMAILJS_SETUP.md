# Setting Up EmailJS for Contact Form

This document provides instructions on how to set up EmailJS to handle the contact form submissions on your portfolio website.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account.
2. Verify your email address to activate your account.

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services" and click "Add New Service".
2. Select "Gmail" as your service provider.
3. Follow the instructions to connect your Gmail account (my.abdullah.nauman@gmail.com).
4. Name your service (e.g., "service_gmail") and save it.

## Step 3: Create an Email Template

1. Go to "Email Templates" and click "Create New Template".
2. Create a template with the following structure:
   - Template Name: "template_contact" (or any name you prefer)
   - Subject: "New Contact Form Submission from {{name}}"
   - Content:
     ```html
     <h2>New Contact Form Submission</h2>
     <p><strong>Name:</strong> {{name}}</p>
     <p><strong>Email:</strong> {{email}}</p>
     <p><strong>Message:</strong></p>
     <p>{{message}}</p>
     <p><small>Submitted at: {{system_date}}</small></p>
     ```
3. Save your template.

## Step 4: Get Your Public Key

1. Go to "Account" > "API Keys".
2. Copy your "Public Key".

## Step 5: Configure Your Website

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Replace `your_service_id`, `your_template_id`, and `your_public_key` with the values from your EmailJS account.

## Testing

After setting up EmailJS, test your contact form by submitting a test message. You should receive the email at your Gmail address (my.abdullah.nauman@gmail.com).

## Troubleshooting

- If emails are not being sent, check your EmailJS dashboard for any error messages.
- Verify that your Gmail account is properly connected to EmailJS.
- Ensure that the form field names (`name`, `email`, `message`) match the template variables.
- Check that your public key is correctly set in the `.env.local` file.

## EmailJS Free Tier Limitations

The free tier of EmailJS allows:
- 200 emails per month
- 2 email templates
- 1 email service

If you need more capacity, consider upgrading to a paid plan.
