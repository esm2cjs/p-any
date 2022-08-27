# @esm2cjs/p-any

This is a fork of https://github.com/sindresorhus/p-any, but automatically patched to support ESM **and** CommonJS, unlike the original repository.

## Install

You can use an npm alias to install this package under the original name:

```
npm i p-any@npm:@esm2cjs/p-any
```

```jsonc
// package.json
"dependencies": {
    "p-any": "npm:@esm2cjs/p-any"
}
```

but `npm` might dedupe this incorrectly when other packages depend on the replaced package. If you can, prefer using the scoped package directly:

```
npm i @esm2cjs/p-any
```

```jsonc
// package.json
"dependencies": {
    "@esm2cjs/p-any": "^ver.si.on"
}
```

## Usage

```js
// Using ESM import syntax
import MOD from "@esm2cjs/p-any";

// Using CommonJS require()
const MOD = require("@esm2cjs/p-any").default;
```

> **Note:**
> Because the original module uses `export default`, you need to append `.default` to the `require()` call.

For more details, please see the original [repository](https://github.com/sindresorhus/p-any).

## Sponsoring

To support my efforts in maintaining the ESM/CommonJS hybrid, please sponsor [here](https://github.com/sponsors/AlCalzone).

To support the original author of the module, please sponsor [here](https://github.com/sindresorhus/p-any).



# p-any

> Wait for any promise to be fulfilled

Useful when you need the fastest promise.

You probably want this instead of `Promise.race()`. [Reason.](http://bluebirdjs.com/docs/api/promise.race.html)

*With [Node.js 15](https://medium.com/@nodejs/node-js-v15-0-0-is-here-deb00750f278), there's now a built-in [`Promise#any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) method. The benefit of this package is that it has cancellation functionality.*

## Install

```
$ npm install p-any
```

## Usage

Checks 3 websites and logs the fastest.

```js
import pAny from 'p-any';
import got from 'got';

const first = await pAny([
	got.head('https://github.com').then(() => 'github'),
	got.head('https://google.com').then(() => 'google'),
	got.head('https://twitter.com').then(() => 'twitter'),
]);

console.log(first);
//=> 'google'
```

## API

### pAny(input, options?)

Returns a [cancelable `Promise`](https://github.com/sindresorhus/p-cancelable) that is fulfilled when any promise from `input` is fulfilled. If all the `input` promises reject, it will reject with an [`AggregateError`](https://github.com/sindresorhus/aggregate-error) error.

#### input

Type: `Iterable<Promise | unknown>`

#### options

Type: `object`

##### filter

Type: `Function`

Receives the value resolved by the promise. Used to filter out values that doesn't satisfy a condition.

### AggregateError

Exposed for instance checking.

## Related

- [p-some](https://github.com/sindresorhus/p-some) - Wait for a specified number of promises to be fulfilled
- [p-locate](https://github.com/sindresorhus/p-locate) - Get the first fulfilled promise that satisfies the provided testing function
- [More…](https://github.com/sindresorhus/promise-fun)
