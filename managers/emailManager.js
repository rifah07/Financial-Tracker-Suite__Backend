const nodemailer= require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "12ad86218f7fa0",
      pass: "2af3ff3c8e638f",
    },
  });

  await transport.sendMail({
    to: to,
    from: "info@financialtrackersuite.com", // the domain of production server
    text:  text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;