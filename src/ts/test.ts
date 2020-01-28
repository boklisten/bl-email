import {EmailHandler} from './email.handler';
import {SECRETS} from '../config/secrets';
import {EmailSetting} from './template/email-setting';
import {EmailOrder} from './template/email-order';
import {EmailUser} from './template/email-user';
import {EmailTextBlock} from './template/email-text-block';
import {PdfHandler} from './pdf.handler';
import {EmailAttachment} from './template/email-attachment';

let emailHandler: EmailHandler = new EmailHandler({
  sendgrid: {apiKey: SECRETS.email.sendgrid.apiKey},
  locale: 'nb',
});

let emailTextBlocks: EmailTextBlock[] = [];

let genericTextBlocks: EmailTextBlock[] = [
  {
    text: 'Hi there, this is a generic message',
  },
  {
    text: 'This is a alert to you regarding that you have failed to deliver',
    alert: true,
  },
];

let emailSetting: EmailSetting = {
  toEmail: 'aholskil@gmail.com',
  fromEmail: 'noreply@boklisten.co',
  subject: 'Order receipt from Boklisten.co',
  userId: 'user1',
  textBlocks: genericTextBlocks,
};

let emailOrder: EmailOrder = {
  id: '5b6967606df8b3411612a32f',
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
      status: 'rent',
    },
    {
      title: 'Aqua 2',
      price: '200 kr',
      deadline: new Date().toLocaleDateString(),
      status: 'rent',
    },
  ],
  showDelivery: false,
  delivery: {
    method: 'bring',
    address: 'Traktorveien 10D, 0134 OSLO',
    estimatedDeliveryDate: new Date().toLocaleDateString(),
    trackingNumber: 'ABC',
    amount: '75',
    currency: 'NOK',
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
        creationTime: '01.01.1900',
      },
      {
        method: 'card',
        amount: '100',
        cardInfo: '0123',
        taxAmount: '0',
        paymentId: 'abc113193',
        status: 'Confirmed',
        creationTime: '01.01.1900',
      },
    ],
  },
};

let emailUser: EmailUser = {
  id: 'user1',
  dob: '01.01.2000',
  name: 'Billy Bob Johansen',
  email: 'aholskil@gmail.com',
  address: 'Traktorveien 10D, 3421, OSLO',
};

emailHandler
  .sendOrderReceipt(emailSetting, emailOrder, emailUser, true)
  .then(emailLog => {
    console.log('reminder sent!', emailLog);
  })
  .catch(emailError => {
    console.log('emailError', emailError);
  });

/*
emailHandler
  .sendReminder(emailSetting, emailOrder, emailUser)
  .then(emailLog => {
    console.log('reminder sent!', emailLog);
  })
  .catch(emailError => {
    console.log('emailError', emailError);
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
