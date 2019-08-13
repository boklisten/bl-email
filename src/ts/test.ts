import {EmailHandler} from "./email.handler";
import {SECRETS} from "../config/secrets";
import {EmailSetting} from "./template/email-setting";
import {EmailOrder} from "./template/email-order";
import {EmailUser} from "./template/email-user";
import {EmailTextBlock} from "./template/email-text-block";
import {PdfHandler} from "./pdf.handler";
import {EmailAttachment} from "./template/email-attachment";



let emailHandler: EmailHandler = new EmailHandler({sendgrid: {apiKey: SECRETS.email.sendgrid.apiKey}, locale: 'nb'});


let emailSettings = {
	toEmail: 'aholskil@gmail.com',
	fromEmail: 'ikkesvar@boklisten.no',
	subject: 'Kvittering fra Boklisten.no',
	userId: '5b6579a26ccf334a2728d0f8',
	attachments: [],
  textBlocks: [
    {
      text: 'Hvis du trenger bøkene lengre, så kan du også forlenge fristen. Dette kan enkelt gjøres på din bruker på Boklisten.no'
    }
  ]
};
let emailOrder: EmailOrder = {
	id: '5b6967606df8b3411612a32f',
	showDeadline: true,
	showPrice: false,
	showStatus: false,
	showSubject: false,
	currency: 'NOK',
	itemAmount: '0',
	totalAmount: '0',
  loan: true,
	items:
	[
		{
      title: 'Ergo 2 2012 fysikk på 1, 2, 3!',
      status: '',
      deadline: '10.10.2018'
    },
    {
      title: 'Signatur 3',
      status: '',
      deadline: '10.10.2018'
    },

	],
	showDelivery: false,
	delivery: {
		method: 'bring',
		trackingNumber: 'jfdas21jasdX2ASjdqa',
		estimatedDeliveryDate: null,
		address: "Jon Jonsen, einervein 10 D, 0560 OSLO",
		amount: null,
		currency: null
	},
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
emailHandler.sendOrderReceipt(emailSettings, emailOrder, emailUser).then(() => {
  //console.log('email receipt sent');
}).catch((e) => {
  //console.log('could not send receipt', e);
});
 */
/*
emailHandler.sendReminder(emailSettings, emailOrder, emailUser).then(() => {
  console.log('reminder sent');
}).catch(() => {
  console.log('could not send email...');
})
 */
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

/*
emailHandler.sendDelivery(emailSettings, emailOrder, emailUser).then(() => {
	console.log('sent delivery mail');
}).catch(() => {
	console.log('could not send delivery mail');
});
*/

/*
const pdfHandler = new PdfHandler(emailHandler);


pdfHandler.getOrderReceipt(emailSettings, emailOrder, emailUser).then((pdf: EmailAttachment) => {
	emailSettings.attachments = [pdf];

	emailHandler.sendOrderReceipt(emailSettings, emailOrder, emailUser).then(() => {
		console.log('order reciept sent');
	}).catch(() => {
		console.log('could not send reciept');
	})

}).catch(() => {
	console.log('could not get agreement...');
});

*/





