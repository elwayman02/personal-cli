// If tests are not running in the browser, these will be undefined
if (typeof QUnit == 'undefined')
    QUnit = require('qunit-cli');
if (typeof Edgar == 'undefined')
    Edgar = require('./../src/edgar');

var module = QUnit.module;
var test = QUnit.test;

module('Jordan Hawker CLI');

test('This is a test', function (assert) {
    assert.ok(true);
});
