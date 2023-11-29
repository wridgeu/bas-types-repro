sap.ui.define(
    ["./BaseController", "../classes/CustomClassWIntf"],
    /**
     * @param {sap.ui.core.mvc.Controller} BaseController
     * @param {com.mrb.jstype.classes.CustomClassWIntf} Custom
     */
    (BaseController, Custom) => {
        "use strict";

        return BaseController.extend("com.mrb.jstype.controller.MainView", {
            onInit() {
                // /** @type {sap.ui.base.Object & sap.ui.base.EventProvider & ISomeInterface} */
                // const test = Custom.getInterface();
                // test. // seems to work inside a controller - can happyily merge (5.3.0-dev.20230808)
            }
        });
    },
);
