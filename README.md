# Esimorp [![Build Status](https://travis-ci.org/WebReflection/esimorp.svg?branch=master)](https://travis-ci.org/WebReflection/esimorp) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/esimorp/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/esimorp?branch=master)

Inside Out Promises.

<sup><sub>The simplest, yet handy, resolvable and rejectable Promises for all developers use cases.</sub></sup>

```js
// The constructor callback is optional.
// If provided, it's exactly the same
// that you would pass to a new Promise.
const promise = new Esimorp();

// you can already use the instance
// just like any other Promise
promise
  .then(console.log)
  .catch(console.error);

// ... and whenever it happens ...
promise.resolve('kudos');
```

### F.A.Q.

  * _can I `promise.then().resolve()` ?_ Nope, only the initial resolvable creator/owner can resolve it. No side effects at distance.
  * _can I safely pass around a `promise.then()` ?_ Absolutely, that just creates a new `Promise` copy that's not resolvable.
  * _how can I abort an operation ?_ It's up to you, but following there is an example.

```js
function fetchy(url) {

  const p = new Esimorp();
  const xhr = new XMLHttpRequest();

  // derive from Esimorp
  // to avoid external resolution
  const out = p.then();
  // expose only abort, delegating to xhr
  out.abort = xhr.abort.bind(xhr);

  // resolve indirectly out through Esimorp p
  xhr.addEventListener('abort', e => p.reject(e));
  xhr.addEventListener('error', e => p.reject(e));
  xhr.addEventListener('load', e => p.resolve(xhr));

  // perform the operation
  xhr.open('get', url);
  xhr.send();

  // return the Promise with abort delegate
  return out;
}
```

  * _what else could I do with this ?_ You could create Promises with a timeout and resolve or reject them before.

```js
const p = new Esimorp((res, rej) => {
  // reject in 5 seconds
  setTimeout(rej, 5000, 'timeout');
});

// but if resolved or rejected first is OK
setTimeout(() => p.resolve('OK'), 1000);
```

### License
(C) 2017 Andrea Giammarchi, [@WebReflection](https://twitter.com/WebReflection/), MIT Style License.