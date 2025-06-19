import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(request: NextRequest) {
  try {
    // Create transporter using Namecheap Private Email SMTP (same as contact form)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.privateemail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // Test email content
    const mailOptions = {
      from: `"PerfectLoop Team" <${process.env.SENDER_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: "Test Email - Domain Verification Successful! 🎉",
      text: `This is a test email to verify that your PerfectLoop domain (perfectloop.tech) is properly configured with Namecheap Private Email.

Configuration Details:
- Domain: perfectloop.tech
- Sender: info@perfectloop.tech
- From Name: PerfectLoop Team

If you receive this email, your email setup is working correctly!

Best regards,
PerfectLoop Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4CAF50;">✅ Test Email - Domain Verification Successful!</h2>
          
          <p>This is a test email to verify that your PerfectLoop domain (<strong>perfectloop.tech</strong>) is properly configured with Namecheap Private Email.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Configuration Details:</h3>
            <ul>
              <li><strong>Domain:</strong> perfectloop.tech</li>
              <li><strong>Sender:</strong> info@perfectloop.tech</li>
              <li><strong>From Name:</strong> PerfectLoop Team</li>
            </ul>
          </div>
          
          <p style="color: #4CAF50; font-weight: bold;">✅ If you receive this email, your email setup is working correctly!</p>
          
          <p>Best regards,<br>PerfectLoop Team</p>
        </div>
      `,
    };

    // Send test email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      messageId: info.messageId,
      from: mailOptions.from,
      to: mailOptions.to,
    });
  } catch (error) {
    console.error("Test email error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send test email",
        details: (error as Error).message,
        config: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          sender: process.env.SENDER_EMAIL,
          contact: process.env.CONTACT_EMAIL,
        },
      },
      { status: 500 }
    );
  }
}
