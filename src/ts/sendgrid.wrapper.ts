export class SendgridWrapper {
	private sendgridMail: any;
	
	constructor(private sendgridApiKey: string) {
		this.sendgridMail = require('@sendgrid/mail');
		this.sendgridMail.setApiKey(sendgridApiKey);
	}
	
	public send(toEmail: string, fromEmail: string, subject: string, html: string) {
		console.log('the html to send', html);
		
		const sgMsg = {
			to: toEmail,
			from: fromEmail,
			subject: subject,
			html: html
		};
		
		
		
		this.sendgridMail.send(sgMsg).then(() => {
			console.log('message sent');
		}).catch((error: any) => {
			console.log('the error!!', error.toString());
			const {message, code, response} = error;
			const {headers, body} = response;
			
			console.log('msg', message);
			console.log('code', code);
			console.log('headers', headers);
			console.log('body', body);
		})
	}
}