import nodemailer from 'nodemailer';
import config from '../config/config.js';
export default class EmailService {
    static #instance=null;
    constructor() {
        this.transport= nodemailer.createTransport({
            service: config.emailService,
            port: config.emailPort,
            auth:{
                user:config.emailUser,
                pass:config.emailPass,
            },
        });
    }

    sendEmail(to,subject,html,attachments=[]){
        return this.transport.sendMail({
            to,
            from:config.emailUser,
            subject,
            html,
            attachments,
        });
    }
    sendPassRecover(user,link){
        return this.sendEmail(
            user.email,
        `Hi ${user.first_Name}, Here is your password recover`,
        `<p>Click in the following link to change your password:</p>
        <a href=${link}>Change Password</a>`
        )
    }
    static getInstance(){
        if(!EmailService.#instance){
            EmailService.#instance= new EmailService();
        }
        return EmailService.#instance;
    }
}