var nodemailer = require('nodemailer');

var email = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'msefeane@gmail.com',
    pass: 'pass'
  }
});
/*
var mailOptions = {
  from: 'kori@matcha.com',
  to: 'kori@mailinator.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

email.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/
module.exports = email
