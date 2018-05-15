

import {EmailType} from "./email-type";
import {EmailAttachment} from "./email-attachment";

export type EmailTemplateInput = {
	emailType: EmailType,
	userId: string,
	toEmail: string,
	fromEmail: string,
	subject: string,
	username?: string,
	showPrice?: boolean,
	showDeadline?: boolean,
	title?: string,
	intro?: string,
	numberOfCols?: number,
	totalPrice?: number,
	passwordResetLink?: string,
	confirmLink?: string,
	items?: {
		title: string,
		status: string
		deadline?: string | null,
		price?: number | null,
	}[],
	textBlocks?: {
		text: string
	}[],
	attachments?: EmailAttachment[],
	order?: {
		orderId: string,
		delivery?: {
			type: 'bring',
			price: number
		},
		payment?: {
			type: string,
			amount: number
		}
	}
}