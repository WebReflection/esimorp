var Esimorp = (function (Object, Promise) {'use strict';

  /*! (C) 2017 Andrea Giammarchi @WebReflection (MIT) */

  // A reliable ES5 transpiled version of esimorp.js

  function Esimorp(fn) {
    var _resolve, _reject, self;
    self = new Promise(function (resolve, reject) {
      _resolve = resolve;
      _reject = reject;
      if (typeof fn === 'function')
        fn(resolve, reject);
    });
    self._resolve = _resolve;
    self._reject = _reject;
    self.reject = this.reject;
    self.resolve = this.resolve;
    return upgrade(self, proto);
  }

  function setup(where, what, value) {
    defineProperty(where, what, {
      configurable: true,
      writable: true,
      value: value
    });
  }

  var
    defineProperty = Object.defineProperty,
    proto = Esimorp.prototype,
    upgrade = Object.setPrototypeOf ||
              function (o, p) {
                o.__proto__ = p;
                return o;
              }
  ;

  upgrade(Esimorp, Promise);
  upgrade(proto, Promise.prototype);

  setup(proto, 'reject', function reject() {
    return this._reject.apply(null, arguments), this;
  });

  setup(proto, 'resolve', function resolve() {
    return this._resolve.apply(null, arguments), this;
  });

  try {
    defineProperty(Esimorp, Symbol.species, {
      configurable: true,
      get: function () { return Promise; }
    });
  } catch(o_O) {}

  return Esimorp;

}(Object, Promise));

try { module.exports = Esimorp; } catch(o_O) {}
