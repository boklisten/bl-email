import { EmailTemplateInput } from "./template/email-template-input";
import { EmailAttachment } from "./template/email-attachment";
import { EmailHandler } from "./email.handler";
import { EmailSetting } from "./template/email-setting";
import { EmailOrder } from "./template/email-order";
import { EmailUser } from "./template/email-user";
import { TemplateCompiler } from "./template/template-compiler";
import moment = require("moment");
import { EmailTemplateConfig } from "./template/email-template-config";
import { generatePdf } from "./html-pdf";

export class PdfHandler {
  private _templateCompiler: TemplateCompiler;
  private _agreementFileName: string;
  private _emailTemplateConfig: EmailTemplateConfig;

  constructor(private _emailHandler: EmailHandler) {
    this._agreementFileName = "boklistenno_agreement";
    this._emailTemplateConfig = _emailHandler.getEmailTemplateConfig();
    this._templateCompiler = new TemplateCompiler();
  }

  public getRentAgreement(
    emailSetting: EmailSetting,
    emailOrder: EmailOrder,
    emailUser: EmailUser,
  ): Promise<EmailAttachment> {
    const receiptWithAgreementHtml =
      this._templateCompiler.getReceiptWithAgreementHtml(
        this._emailTemplateConfig,
        this._emailHandler.createEmailTemplateInput(
          emailSetting,
          emailOrder,
          emailUser,
        ),
      );
    return this.createPdf(receiptWithAgreementHtml);
  }

  public getOrderReceipt(
    emailSetting: EmailSetting,
    emailOrder: EmailOrder,
    emailUser: EmailUser,
  ): Promise<EmailAttachment> {
    const orderReceiptHtml = this._templateCompiler.getReceiptPdf(
      this._emailTemplateConfig,
      this._emailHandler.createEmailTemplateInput(
        emailSetting,
        emailOrder,
        emailUser,
      ),
    );
    return this.createPdf(orderReceiptHtml);
  }

  private createPdf(html: string): Promise<EmailAttachment> {
    return new Promise((resolve, reject) => {
      const options = {
        format: "A4",
        header: { height: "25mm" },
        footer: { height: "25mm" },
      };

      generatePdf({ content: html }, options, () => {}).then((buffer) => {
        if (!Buffer.isBuffer(buffer)) {
          reject(new Error("pdf to buffer failed"));
        } else {
          return resolve({
            content: buffer.toString("base64"),
            contentId: "agreement",
            filename:
              this._agreementFileName +
              "_" +
              moment().format("MM_DD_YYYY") +
              ".pdf",
            type: "application/pdf",
          });
        }
      });
    });
  }
}
