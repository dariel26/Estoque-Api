require('dotenv').config();
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
var fs = require('fs');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (email, subject, attachments, content) => {
    return await transporter.sendMail({
        from: `<${process.env.EMAIL_USER}>`,
        to: `${email}`,
        subject: subject,
        html: content,
        attachments,
    })
}

module.exports = {
    confirmEmail: async (email, link) => {
        fs.readFile(__dirname + "/htmls/confirmEmail.htm", "utf-8", async (err, html) => {
            if (err) {
                return err;
            }
            const template = handlebars.compile(html);
            const htmlToSend = template({ link });
            const attachments = [{
                filename: 'amorim-removebg-preview.png',
                path: __dirname + '/images/amorim-removebg-preview.png',
                cid: 'logo@cid',
            }];
            return await sendEmail(email, "Email de confirmação", attachments, htmlToSend);
        });
    }
};