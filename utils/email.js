import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from project root config.env
config({ path: path.join(__dirname, '..', 'config.env') });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async options => {
  // 1. Create a transporter
  const msg = {
    to: options.email,
    from: process.env.EMAIL_FROM,
    subject: options.subject,
    text: options.message,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw error;
  }
};

export default sendEmail;
