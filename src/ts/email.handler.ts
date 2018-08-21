


import {SendgridWrapper} from "./sendgrid.wrapper";
import {EmailTemplateInput} from "./template/email-template-input";
import {TemplateCompiler} from "./template/template-compiler";
import {EmailTemplateConfig} from "./template/email-template-config";
import {EmailLog} from "./email-log";
import {EmailAttachment} from "./template/email-attachment";
import {EmailOrder} from "./template/email-order";
import {EmailSetting} from "./template/email-setting";
import {EmailType} from "./template/email-type";
import {EmailUser} from "./template/email-user";
import {EmailTextBlock} from "./template/email-text-block";
import {isNullOrUndefined} from "util";
import moment = require("moment");

export class EmailHandler {
	private _sendGrid: SendgridWrapper;
	private _templateCompiler: TemplateCompiler;
	private _emailTemplateConfig: EmailTemplateConfig;
	private _agreementFileName: string;
	private _dateFormat: string;
	
	constructor(config: { emailTemplateConfig?: EmailTemplateConfig, sendgrid?: {apiKey: string}, locale?: 'en' | 'nb', agreementFileName?: string}) {
		this._dateFormat = 'DD.MM.YYYY';
		if (config.sendgrid) {
			this._sendGrid = new SendgridWrapper(config.sendgrid.apiKey);
		}
		this._templateCompiler = new TemplateCompiler();

		this._agreementFileName = (config.agreementFileName) ? config.agreementFileName : 'boklistenno_agreement';

		if (!isNullOrUndefined(config.locale)) {
			if (config.locale === 'nb') {
				this._emailTemplateConfig = require('../data/emailTemplateConfig.nb.json');
			} else {
				this._emailTemplateConfig = require('../data/emailTemplateConfig.json');
			}
		} else {
			this._emailTemplateConfig = (config.emailTemplateConfig) ? config.emailTemplateConfig : require('../data/emailTemplateConfig.json');

		}
	}

	public sendGeneric(emailSetting: EmailSetting, title: string, textBlocks: EmailTextBlock[]): Promise<EmailLog> {

		let emailTemplateInput: EmailTemplateInput = {
			title: title,
			creationTime: new Date().toString(),
			textBlocks: textBlocks
		};

		return this.sendEmail(emailSetting, 'generic', emailTemplateInput);
	}

	public sendPasswordReset(emailSetting: EmailSetting, passwordResetLink: string): Promise<EmailLog> {

		let emailTemplateInput: EmailTemplateInput = {
			creationTime: new Date().toString(),
			textBlocks: emailSetting.textBlocks,
			extra: {
				passwordResetLink: passwordResetLink
			}
		};

		return this.sendEmail(emailSetting, 'password-reset', emailTemplateInput);
	}

	public sendEmailVerification(emailSetting: EmailSetting, emailConfirmLink: string): Promise<EmailLog> {

		let emailTemplateInput: EmailTemplateInput = {
			creationTime: moment().format(this._dateFormat),
			textBlocks: emailSetting.textBlocks,
			extra: {
				emailConfirmLink: emailConfirmLink
			}
		};

		return this.sendEmail(emailSetting, 'confirm-email', emailTemplateInput);
	}

	public sendReminder(emailSetting: EmailSetting, emailOrder: EmailOrder, emailUser: EmailUser): Promise<EmailLog> {
		emailSetting.attachments = this.encodeAttachments(emailSetting.attachments);

		let emailTemplateInput: EmailTemplateInput = {
			user: emailUser,
			order: emailOrder,
			creationTime: moment().format(this._dateFormat),
			textBlocks: emailSetting.textBlocks
		};

		emailTemplateInput.order.showStatus = false;
		emailTemplateInput.order.showPrice = false;
		emailTemplateInput.order.showDeadline = true;
		emailTemplateInput.textBlocks = emailTemplateInput.textBlocks.concat(this._emailTemplateConfig.reminder.textBlocks);

		return this.sendEmail(emailSetting, 'reminder', emailTemplateInput);
	}

	public createEmailTemplateInput(emailSetting: EmailSetting, emailOrder: EmailOrder, emailUser: EmailUser) {
		return {
			user: emailUser,
			order: emailOrder,
			userFullName: (!isNullOrUndefined(emailSetting.userFullName)) ? emailSetting.userFullName : emailUser.name,
			creationTime: moment().format(this._dateFormat),
			textBlocks: emailSetting.textBlocks
		};
	}

	public async sendOrderReceipt(emailSetting: EmailSetting, emailOrder: EmailOrder, emailUser: EmailUser, withAgreement?: boolean) {
		emailSetting.attachments = this.encodeAttachments(emailSetting.attachments);


		let emailTemplateInput: EmailTemplateInput = this.createEmailTemplateInput(emailSetting, emailOrder, emailUser);

		if (withAgreement) {
			try {
				let agreementAttachment = await this.createRentAgreementAttachment(emailTemplateInput);
				emailSetting.attachments.push(agreementAttachment);
			} catch (e) {
				throw new Error('could not create agreement attachment for email');
			}
		}

		return this.sendEmail(emailSetting, 'receipt', emailTemplateInput);
	}

	public async sendDelivery(emailSetting: EmailSetting, emailOrder: EmailOrder, emailUser: EmailUser) {
		emailSetting.attachments = this.encodeAttachments(emailSetting.attachments);

		emailOrder.showPayment = false;
		emailOrder.showDeadline = false;
		emailOrder.showPrice = false;
		emailOrder.showDelivery = true;
		emailOrder.showSubject = false;

		let emailTemplateInput: EmailTemplateInput = {
			user: emailUser,
			order: emailOrder,
			userFullName: (!isNullOrUndefined(emailSetting.userFullName)) ? emailSetting.userFullName : emailUser.name,
			creationTime: moment().format(this._dateFormat),
			textBlocks: emailSetting.textBlocks
		};

		return this.sendEmail(emailSetting, 'receipt', emailTemplateInput);
	}

	private sendEmail(emailSetting: EmailSetting, emailType: EmailType, emailTemplateInput: EmailTemplateInput): Promise<EmailLog> {
		return this._sendGrid.send(
			emailSetting.userId,
			emailSetting.toEmail,
			emailSetting.fromEmail,
			emailSetting.subject,
			emailType,
			this._templateCompiler.getHtml(emailType, this._emailTemplateConfig, emailTemplateInput),
			emailSetting.attachments
		);
	}
	

	public createRentAgreementAttachment(emailTemplateInput: EmailTemplateInput): Promise<EmailAttachment> {
		return new Promise((resolve, reject) => {

			const receiptWithAgreementHtml = this._templateCompiler.getReceiptWithAgreementHtml(this._emailTemplateConfig, emailTemplateInput);
			const pdf = require('html-pdf');

			pdf.create(receiptWithAgreementHtml, {header: {height: '15mm'}, footer: {height: '25mm'}}).toBuffer((err, buffer) => {
				if (!Buffer.isBuffer(buffer) || err) {
					reject(new Error('pdf to buffer failed'));
				} else {
					return resolve({
						content: buffer.toString('base64'),
						contentId: 'agreement',
						filename: this._agreementFileName + '_' + moment().format('MM_DD_YYYY') + '.pdf',
						type: 'application/pdf'
					});
				}
			});
		});

	}

	public getEmailTemplateConfig(): EmailTemplateConfig {
		return this._emailTemplateConfig;
	}

	private encodeAttachments(attachments: EmailAttachment[]): EmailAttachment[] {
		if (attachments && attachments.length > 0) {
			for (let attachment of attachments) {
				//attachment.content = new Buffer(attachment.content).toString('base64');
			}
		} else {
			attachments = [];
		}

		return attachments;
	}
}
