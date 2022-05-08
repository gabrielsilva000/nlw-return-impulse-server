import{ MailAdapter, SendMailData }from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "fas574f9as67",
        pass: "fg74s9zd7gg9"
    }
})

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){ 

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Chips <batata@gmail.com>',
        subject: subject,
        html: body,
    });

    };
}