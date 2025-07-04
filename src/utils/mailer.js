const nodemailer = require('nodemailer');

// Send OTP via Email
async function sendEmail(mailOptions) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'robertdev894@gmail.com',      
        pass: 'zotl njqq kcpe txts' 
      }
    });

    // const mailOptions = {
    //   from: '"Your App Name" <your_email@gmail.com>',
    //   to: toEmail,
    //   subject: 'Your OTP Code',
    //   html: `<h3>Your OTP is: <b>${otp}</b></h3><p>This will expire in 5 minutes.</p>`
    // };

    const info = await transporter.sendMail(mailOptions);
    return info
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
}

module.exports = sendEmail