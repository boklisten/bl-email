import {EmailHandler} from "./email.handler";
import {SECRETS} from "../config/secrets";

let testConfig = {
	"link": {
	"leaseNotice": "#",
		"login": "http://www.boklisten.no",
		"website": "http://www.boklisten.no",
		"email": "info@boklisten.no",
		"logo": "http://boklisten.no/img36.jpg"
},
	"general": {
	"text": {
		"hello": "Hei,"
	},
	"img": {
		"logo": {
			"alt": "boklisten.no"
		}
	}
},
	"confirm-email": {
	"emailSetting": {
		"fromEmail": "noreply@boklisten.co",
			"subject": "Bekreft din e-post"
	},
	"text": {
		"title": "Bekreft din e-post",
			"intro": "For å kunne logge inn ber vi deg om å bekrefte din e-post. Dette gjør du ved å klikke knappen under.",
			"info": "Du bekrefter at dette er din e-post ved å klikke på knappen under",
			"button": "Bekreft e-post"
	}
},
	"deadline": {
	"emailSetting": {
		"fromEmail": "noreply@boklisten.no",
			"subject": "Fristen er snart her"
	},
	"text": {
		"title": "På tide å levere inn bøkene",
			"intro": "Du har bøker som snart skal leveres inn. Under finner du en liste over hvilke bøker som du ikke har levert enda.",
			"externalCandidateInfo": "Hvis du er privatist og ønsker å forlenge fristen kan dette enkelt gjøres ved å loggeinn på våre hjemmesider."
	}
},
	"generic": {
	"emailSetting": {
		"fromEmail": "noreply@boklisten.co",
			"subject": ""
	},
	"text": {

	}
},
	"hello": {
	"emailSetting": {
		"fromEmail": "noreply@boklisten.co",
			"subject": "Velkommen"
	},
	"text": {
		"title": "Velkommen!",
			"intro": "Nå kan du gå igang med å velge de bøkene du trenger til dette semesteret. Vi synes det er superkult at du valgte boklisten. God lesning!"
	}
},
	"password-reset": {
	"emailSetting": {
		"fromEmail": "noreply@boklisten.no",
			"subject": "Endring av passord"
	},
	"text": {
		"title": "Endring av passord",
			"intro": "Du har bedt om å få endre passord. Hvis du klikker knappen under kan du enkelt gjøre dette.",
			"info": "Du kan endre passord ved å klikke på knappen under eller følg",
			"linkTitle": "denne linken.",
			"button": "Endre passord",
			"warning": "Hvis dette ikke var deg, så vil vi gjerne at du kontakter oss. Dette kan du gjøre ved å sende e-post til:"
	}
},
	"receipt": {
	"emailSetting": {
		"fromEmail": "noreply@boklisten.co",
			"subject": "Kvittering"
	},
	"text": {
		"title": "Kvittering",
			"intro": "Dette er en kvittering på de transaksjonene du nettopp gjorde hos oss"
	}
},
	"partial": {
	"contact": {
		"title": "Kontaktinfo",
			"email": {
			"title": "E-post:",
				"value": "info@boklisten.no"
		},
		"website": {
			"title": "Nettside:",
				"value": "www.boklisten.no"
		},
		"address": {
			"title": "Adresse:",
				"value": "Pb 8, 1359 Eiksmarka"
		}
	},
	"header": {},
	"item-list": {
		"text": {
			"totalPriceTitle": "Total",
			"titleHeader": "Title",
			"statusHeader": "Status",
			"deadlineHeader": "Deadline",
			"priceHeader": "Price"
		}
	},
	"leaseNotice": {
		"info": "Vi minner om at dersom du ikke leverer bøkene i tide vil det tilkomme gebyrer. Dette i henhold til leieavtalen som du har godtatt.",
			"link": "Les leieavtalen her"
	},
	"login": {
		"info": "For å se hvor du kan hente, levere, forlenge eller bestille bøker:",
			"button": "Logg inn på boklisten.no"
	}
}
} as any;

let emailHandler: EmailHandler = new EmailHandler({emailTemplateConfig: testConfig, sendgrid: {apiKey: SECRETS.email.sendgrid.apiKey}});

emailHandler.sendWithAgreement({
	toEmail: 'aholskil@gmail.com',
	fromEmail: 'noreply@boklisten.co',
	emailType: 'receipt',
	userId: 'user1',
	creationTime: new Date().toLocaleDateString(),
	user: {
		dob: '01.01.2000',
		name: 'Albert Hans Hansen',
		email: 'ahanshansen@b.com',
		address: 'Osloveien 1B 7070 BOSBERG'
	},
	order: {
		orderId: 'dfa2a83asc193274adf'
	},
	subject: 'a attachment for you',
	showPrice: true,
	showDeadline: true,
	numberOfCols: 3,
	totalPrice: 100,
	items: [
		{
			title: 'Signatur 3: Tekstsamling',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Signatur 3: Tekstsamling',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Signatur 3: Tekstsamling',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Signatur 3: Tekstsamling',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Signatur 3: Tekstsamling',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Signatur 3: Tekstsamling',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Signatur 3: Tekstsamling',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Signatur 3: Tekstsamling',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: 100,
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		}
	],
	textBlocks: [
		{
			text: 'Included with this email are a agreement that needs to be signed before you can get the items',
			warning: true
		},
		{
			text: 'This is an important message for you',
			alert: true
		},
		{
			text: 'This is just to get your attention',
			secondary: true
		},
		{
			text: 'This is a regular message.'
		}
	]
}).then((emailLog) => {
	console.log('the log ', emailLog);
}).catch((emailError) => {
	console.log('got an error', emailError);
});
