

import {EmailTemplateInput} from "./email-template-input";
import {EmailTemplateConfig} from "./email-template-config";


const fs = require('fs');
const Handlebars = require('handlebars');

export class TemplateCompiler {
	
	private compiledPages: {
		confirm: any
	};

	
	
	
	
	constructor() {
		this.compiledPages = {confirm: {}};
		
		this.compiledPages["confirm-email"] = this.compileTemplate('confirm-email');
		this.compiledPages["deadline"] = this.compileTemplate('deadline');
		this.compiledPages['generic'] = this.compileTemplate('generic');
		this.compiledPages['hello'] = this.compileTemplate('hello');
		this.compiledPages['password-reset'] = this.compileTemplate('password-reset');
		this.compiledPages['receipt'] = this.compileTemplate('receipt');
		this.compiledPages['rented'] = this.compileTemplate('rented');
		
	}
	
	public getHtml(emailTemplateConfig: EmailTemplateConfig, emailTemplateInput: EmailTemplateInput): string {
		const combinedData = {
			emailTemplateInput: emailTemplateInput,
			emailTemplateConfig: emailTemplateConfig
		};
		return this.compiledPages[emailTemplateInput.emailType](combinedData);
	}
	
	
	private compileTemplate(name: string) {
		const rawHtml = fs.readFileSync(__dirname + '/../../templates/' + name + '.html', 'utf8');
		return Handlebars.compile(rawHtml);
	}
}