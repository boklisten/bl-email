import { EmailType } from "./template/email-type";

export class EmailLog {
  private _date: Date;

  constructor(
    private toEmail: string,
    private fromEmail: string,
    private type: EmailType,
  ) {
    this._date = new Date();
  }

  public getLog(): {
    toEmail: string;
    fromEmail: string;
    type: EmailType;
    date: Date;
  } {
    return {
      toEmail: this.toEmail,
      fromEmail: this.fromEmail,
      type: this.type,
      date: this._date,
    };
  }
}
