import {EmailHandler} from "./email.handler";
import {SECRETS} from "../config/secrets";


const testConfig = require('../data/emailTemplateConfig.json');



let emailHandler: EmailHandler = new EmailHandler({sendgrid: {apiKey: SECRETS.email.sendgrid.apiKey}});

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
		orderId: 'dfa2a83asc193274adf',
		showDelivery: true,
		delivery: {
			method: 'bring',
			estimatedDeliveryDate: new Date().toLocaleDateString(),
			price: "199 kr"
		},
		showPayment: true,
		payment: {
			type: 'dibs',
			amount: '100',
			cardInfo: '0123',
			currency: 'NOK',
			taxAmount: '0',
			paymentId: 'abc113193',
			status: 'Confirmed'
		}
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
	]

}).then((emailLog) => {
	console.log('the log ', emailLog);
}).catch((emailError) => {
	console.log('got an error', emailError);
});
