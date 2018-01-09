

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
	}
	
	public getHtml(emailTemplateConfig: EmailTemplateConfig, emailTemplateInput: EmailTemplateInput): string {
		console.log('the compiled page', this.compiledPages[emailTemplateInput.emailType]);
		const combinedData = {
			emailTemplateInput: emailTemplateInput,
			emailTemplateConfig: emailTemplateConfig
		};
		console.log('the combined values', combinedData);
		
		return this.compiledPages[emailTemplateInput.emailType](combinedData);
	}
	
	
	private compileTemplate(name: string) {
		const rawHtml = fs.readFileSync(__dirname + '/../../templates/' + name + '.html', 'utf8');
		return Handlebars.compile(rawHtml);
	}
}