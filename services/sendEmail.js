const nodemailer = require("nodemailer");

const sendEmail = async(options)=>{
    
    const transporter = nodemailer.createTransport({
       service : 'gmail',
        auth: {
        //   TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });
      const mailOptions = {
        from : "digital momo",
        to : options.email,
        subject :options.subject,
        text : options.message
      }
      await transporter.sendMail(mailOptions)
}
module.exports = sendEmail