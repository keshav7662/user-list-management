const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

exports.sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'keshavverma472@gmail.com',
        to: 'keshavverma4721999@gmail.com',
        subject: "subject goes here",
        text: 'text goes here',
    };

    return transporter.sendMail(mailOptions);
};
