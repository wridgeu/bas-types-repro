sap.ui.define([
	"sap/ui/base/Object",
], (
	BaseObject
) => {
	"use strict";

	return BaseObject.extend("com.mrb.jstype.classes.ConsumingClass", {
		/**
		 * @param {typeof com.mrb.jstype.classes.CustomClassWIntf} customClass 
		 */
		constructor: function (customClass) {
			BaseObject.call(this);
			// /** @type {com.mrb.jstype.classes.CustomClassWIntf} */ // resolves the type, no type hinting though: type com.mrb.jstype.classes.CustomClassWIntf = sap.ui.base.Object & ISomeInterface
			// /** @type {sap.ui.base.Object & sap.ui.base.EventProvider} */ // no code completion (using 5.3.0-dev.20230808) => using 4.8.0-dev.20220809 would give completion here
			// /** @type {sap.ui.base.EventProvider} */ // singular type (doesn't matter if it actually is the type ^^ - but that'd give code completion)
			this.dummy = customClass.getInterface();

			// this.dummy. // try code completion
		}
	});
});