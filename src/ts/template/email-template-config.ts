import {EmailSetting} from "./email-setting";

export type EmailTemplateConfig = {
	link: {
		leaseNotice: string,
		login: string,
		website: string,
		email: string,
		logo: string
	},
	general: {
		text: {
			hello: string
		},
		img: {
			logo: {
				alt: string
			}
		}
	},
	"confirm-email": {
		emailSetting: EmailSetting,
		text: {
			title: string,
			intro: string,
			info: string,
			button: string
		}
	},
	deadline: {
		emailSetting: EmailSetting
		text: {
			title: string,
			intro: string,
			externalCandidateInfo: string
		}
	},
	generic: {
		emailSetting: EmailSetting,
		text: {
		
		}
	},
	hello: {
		emailSetting: EmailSetting,
		text: {
			title: string,
			intro: string
		}
	}
	"password-reset": {
		emailSetting: EmailSetting,
		text: {
			title: string,
			intro: string,
			info: string,
			linkTitle: string,
			button: string,
			warning: string
		}
	}
	receipt: {
		emailSetting: EmailSetting,
		text: {
			title: string,
			intro: string
		}
	},
	partial: {
		contact: {
			title: string,
			email: {
				title: string,
				value: string
			},
			website: {
				title: string,
				value: string
			},
			address: {
				title: string,
				value: string
			}
		},
		header: {}
		"item-list": {
			totalPriceTitle: string,
			titleHeader: string,
			statusHeader: string,
			deadlineHeader: string,
			priceHeader: string
		},
		leaseNotice: {
			info: string,
			link: string
		},
		login: {
			info: string,
			button: string
		},
		"text-container": {}
	}
}