const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// API Endpoint for Contact Us form
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    // Configure NodeMailer transporter (using a test account or environment variables)
    // For production, update these variables in .env or the EC2 environment
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
      subject: `Tutoring New Contact Request: ${subject || 'Tutoring Website Inquiry'}`,
      text: `You have a new message from ${name} (${email}):\nPhone: ${phone || 'Not provided'}\n\n${message}`,
    };

    // If EMAIL_USER is not set, just log it instead of failing (for demo purposes)
    if (!process.env.EMAIL_USER) {
      console.log('Mock Email Sent:', mailOptions);
      return res.status(200).json({ message: 'Message received (mock mode, configure .env to send real emails).' });
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Thanks for your interest. Some one will contact you shortly' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// Anything that doesn't match the above routes, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
