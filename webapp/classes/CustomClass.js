/**
 * @typedef {Object} ISomeInterface
 * @property {(n: boolean)=>void} someMethodViaInterface
 */


/**
 * @typedef {sap.ui.base.Object} com.mrb.jstype.classes.CustomClass
 * ... mention someMethod here too ...
 */
sap.ui.define([
	"sap/ui/base/Object"
], (
	BaseObject
) => {
	"use strict";

	return BaseObject.extend("com.mrb.jstype.classes.CustomClass", {
		/**
		 * This is a method description!
		 * @param {string} text 
		 * @returns 
		 */
		someMethod(text) {
			return text;
		}
	});
});