/**
 * Send Email Feature with Nodemon
 *
 * -> constructor
 *
 * -> _buildTransport
 *
 * -> send universal function
 *
 * -> sendWelcome
 *
 * -> sendConfirmationAccount
 *
 * -> sendPasswordReset
 */

import { env } from 'process';
import { createTransport } from 'nodemailer';
import { renderFile } from 'pug';
import htmlToText from 'html-to-text';

class Email {
  /**
   * Initialize email options
   * @param {Object: { user: {email: {String}, name: {String}}, url: {String}, subject: {String} }} options Email options
   */
  constructor(
    options = {
      user: { email: '', name: '' },
      url: '',
      message: '',
      subject: '',
    }
  ) {
    // Initialize from
    this.from = `${env.APP_USER} <${env.APP_USER_EMAIL}>`;

    // Initialize to
    this.to = options.user.email;

    // initialize user name
    this.name = options.user.name.split(' ').at(0);

    // initialize message
    this.message = options.message ? options.message : false;

    // Initialize subject
    this.subject = options.subject ? options.subject : false;

    // Initialize url
    this.url = options.url ? options.url : false;
  }

  /**
   * Build transport based on the environement variable
   *
   * Use sendGrid if on production
   *
   * Use Mailtrap is on development
   */
  _buildTransport() {
    // Based on production
    if (env.NODE_ENV_NR === 'production') {
      // Send mail using sendGrid settings
      return createTransport({
        service: 'sendGrid',
        auth: {
          user: env.SENDGRID_USER,
          pass: env.SENDGRID_PASS,
        },
      });
    }

    // Based on develpment
    if (env.NODE_ENV_NR === 'development') {
      // use mailtrap for testing
      return createTransport({
        host: env.MAILTRAP_HOST,
        port: env.MAILTRAP_PORT,
        auth: {
          user: env.MAILTRAP_USER,
          pass: env.MAILTRAP_PASS,
        },
      });
    }
  }

  /**
   * Send email
   * @param {String} subject Default email subject
   * @param {String} template Template name for pug html
   */
  async send(subject, template) {
    // @TODO: Implement pug html template
    const html = renderFile(`emails/${template}`, {
      name: this.name ? this.name : '',
      ...(this.url ? { url: this.url } : {}),
      ...(this.message ? { message: this.message } : {}),
    });

    // Prep Options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: this.message ? this.message : htmlToText.compile(html),
    };

    // Send Email
    await this._buildTransport().sendMail(mailOptions);
  }

  /**
   * Send a welcome message
   * @returns {Email} Instance of This class
   */
  async sendWelcomeMessage() {
    // set subject
    const setSubject = this.subject
      ? this.subject
      : 'Welcome to the Natours family 🤗🤗🤗';

    await this.send(setSubject, 'welcomeEmail');
    return this;
  }

  /**
   * Send a email confirmation message
   * @returns {Email} Instance of This class
   */
  async sendConfirmAccount() {
    // set subject
    const setSubject = this.subject
      ? this.subject
      : `📝📝📝 ${this.name} please confirm your account!`;

    await this.send(setSubject, 'confirmAccountEmail');
    return this;
  }

  /**
   * Send a email confirmation message
   * @returns {Email} Instance of This class
   */
  async sendPasswordReset() {
    // set subject
    const setSubject = this.subject
      ? this.subject
      : 'Account Password Reset Request (⏰ expires in 10 minutes)';

    await this.send(setSubject, 'confirmAccount');
    return this;
  }

  /**
   * Send account confirmation message
   * @returns {Email} Instance of This class
   */
  async sendAccountConfirmed() {
    // set subject
    const setSubject = this.subject
      ? this.subject
      : '😊😊😊 We are so thrilled you have confirmed your account';

    await this.send(setSubject, 'accountConfirmed');
    return this;
  }
}

// Export
export default Email;
