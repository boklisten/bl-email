import {EmailLog} from "./email-log";
import {EmailType} from "./template/email-type";

export class SendgridWrapper {
	private sendgridMail: any;
	
	constructor(private sendgridApiKey: string) {
		this.sendgridMail = require('@sendgrid/mail');
		this.sendgridMail.setApiKey(sendgridApiKey);
	}
	
	public send(toEmail: string, fromEmail: string, subject: string, type: EmailType, html: string): Promise<EmailLog> {
		return new Promise((resolve, reject) => {
			
			const sgMsg = {
				to: toEmail,
				from: fromEmail,
				subject: subject,
				html: html
			};
			
			this.sendgridMail.send(sgMsg).then(() => {
				resolve(new EmailLog(sgMsg.to, sgMsg.from, type));
			}).catch((error: any) => {
				reject(new Error('could not send email to "' + sgMsg.to + '"'));
			});
		});
	}
}