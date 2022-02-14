// Global
import { env } from 'process';
import path from 'path';

// 3rd Party
import { renderFile } from 'pug';
import { createTransport } from 'nodemailer';
import { convert } from 'html-to-text';

// local
import rootDir from './rootDir.js';

// Send Email Class
export default class Email {
  /**
   * Email Constructor
   * @param {Object{user: {email: String, firstName: String}, url: String}} options User and url
   */
  constructor(options = { user: { email: '', name: '' }, url: '' }) {
    this.to = options.user.email;
    this.from = `${env.APP_USER} <${env.APP_USER_EMAIL}>`;
    this.firstName = options.user.name.split(' ').at(0);
    this.url = options?.url;
  }

  /**
   * Configure development or production nodemailer transport
   * @returns {Function} A nodemailer transport
   */
  _buildTransport() {
    // 1) Production
    if (env.NODE_ENV === 'production') {
      // Sendgrid Config
      return createTransport({
        service: 'SendGrid',
        auth: {
          user: '',
          pass: '',
        },
      });
    }

    // 2) Development
    return createTransport({
      // Maitrap Service
      host: env.MAILTRAP_HOST,
      port: env.MAILTRAP_PORT,
      // Authentications
      auth: {
        user: env.MAILTRAP_USER,
        pass: env.MAILTRAP_PASS,
      },
    });
  }

  /**
   * Send Email Factory
   * @param {String} template
   * @param {String} subject
   * @param {Object} options
   */
  async send(template, subject, options) {
    const templatePath = path.join(
      rootDir,
      'views',
      'emails',
      `${template}.pug`
    );

    // 1) Config Pug Temaplate
    const html = renderFile(templatePath, {
      url: this.url,
      firstName: this.firstName,
      ...(options ? options : {}),
    });

    // 2) Create options
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    // 3) Send Email
    await this._buildTransport().sendMail(emailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family');
  }
}
