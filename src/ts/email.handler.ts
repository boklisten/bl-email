


import {SendgridWrapper} from "./sendgrid.wrapper";
import {EmailTemplateInput} from "./template/email-template-input";
import {TemplateCompiler} from "./template/template-compiler";
import {EmailTemplateConfig} from "./template/email-template-config";
import {EmailLog} from "./email-log";
import {EmailAttachment} from "./template/email-attachment";

export class EmailHandler {
	private _sendGrid: SendgridWrapper;
	private _templateCompiler: TemplateCompiler;
	private _emailTemplateConfig: EmailTemplateConfig;
	
	constructor(config: { emailTemplateConfig: EmailTemplateConfig, sendgrid: {apiKey: string}}) {
		this._sendGrid = new SendgridWrapper(config.sendgrid.apiKey);
		this._templateCompiler = new TemplateCompiler();
		this._emailTemplateConfig = config.emailTemplateConfig;
	}
	
	public send(emailTemplateInput: EmailTemplateInput): Promise<EmailLog> {
		emailTemplateInput = this.sanitizeEmailTemplateInput(emailTemplateInput);

		if (emailTemplateInput.attachments && emailTemplateInput.attachments.length > 0) {
			emailTemplateInput.attachments = this.encodeAttachments(emailTemplateInput.attachments);
		}

		return new Promise((resolve, reject) => {
			this._sendGrid.send(
				emailTemplateInput.userId,
				emailTemplateInput.toEmail,
				emailTemplateInput.fromEmail,
				emailTemplateInput.subject,
				emailTemplateInput.emailType,
				this.getHtmlBasedOnType(this._emailTemplateConfig, emailTemplateInput),
				emailTemplateInput.attachments)

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

	private encodeAttachments(attachments: EmailAttachment[]): EmailAttachment[] {
		for (let attachment of attachments) {
			attachment.content = new Buffer(attachment.content).toString('base64');
		}

		return attachments;
	}
	
	private getHtmlBasedOnType(emailTemplateConfig: EmailTemplateConfig, emailTemplateInput: EmailTemplateInput): string {
		return this._templateCompiler.getHtml(emailTemplateConfig, emailTemplateInput);
	}
}
