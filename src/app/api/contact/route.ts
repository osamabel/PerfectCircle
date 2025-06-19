import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate form data
    if (!data.name || !data.email || !data.message || !data.phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter using Namecheap Private Email SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.privateemail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        // Namecheap Private Email supports TLS/STARTTLS
        rejectUnauthorized: true,
      },
    });

    // Temporary: Using Gmail SMTP (requires App Password)
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.BREVO_SMTP_USER, // Using same email as user
    //     pass: process.env.GMAIL_APP_PASSWORD || process.env.BREVO_SMTP_KEY, // Will need Gmail App Password
    //   },
    // });

    // Alternative: Ethereal Email for testing (development only)
    // Uncomment this for testing - emails won't be sent but you'll get a preview URL
    // const testAccount = await nodemailer.createTestAccount();
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // });

    // Email content (same as before)
    const mailOptions = {
      from: `"Website Contact Form" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL, // Where to receive submissions
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      text: `Name: ${data.name}\nCompany: ${data.company || "N/A"}\nPhone: ${data.phone}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Company:</strong> ${data.company || "N/A"}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Full error details:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      response: (error as any).response,
      code: (error as any).code,
    });

    return NextResponse.json(
      {
        error: "Failed to send email",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Could not send message",
      },
      { status: 500 }
    );
  }
}
