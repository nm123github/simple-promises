var SimplePromise = require("./../simple-promise.js")
var test = require("tape")

function xtest() {};

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
		t.equals(true, error instanceof Error);
		t.equals(error.message, "nah!");
		t.end();
	});

})

test("simplepromise-multiple-thens", function(t) {

	var sp = new SimplePromise(function(resolve, reject) {
		setTimeout(function() {
			resolve('yay!')
		}, 1000);
	});

	sp.then(function(data) {
		t.equals(data, "yay!");
	})

	sp.then(function(data) {
		t.equals(data, "yay!");
	});

	t.end();

})


// If you call reject immediately, and then attach catch handler, it should still be called
test("simplepromise-noresolve-afterreject", function(t) {

	var sp = new SimplePromise(function(resolve, reject) {
		setTimeout(function() {
			resolve('yay!')
		}, 1000);
		reject('noooo');
	});

	sp.then(function(data) {
		t.fail('should never be called');
	})

	sp.catch(function(err) {
		t.equals(err, "noooo");
		t.end();
	});

})

// TODO: Please fix chaining!
xtest("simplepromise-chaining", function(t) {

	new SimplePromise(function(resolve, reject) {
		setTimeout(function() {
			resolve('yay!')
		}, 1000);
	}).then(function(data) {
		t.equals(data, "yay!");
		return "yay again!"
	}).then(function(data) {
		t.equals(data, "yay again!");
		t.end();
	});

})
