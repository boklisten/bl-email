
import {SendgridWrapper} from "./sendgrid.wrapper";
import {SECRETS} from "../config/secrets";
import {EmailTemplateInput} from "./template/email-template-input";
import {TemplateCompiler} from "./template/template-compiler";
import {EmailTemplateConfig} from "./template/email-template-config";
import {EmailLog} from "./email-log";

export class EmailHandler {
	private _sendGrid: SendgridWrapper;
	private _templateCompiler: TemplateCompiler;
	
	constructor() {
		this._sendGrid = new SendgridWrapper(SECRETS.email.sendgrid.apiKey);
		this._templateCompiler = new TemplateCompiler();
	}
	
	public send(emailTemplateConfig: EmailTemplateConfig, emailTemplateInput: EmailTemplateInput): Promise<EmailLog> {
		return new Promise((resolve, reject) => {
			this._sendGrid.send(
				emailTemplateInput.toEmail,
				emailTemplateInput.fromEmail,
				emailTemplateInput.subject,
				this.getHtmlBasedOnType(emailTemplateConfig, emailTemplateInput))
				.then((emailLog: EmailLog) => {
					resolve(emailLog);
				})
				.catch((error: Error) => {
					reject(error);
				})
		});
	}
	
	private getHtmlBasedOnType(eamilTemplateConfig: EmailTemplateConfig, emailTemplateInput: EmailTemplateInput): string {
		return this._templateCompiler.getHtml(eamilTemplateConfig, emailTemplateInput);
	}
}

const eHandler = new EmailHandler();
const etInput: EmailTemplateInput = {
	toEmail: "aholskil@gmail.com",
	fromEmail: "test@boklisten.co",
	subject: "your receipt",
	emailType: "receipt",
	showPrice: true,
	showDeadline: true,
	items: [
		{
			title: "Signatur 3",
			price: 500.0,
			deadline: "01.01.2012",
			status: "ordered"
		},
		{
			title: "Kosmos SF",
			price: 450.0,
			deadline: "01.01.2017",
			status: "ordered"
		}
	]
};

const fs = require('fs');
const emailTemplateConfig = JSON.parse(fs.readFileSync(__dirname + '/../../src/data/emailTemplateConfig.json', 'utf8'));

eHandler.send(emailTemplateConfig, etInput)
	.then((emailLog: EmailLog) => {
		console.log('we got the log', emailLog);
	})
	.catch((error: Error) => {
		console.log('an error sending email', error);
	});

