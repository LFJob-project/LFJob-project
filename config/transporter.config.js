const nodemailer = require("nodemailer");
 
const transporter = nodemailer.createTransport({
  host: 'smtp.hotmail.com',
  secure: true,
  port:465,
  auth: {
      user: `lfjob-project@hotmail.com`,
      pass: `Alicebob1!`
  },
});

module.exports = transporter;