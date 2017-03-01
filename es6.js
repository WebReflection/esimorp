class Esimorp extends Promise {

  /*! (C) 2017 Andrea Giammarchi @WebReflection (MIT) */

  static get [Symbol.species]() { return Promise; }

  constructor(fn) {
    let _resolve, _reject;
    super((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
      if (typeof fn === 'function')
        fn(resolve, reject);
    });
    this._resolve = _resolve;
    this._reject = _reject;
  }

  reject(...reason) {
    return this._reject(...reason), this;
  }

  resolve(...how) {
    return this._resolve(...how), this;
  }

}

try { module.exports = Esimorp; } catch(o_O) {}
