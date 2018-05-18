import {EmailHandler} from "./email.handler";
import {SECRETS} from "../config/secrets";
import {EmailSetting} from "./template/email-setting";
import {EmailOrder} from "./template/email-order";
import {EmailUser} from "./template/email-user";
import {EmailTextBlock} from "./template/email-text-block";



let emailHandler: EmailHandler = new EmailHandler({sendgrid: {apiKey: SECRETS.email.sendgrid.apiKey}});


let emailTextBlocks: EmailTextBlock[] = [
	{
		text: 'This is the receipt of the last transaction you did at boklisten.co'
	},
	{
		text: 'Included in this email are an agreement that you need to sign and deliver at branch when you whant to retrieve the items.',
		warning: true
	}
];

let emailSetting: EmailSetting = {
	toEmail: 'aholskil@gmail.com',
	fromEmail: 'noreply@boklisten.co',
	subject: 'Order receipt from Boklisten.co',
	userId: 'user1',
	textBlocks: emailTextBlocks
};

let emailOrder: EmailOrder = {
	id: 'dfa2a83asc193274adf',
	showDeadline: true,
	showPrice: true,
	totalAmount: '375 kr',
	itemAmount: '300 kr',
	showDelivery: true,
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
	delivery: {
		method: 'bring',
		address: 'Traktorveien 10D, 0134 OSLO',
		estimatedDeliveryDate: new Date().toLocaleDateString(),
		price: "75 kr"
	},
	showPayment: true,
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

let emailUser: EmailUser = {
	id: 'user1',
	dob: '01.01.2000',
	name: 'Billy Bob Johansen',
	email: 'aholskil@gmail.com',
	address: 'Traktorveien 10D, 3421, OSLO'
};


emailHandler.sendOrderReceipt(emailSetting, emailOrder, emailUser).then((emailLog) => {
	console.log('email sent!!', emailLog)
}).catch((emailError) => {
	console.log('emailError', emailError);
});

