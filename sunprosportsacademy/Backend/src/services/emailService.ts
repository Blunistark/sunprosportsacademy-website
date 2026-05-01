import nodemailer from 'nodemailer';
import { env } from '../config/env';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const emailService = {
  async sendContactEmail(data: { name: string, email: string, organization: string, note: string }) {
    const mailOptions = {
      from: env.SMTP_FROM,
      to: env.CONTACT_RECEIVER_EMAIL, // Configurable recipient
      subject: `New Consultation Request: ${data.organization}`,
      text: `
        New Consultation Request Received:
        
        Name: ${data.name}
        Email: ${data.email}
        Organization: ${data.organization}
        
        Message/Details:
        ${data.note}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #001f3f;">New Consultation Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Organization:</strong> ${data.organization}</p>
          <hr />
          <p><strong>Message/Details:</strong></p>
          <p style="white-space: pre-wrap;">${data.note}</p>
        </div>
      `,
    };

    return transporter.sendMail(mailOptions);
  },
};
