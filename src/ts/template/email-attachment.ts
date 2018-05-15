export type EmailAttachment = {
	content: string,
	filename: string,
	type: string,
	disposition: 'attachment',
	contentId: string
}