
export class EmailLog {
	private _date: Date;
	
	constructor(private toEmail: string, private fromEmail: string, private subject: string) {
		this._date = new Date();
	}
	
	public getLog(): {toEmail: string, fromEmail: string, subject: string, date: Date} {
		return {
			toEmail: this.toEmail,
			fromEmail: this.fromEmail,
			subject: this.subject,
			date: this._date
		}
	}
}