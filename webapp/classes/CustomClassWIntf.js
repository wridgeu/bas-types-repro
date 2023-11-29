/**
 * @typedef {com.mrb.jstype.classes.CustomClass & ISomeInterface} com.mrb.jstype.classes.CustomClassWIntf
 * 
 * Type merge the base class & Interface + Maybe add some methods (which usually are also simply picked up by annotating them directly next to their definition)
 */
sap.ui.define([
	"sap/ui/base/Object"
], (
	BaseObject
) => {
	"use strict";

	return BaseObject.extend("com.mrb.jstype.classes.CustomClassWIntf", {
		metadata: {
			interfaces: ["ISomeInterface"] // marker for our dummy interface 
		},

		someMethodViaInterface() {
			return 'someImplementation'
		},
	});
});