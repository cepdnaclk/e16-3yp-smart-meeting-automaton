const mail = require('nodemailer');

function sendMailVerification({whom, url}) {
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'group12.team@gmail.com',
      pass: 'diwanga111@'
    }
  });

  const message = {
    from: 'group12.team@gmail.com', // Sender address
    to: whom,         // List of recipients
    subject: "verification", // Subject line
    // text: 'Have the most fun you can in a car. Get your Tesla today!', // Plain text body
    html: `<h3>Need to verified.please verify by using this.</h3><a href="${url}">verify</a>`
  };

  return transport.sendMail(message);

}

module.exports = {
  sendMailVerification
}




