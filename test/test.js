var version = process.env.ESIMORP || 'es5';
var test = require('tressa');
var setPrototypeOf = Object.setPrototypeOf;
delete Object.setPrototypeOf;
var Esimorp = require('../' + version + '.js');
Object.setPrototypeOf = setPrototypeOf;

test.title('Esimorp ' + version);

test.assert(Promise.isPrototypeOf(Esimorp), 'inherited constructor');
test.assert(Promise.prototype.isPrototypeOf(Esimorp.prototype), 'inherited prototype');

test.async(function (done) {
  var solution = Math.random();
  var e = new Esimorp();
  e.resolve(solution).then(function (value) {
    test.log('## resolve');
    test.assert(e instanceof Esimorp, 'correct instance');
    test.assert(e instanceof Promise, 'correct inheritance');
    test.assert(value === solution, 'correct resolution');
    done();
  });
});

test.async(function (done) {
  var solution = new Error('Esimorp');
  var e = new Esimorp();
  e.catch(function (value) {
    test.log('## reject');
    test.assert(e instanceof Esimorp, 'correct instance');
    test.assert(e instanceof Promise, 'correct inheritance');
    test.assert(value === solution, 'correct error');
    done();
  });
  e.reject(solution);
});

test.async(function (done) {
  var solution = Math.random();
  new Esimorp(function (resolve, reject) {
    resolve(solution);
  }).then(function (value) {
    test.log('## (resolve())');
    test.assert(value === solution, 'correct resolution');
    done();
  });
});

test.async(function (done) {
  var solution = new Error('Esimorp');
  new Esimorp(function (resolve, reject) {
    reject(solution);
  }).then(Object, function (value) {
    test.log('## (reject())');
    test.assert(value === solution, 'correct error');
    done();
  });
});

test.async(function (done) {
  var solution = new Error('Esimorp');
  var promise = new Esimorp();
  var copy = promise.then();
  copy.catch(function (err) {
    test.log('## esimorp.then().catch(...)');
    test.assert(copy instanceof Esimorp === false, 'no inheritance');
    test.assert(err === solution, 'correct error');
    done();
  });
  promise.reject(solution);
});
