const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');
const AppError = require('./appError');

module.exports = class Email {
  from = process.env.EMAIL_FROM;
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: process.env.RESEND_HOST,
        port: process.env.RESEND_PORT,
        secure: true,
        auth: {
          user: process.env.RESEND_USERNAME,
          pass: process.env.RESEND_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    try {
      const info = await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      throw new AppError('Something went worng!', 400);
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 min)',
    );
  }
};
