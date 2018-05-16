

import {EmailType} from "./email-type";
import {EmailAttachment} from "./email-attachment";

export type EmailTemplateInput = {
	emailType: EmailType,
	userId: string,
	user?: {
		dob: string,
		name: string,
		email: string,
		address: string
	},
	creationTime?: string,
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
		text: string,
		warning?: boolean,
		alert?: boolean,
		regular?: boolean,
		secondary?: boolean
	}[],
	attachments?: EmailAttachment[],
	order?: {
		orderId: string,
		showDelivery?: boolean,
		delivery?: {
			method: 'bring',
			estimatedDeliveryDate: string,
			price: string,
		},
		showPayment?: boolean,
		payment?: {
			type: string,
			amount: string,
			cardInfo: string,
			currency: string,
			taxAmount: string,
			paymentId: string,
			status: string
		}
	}
}