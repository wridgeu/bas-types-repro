# jstype example

## Scenario

We'd like to have a base class with some methods and from that x sub-classes. The base class (as it is their common denominator) defines a
"interface" using JSDoc's `@typedef`. The created string literal is then used inside the sub-classes `Interfaces` metadata declaration (marker/tag interface).
This gives us nothing but the possibility for runtime comparisons like `getMetadata().isA("InterfaceStringHere")`.

We want to make use of the native `.getInterface()` method which gives us the public API of an object/class and typecast it to what we know at design-time
which is the Interface itself or in this particular case we want to type-merge as we definitely know whatever will be passed will have it's base from
`sap.ui.base.Object` + `SomeInterface`. Thus giving us code-completion using this class then.

Upon creating this example I realized that the code-completion seems to be better when you're inside a controller, instead of a custom class/object. This
might be part of the problem?

When you comment out the code in the `onInit` of the `MainView.controller.js` you get full code completion for all 3 types that're merged there. If you 
try to do the same within `ConsumingClass` it won't work.

## IDE

I had issues recreating it in my own VSC (non-company computer which has X extensions)... there everything worked well in a freshly created project. I then
took this project and put it into a recently created BAS Dev Space which is running Typescript@5.3.0-dev.20230808 for intellisense and there I could recreate it when
comparing it to Typescript@4.8.0-dev.20220809.

But again, maybe I need more than just a jsconfig like?
> Upon creating this example I realized that the code-completion seems to be better when you're inside a controller, instead of a custom class/object. This
might be part of the problem?

## Comment

Might not be the perfect usage of JSDoc or most appropriate but it worked quite well for code completion on pure JS projects so far. The `ConsumingClass` isn't used anywhere
as it is just for demo purposes regarding code completion. The setup/starting of the app was also not considered at all in this demo.

### Installed Extensions in BAS

The only one that matters is `iljapostnovs.ui5plugin` as it also gives some code-completion. Other than that only prettifier.

## Credits

This project has been generated with 💙 and [Easy-UI5](https://github.com/SAP/generator-easy-ui5)
