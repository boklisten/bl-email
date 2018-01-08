/**
 * @example
 * {{i username}}
 * @outputs
 * {{username}}
 */
module.exports = function (rawHandlebar) {
   return "{{" + rawHandlebar + "}}";
};