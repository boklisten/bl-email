import { EmailTemplateInput } from "./email-template-input";
import { EmailTemplateConfig } from "./email-template-config";
import { EmailType } from "./email-type";

const fs = require("fs");
const Handlebars = require("handlebars");

export class TemplateCompiler {
  private compiledPages: {
    confirm: any;
  };

  constructor() {
    this.compiledPages = { confirm: {} };

    this.compiledPages["confirm-email"] = this.compileTemplate("confirm-email");
    this.compiledPages["deadline"] = this.compileTemplate("deadline");
    this.compiledPages["generic"] = this.compileTemplate("generic");
    this.compiledPages["hello"] = this.compileTemplate("hello");
    this.compiledPages["password-reset"] =
      this.compileTemplate("password-reset");
    this.compiledPages["guardian-signature"] =
      this.compileTemplate("guardian-signature");
    this.compiledPages["receipt"] = this.compileTemplate("receipt");
    this.compiledPages["reminder"] = this.compileTemplate("reminder");
    this.compiledPages["receipt-with-agreement"] = this.compileTemplate(
      "receipt-with-agreement",
    );
    this.compiledPages["receipt-pdf"] = this.compileTemplate("receipt-pdf");
  }

  public getReceiptWithAgreementHtml(
    emailTemplateConfig: EmailTemplateConfig,
    emailTemplateInput: EmailTemplateInput,
  ): string {
    const combinedData = {
      emailTemplateInput: emailTemplateInput,
      emailTemplateConfig: emailTemplateConfig,
    };
    return this.compiledPages["receipt-with-agreement"](combinedData);
  }

  public getReceiptPdf(
    emailTemplateConfig: EmailTemplateConfig,
    emailTemplateInput: EmailTemplateInput,
  ): string {
    const combinedData = {
      emailTemplateInput: emailTemplateInput,
      emailTemplateConfig: emailTemplateConfig,
    };
    return this.compiledPages["receipt-pdf"](combinedData);
  }

  public getHtml(
    emailType: EmailType,
    emailTemplateConfig: EmailTemplateConfig,
    emailTemplateInput: EmailTemplateInput,
  ): string {
    const combinedData = {
      emailTemplateInput: emailTemplateInput,
      emailTemplateConfig: emailTemplateConfig,
    };
    return this.compiledPages[emailType](combinedData);
  }

  private compileTemplate(name: string) {
    const rawHtml = fs.readFileSync(
      __dirname + "/../../templates/" + name + ".html",
      "utf8",
    );
    return Handlebars.compile(rawHtml);
  }
}
