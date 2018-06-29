

import {EmailAttachment} from "./email-attachment";
import {EmailOrder} from "./email-order";
import {EmailTextBlock} from "./email-text-block";
import {EmailUser} from "./email-user";

export type EmailTemplateInput = {
	user?: EmailUser,
	userFullName?: string,
	title?: string, //override the title of the email
	order?: EmailOrder
	creationTime?: string,
	textBlocks?: EmailTextBlock[],
	extra?: {
		emailConfirmLink?: string,
		passwordResetLink?: string
	}
}