export type EmailTemplateConfig = {
	link: {
		leaseNotice: string,
		login: string,
		website: string,
		email: string
	},
	text: {
		general: string,
	},
	leaseNotice: {
		info: string,
		link: string
	},
	login: {
		info: string,
		button: string
	},
	contact: {
		title: string,
		email: {
			title: string,
			value: string
		},
		website: {
			title: string,
			value: string
		}
	},
	confirm: {
		title: string,
		intro: string,
		info: string,
		button: string
	},
	deadline: {
		title: string,
		intro: string,
		externalCandidateInfo: string
	},
	order: {
		title: string,
		intro: string
	},
	hello: {
		title: string,
		intro: string
	},
	passwordReset: {
		title: string,
		intro: string,
		info: string,
		linkTitle: string,
		button: string,
		warning: string
	},
	itemList: {
		totalPriceTitle: string,
		titleHeader: string,
		statusHeader: string,
		deadlineHeader: string,
		priceHeader: string
	}
}