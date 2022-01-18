import { env } from 'process';

import { createTransport } from 'nodemailer';

const sendMail = async options => {
  // Create Transporter
  const transporter = createTransport({
    // Maitrap Service
    host: env.MAILTRAP_HOST,
    port: env.MAILTRAP_PORT,
    // Authentications
    auth: {
      user: env.MAILTRAP_USER,
      pass: env.MAILTRAP_PASS,
    },
  });

  // Add options to the transporter
  const mailOptions = {
    from: 'Natours Admin <admin@natour.app>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:options.message
  };

  // Send mail
  await transporter.sendMail(mailOptions);
};

export default sendMail;
