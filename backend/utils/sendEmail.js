import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or use 'host' and 'port' for other providers
    auth: {
      user: process.env.EMAIL_USER, // Add to .env
      pass: process.env.EMAIL_PASS  // Add to .env
    },
  });

  const mailOptions = {
    from: `"StockMaster Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;