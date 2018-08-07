import {EmailHandler} from "./email.handler";
import {SECRETS} from "../config/secrets";
import {EmailSetting} from "./template/email-setting";
import {EmailOrder} from "./template/email-order";
import {EmailUser} from "./template/email-user";
import {EmailTextBlock} from "./template/email-text-block";



let emailHandler: EmailHandler = new EmailHandler({sendgrid: {apiKey: SECRETS.email.sendgrid.apiKey}, locale: 'nb'});


let emailTextBlocks: EmailTextBlock[] = [
];


let genericTextBlocks: EmailTextBlock[] = [
	{
		text: 'Hi there, this is a generic message'
	},
	{
		text: 'This is a alert to you regarding that you have failed to deliver',
		alert: true
	}
];

/*
let emailSetting: EmailSetting = {
	toEmail: 'aholskil@gmail.com',
	fromEmail: 'noreply@boklisten.co',
	subject: 'Order receipt from Boklisten.co',
	userId: 'user1',
	textBlocks: genericTextBlocks
};


let emailOrder: EmailOrder = {
	id: 'dfa2a83asc193274adf',
	showDeadline: false,
	showPrice: true,
	showStatus: true,
	totalAmount: '375 kr',
	itemAmount: '300 kr',
	items: [
		{
			title: 'Signatur 3: Tekstsamling',
			price: '100 kr',
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		},
		{
			title: 'Aqua 2',
			price: '200 kr',
			deadline: new Date().toLocaleDateString(),
			status: 'rent'
		}
	],
	showDelivery: false,
	delivery: {
		method: 'bring',
		address: 'Traktorveien 10D, 0134 OSLO',
		estimatedDeliveryDate: new Date().toLocaleDateString(),
		amount: '75',
		currency: 'NOK'
	},
	showPayment: false,
	payment: {
		total: '375',
		currency: 'NOK',
		payments: [
			{
				method: 'cash',
				amount: '100',
				taxAmount: '0',
				paymentId: 'abc113193',
				status: 'Confirmed',
				creationTime: '01.01.1900'
			},
			{
				method: 'card',
				amount: '100',
				cardInfo: '0123',
				taxAmount: '0',
				paymentId: 'abc113193',
				status: 'Confirmed',
				creationTime: '01.01.1900'
			},

		]
	}
};
*/


let emailSettings = {
	toEmail: 'aholskil@gmail.com',
	fromEmail: 'ikkesvar@boklisten.no',
	subject: 'Kvittering fra Boklisten.no',
	userId: '5b6579a26ccf334a2728d0f8',
	textBlocks: [
		{
			text: 'Vedlagt i denne mailen ligger en kontrakt som du trenger å skrive under på for å få leid bøkene. Kontrakten må du ha med deg når du kommer til oss på stand.'
		}
	]
};
let emailOrder = {
	id: '5b6967606df8b3411612a32f',
	showDeadline: true,
	showPrice: false,
	showStatus: true,
	showSubject: true,
	currency: 'NOK',
	itemAmount: '0',
	totalAmount: '0',
	items:
	[
		{
			title: 'Ergo 2 2012 fysikk på 1, 2, 3!',
			status: 'leie',
			subject: 'Norsk Almennkunnskap VG2 og VG3',
			deadline: '01.08.2018',
			price: null
		}
	],
	showDelivery: false,
	delivery: null,
	showPayment: false,
	payment: null
};

let emailUser = {
	id: '5b6579a26ccf334a2728d0f8',
	dob: '02.01.1999',
	name: 'Bill Johan Bobsen',
	email: 'aholskil@gmail.com',
	address: 'osloveien 10'
};
/*
emailHandler.sendOrderReceipt(emailSettings, emailOrder, emailUser, true).then(() => {
	console.log('the email was sent!');
}).catch((err) => {
	console.log('could not send email...', err);
});
*/


/*
emailHandler.sendEmailVerification(emailSetting, 'www.boklisten.co/email/confirm/fsda32c').then((emailLog) => {
	console.log('email confirm sent!', emailLog);
}).catch((emailError) => {
	console.log('confirm email: emailError', emailError);
});
*/
/*
emailHandler.sendPasswordReset(emailSetting, 'www.boklisten.co/password/reset/fjdaslk').then((emailLog) => {
	console.log('password reset sent!', emailLog);
}).catch((emailError) => {
	console.log('password reset error: ', emailError);
});
*/




