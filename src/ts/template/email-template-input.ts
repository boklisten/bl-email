

import {EmailType} from "./email-type";

export type EmailTemplateInput = {
	emailType: EmailType,
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
	}[]
}