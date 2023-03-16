import { EmailSetting } from "./email-setting";
import { EmailTextBlock } from "./email-text-block";

export type EmailTemplateConfig = {
  link: {
    leaseNotice: string;
    login: string;
    website: string;
    email: string;
    logo: string;
  };
  general: {
    text: {
      hello: string;
    };
    img: {
      logo: {
        alt: string;
      };
    };
    contact: {
      name: {
        title: string;
        value: string;
      };
      email: {
        title: string;
        value: string;
      };
      address: {
        title: string;
        value: string;
      };
      organizationNumber: {
        title: string;
        value: string;
      };
      phone: {
        title: string;
        value: string;
      };
    };
  };
  reminder: {
    text: {
      title: string;
      yourItemsTitle: string;
    };
    textBlocks: EmailTextBlock[];
  };
  "confirm-email": {
    emailSetting: EmailSetting;
    text: {
      title: string;
      intro: string;
      info: string;
      button: string;
    };
  };
  deadline: {
    emailSetting: EmailSetting;
    text: {
      title: string;
      intro: string;
      externalCandidateInfo: string;
    };
  };
  generic: {
    emailSetting: EmailSetting;
    text: {};
  };
  hello: {
    emailSetting: EmailSetting;
    text: {
      title: string;
      intro: string;
    };
  };
  "password-reset": {
    emailSetting: EmailSetting;
    text: {
      title: string;
      intro: string;
      info: string;
      linkTitle: string;
      button: string;
      warning: string;
    };
  };
  receipt: {
    emailSetting: EmailSetting;
    text: {
      title: string;
      intro: string;
    };
  };
  "receipt-with-agreement": {
    text: {
      title: string;
      intro: string;
      agreementCustomer: string;
      agreementTitle: string;
      agreement: string;
      agreementInfo: string;
      customerSignature: string;
      guardianNameCapital: string;
      guardianSignature: string;
    };
  };
  "order-detail": {
    text: {
      title: string;
    };
  };
  partial: {
    contact: {
      title: string;
      email: {
        title: string;
        value: string;
      };
      website: {
        title: string;
        value: string;
      };
      address: {
        title: string;
        value: string;
      };
    };
    header: {};
    "item-list": {
      text: {
        totalPriceTitle: string;
        titleHeader: string;
        statusHeader: string;
        subjectHeader: string;
        deadlineHeader: string;
        priceHeader: string;
        orderIdTitle: string;
      };
    };
    delivery: {
      text: {
        deliveryMethodTitle: string;
        deliveryAddressTitle: string;
        estimatedDeliveryTitle: string;
        deliveryPriceTitle: string;
        trackingNumberTitle: string;
        title: string;
      };
    };
    payment: {
      text: {
        title: string;
        totalTitle: string;
        taxTitle: string;
        methodTitle: string;
        cardInfoTitle: string;
        paymentIdTitle: string;
        paymentStatusTitle: string;
        dateTitle: string;
      };
    };
    login: {
      info: string;
      button: string;
    };
    "text-container": {};
  };
};
