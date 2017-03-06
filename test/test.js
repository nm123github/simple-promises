var SimplePromise = require("./../simple-promise.js")
var test = require("tape")

test("simplepromise-resolved", function(t) {

	new SimplePromise(function(resolve, reject) {
		setTimeout(function() {
			resolve('yay!')
		}, 1000);
	}).then(function(data) {
		t.equals(data, "yay!");
		t.end();
	});

})

test("simplepromise-rejected", function(t) {

	new SimplePromise(function(resolve, reject) {
		setTimeout(function() {
			reject(new Error('nah!'))
		}, 1000);
	}).catch(function(error) {
		t.equals(typeof error, typeof Error);
		t.equals(error.message, "nah!");
		t.end();
	});

})

test("simplepromise-chaining", function(t) {

	new SimplePromise(function(resolve, reject) {
		setTimeout(function() {
			resolve('yay!')
		}, 1000);
	}).then(function(data) {
		t.equals(data, "yay!");
		t.end();
	}).then(function(data) {
		t.equals(data, "yay!");
		t.end();
	});

})