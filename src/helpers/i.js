/**
 * @example
 * {{i 'emailTemplateConfig.name'}}
 * @outputs
 * {{email.TemplateConfig.name}} in prod
 * and "aName" in test
 */
module.exports = function (rawHandlebar) {


    const blEmailConfig = require('../../bl-email.config.json');

    if (!blEmailConfig.prod) {
        try {

            const emailTemplateConfig = require('../data/emailTemplateConfig.json');
            const emailTemplateInput = require('../data/emailTemplateInput.json');
            let splitVarPath = rawHandlebar.split('.');
            let varType = splitVarPath[0];
            let value = '';

            if (varType === 'emailTemplateConfig') {
                value = emailTemplateConfig;
                for (let i = 1; i < splitVarPath.length; i++) {
                    value = value[splitVarPath[i]];
                }
            } else if (varType === 'emailTemplateInput') {
                value = emailTemplateInput;
                for (let i = 1; i < splitVarPath.length; i++) {
                    value = value[splitVarPath[i]];
                }
            }

            if (!value) throw new Error('value not found');

            return value;
        } catch (e) {
            return "";
        }
    }

    return "{{" + rawHandlebar + "}}";
};