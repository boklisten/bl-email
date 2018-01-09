


import {SendgridWrapper} from "./sendgrid.wrapper";
import {EmailTemplateInput} from "./template/email-template-input";
import {TemplateCompiler} from "./template/template-compiler";
import {EmailTemplateConfig} from "./template/email-template-config";
import {EmailLog} from "./email-log";

export class EmailHandler {
	private _sendGrid: SendgridWrapper;
	private _templateCompiler: TemplateCompiler;
	
	constructor(config: {sendgrid: {apiKey: string}}) {
		this._sendGrid = new SendgridWrapper(config.sendgrid.apiKey);
		this._templateCompiler = new TemplateCompiler();
	}
	
	public send(emailTemplateConfig: EmailTemplateConfig, emailTemplateInput: EmailTemplateInput): Promise<EmailLog> {
		emailTemplateInput = this.sanitizeEmailTemplateInput(emailTemplateInput);
		
		return new Promise((resolve, reject) => {
			this._sendGrid.send(
				emailTemplateInput.toEmail,
				emailTemplateInput.fromEmail,
				emailTemplateInput.subject,
				emailTemplateInput.emailType,
				this.getHtmlBasedOnType(emailTemplateConfig, emailTemplateInput))
				.then((emailLog: EmailLog) => {
					resolve(emailLog);
				})
				.catch((error: Error) => {
					reject(error);
				})
		});
	}
	
	private sanitizeEmailTemplateInput(etInput: EmailTemplateInput): EmailTemplateInput {
		if (etInput.items) {
			for (let item of etInput.items) {
				if (!etInput.showDeadline) item.deadline = null;
				if (!etInput.showPrice) item.price = null;
			}
		}
		
		return etInput;
	}
	
	private getHtmlBasedOnType(emailTemplateConfig: EmailTemplateConfig, emailTemplateInput: EmailTemplateInput): string {
		return this._templateCompiler.getHtml(emailTemplateConfig, emailTemplateInput);
	}
}
/*
const eHandler = new EmailHandler();
const etInput: EmailTemplateInput = {
	toEmail: "aholskil@gmail.com",
	fromEmail: "test@boklisten.co",
	subject: "your receipt",
	emailType: "receipt",
	showPrice: true,
	showDeadline: true,
	totalPrice: 950.0,
	numberOfCols: 3,
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

*/
