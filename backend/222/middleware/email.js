const mail = require('nodemailer');
const { getMaxListeners } = require('../modules/administrator.model');

function sendMailVerification(whom, url) {
  console.log(url, whom);
  
  var transporter = mail.createTransport({
    service: 'gmail',
    auth: {
      user: 'group12.team@gmail.com',
      pass: 'diwanga111@'
    }
  });

  const message = {
    from: 'group12.team@gmail.com', // Sender address
    to: "wishvasd123@gmail.com",         // List of recipients
    subject: "verification", // Subject line
    // text: 'Have the most fun you can in a car. Get your Tesla today!', // Plain text body
    html: `<h3>Need to verified.please verify by using this.</h3><a href="${url}">verify</a>`
  };

  return transporter.sendMail(message);

}

module.exports = {
  sendMailVerification
}




