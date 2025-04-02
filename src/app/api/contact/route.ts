// src/app/api/contact/route.ts
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
    
    // // Create a transporter using Gmail
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER, // Your Gmail address
    //     pass: process.env.EMAIL_APP_PASSWORD, // Your Gmail app password
    //   },
    // });
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey', // Literally the string 'apikey'
        pass: process.env.SENDGRID_API_KEY,
      },
    });
    // Set up email data
    const mailOptions = {
      from: `"Website Contact Form"`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER, // Where you want to receive emails
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      text: `
      Name: ${data.name}
      Company: ${data.company || 'Not provided'}
      Phone: ${data.phone}
      Email: ${data.email}
      Message:
      ${data.message}
            `,
            html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
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
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: (error as Error).message },
      { status: 500 }
    );
  }
}