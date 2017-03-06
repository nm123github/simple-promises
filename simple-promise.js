
// simple-promise implementation
var SimplePromise = function(executor) {

	this.status = "PENDING";
	this.resolveListeners = [];
	this.rejectListeners = [];

	var that = this;

	var resolve = function(data) {
		if (that.status !== "PENDING" )
			return;

		that.status = "FULFILLED"
		that.resolveListeners.forEach(function (fn) {
			fn.call(null, data);
		});

	}

	var reject = function(err) {
		if (that.status !== "PENDING" )
			return;

		that.status = "REJECTED"
		that.rejectListeners.forEach(function (fn) {
			if ( err instanceof Error )
				fn.call(null, err);
			else
				fn.call(null, new Error(err));
		});

	}

	executor.call(null, resolve, reject);

}

SimplePromise.prototype.then = function(fn) {
	this.resolveListeners.push(fn);
}

SimplePromise.prototype.catch = function(fn) {
	this.rejectListeners.push(fn);
}

module.exports = SimplePromise;
