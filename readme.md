# jstype example

Want to know how we resolved it? Jump to [How to resolve it?](#how-to-resolve-it?).

## Scenario

We'd like to have a base class with some methods and from that x sub-classes. The base class (as it is their common denominator) defines (& houses the definition) a
"interface" using JSDoc's `@typedef`. The created string literal is then used inside the sub-classes `Interfaces` metadata declaration (marker/tag interface).
This gives us the possibility for runtime comparisons like `getMetadata().isA("InterfaceStringHere")` and we can make use of the [InterfaceLinter](https://github.com/iljapostnovs/ui5plugin-linter#interfacelinter).

We then want to make use of the native `.getInterface()` method which gives us the public API of an object/class and typecast it to what we know at design-time
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

But again, maybe I need more than just a jsconfig like:
> Upon creating this example I realized that the code-completion seems to be better when you're inside a controller, instead of a custom class/object. This
might be part of the problem?

### Installed Extensions in BAS

The only one that matters is `iljapostnovs.ui5plugin` as it also gives some code-completion. Other than that only prettifier.

### Comment

Might not be the perfect usage of JSDoc or most appropriate but it worked quite well for code completion on pure JS projects so far. The `ConsumingClass` isn't used anywhere
as it is just for demo purposes regarding code completion. The setup/starting of the app was also not considered at all in this demo. 

In all examples I've continously used the "Restart TS Server" functionality to make the tests as reliable as I could (incl. complete reload of the window sometimes).

## Image Examples

Same `jsconfig.json` in both variants:
```json
{
	"include": [
		"webapp/**/*",
		"node_modules/@sapui5/ts-types/types",
	]
}
```

### 5.3.0-dev.20230808 

![image](https://github.com/wridgeu/bas-types-repro/assets/14982812/ca84cc0b-e9b2-4e30-a298-a816efec36dd)

With removal of the `typeof` keyword in the constructor functions `@param` declaration we do get _some_ code completion but none are from the "native" TSServer but rather from the aforementioned UI5 plugin (as can be identified by the providers hint). And it is rather crude as it seems to simply infer what `getInterface` would technically return, throwing away our own type merging declaration above it.
![image](https://github.com/wridgeu/bas-types-repro/assets/14982812/107f562a-43c8-492a-91b5-747402db2375)

### 4.8.0-dev.20220809

Here we can see both the `sap.ui.base.Object` and `sap.ui.base.EventProvider` methods as code completion by the TSServer.
![image](https://github.com/wridgeu/bas-types-repro/assets/14982812/46c49e34-4b85-45bf-a403-a8a0304d9d41)

## How to resolve it?

After having a chat with [Peter](https://github.com/petermuessig), we decided to move to newer UI5 type declarations, so instead of using the legacy types [ts-types](https://www.npmjs.com/package/@sapui5/ts-types), we moved to the new [types](https://www.npmjs.com/package/@sapui5/types) (more info regarding UI5s types [here](https://sap.github.io/ui5-typescript/)). This can have a few drawbacks due to the mismatch of types and actual used UI5 version but I already discussed that with Peter and Andreas as well and it's something you have to take into consideration. In this case, the positives outweigh the negatives. 

We can now make better use of the native JSDoc integration of TypeScript by using the TS [import types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types) syntax to pull in the default exports of UI5s `.d.ts` ((global) type declaration) files. This properly resolves the types in both, `4.X.X` and `5.X.X` TypeScript versions.

A great help was the [demo repository](https://github.com/SAP-samples/ui5-cap-event-app/tree/js-with-typescript-support#applying-typescript-benefits-to-a-javascript-application) from [Andreas Kunz](https://github.com/akudev). Here we found not only some infos regarding Type support in JS applications but also confirmation that the way we make use of JSDocs `@typedef` directive makes sense.

Also make sure to use `typeof` where appropriate!
> In case of `sap.ui.require(...)` and `sap.ui.define(...)` calls, the parameters given to the callback function are not instances of Controller and other UI5 classes, but the parameters are the types/classes themselves! Hence an additional typeof operator needs to be added when specifying the types of the callback parameters.

> [!note]
> We do not use a `tsconfig` though, we're still making use of a `jsconfig` - in the end, same thing. 😉
> ```json
> {
>	"compilerOptions": {
>		"types": ["@sapui5/types", "@types/qunit", "@types/sinon"] // <<< resolve types by npm package name, instead of filepaths, thanks Peter!
>	},
>	"include": ["webapp/**/*"]
> }
> ```

## Credits

This project has been generated with 💙 and [Easy-UI5](https://github.com/SAP/generator-easy-ui5)
