
import {SendgridWrapper} from "./sendgrid.wrapper";
import {SECRETS} from "../config/secrets";
import {EmailTemplateInput} from "./template/email-template-input";
import {TemplateCompiler} from "./template/template-compiler";
import {EmailTemplateConfig} from "./template/email-template-config";

export class EmailHandler {
	private _sendGrid: SendgridWrapper;
	private _templateCompiler: TemplateCompiler;
	
	constructor() {
		this._sendGrid = new SendgridWrapper(SECRETS.email.sendgrid.apiKey);
		this._templateCompiler = new TemplateCompiler();
	}
	
	public send(emailTemplateConfig: EmailTemplateConfig, emailTemplateInput: EmailTemplateInput) {
		this._sendGrid.send(emailTemplateInput.toEmail, emailTemplateInput.fromEmail, emailTemplateInput.subject, this.getHtmlBasedOnType(emailTemplateConfig, emailTemplateInput));
	}
	
	private getHtmlBasedOnType(eamilTemplateConfig: EmailTemplateConfig, emailTemplateInput: EmailTemplateInput): string {
		return this._templateCompiler.getHtml(eamilTemplateConfig, emailTemplateInput);
	}
}

const eHandler = new EmailHandler();
const etInput: EmailTemplateInput = {
	toEmail: "aholskil@gmail.com",
	fromEmail: "test@boklisten.co",
	subject: "test mail",
	emailType: "confirm-email"
};

const fs = require('fs');
const emailTemplateConfig = JSON.parse(fs.readFileSync(__dirname + '/../../src/data/emailTemplateConfig.json', 'utf8'));

eHandler.send(emailTemplateConfig, etInput);

