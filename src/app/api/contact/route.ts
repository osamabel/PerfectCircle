import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate form data
    if (!data.name || !data.email || !data.message || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create transporter using Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
      tls: {
        // Some servers may require this
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });
    
    // Email content (same as before)
    const mailOptions = {
      from: `"Website Contact Form" <${process.env.BREVO_SENDER_EMAIL || process.env.BREVO_SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL, // Where to receive submissions
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      text: `Name: ${data.name}\nCompany: ${data.company || 'N/A'}\nPhone: ${data.phone}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent:', info.messageId);
    
    return NextResponse.json({ success: true, messageId: info.messageId });
    
  } catch (error) {
    console.error('Full error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      response: (error as any).response,
      code: (error as any).code,
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: process.env.NODE_ENV === 'development' 
          ? (error as Error).message 
          : 'Could not send message'
      },
      { status: 500 }
    );
  }
}