
// simple-promise implementation
var SimplePromise = function(executor) {

	this.status = "PENDING";
	this.data = null;
	this.error = null;

	this.resolveListeners = [];
	this.rejectListeners = [];

	var that = this;

	this.addResolveListeners = function(fn) {
		if (that.status === "FULFILLED")
			fn.call(null, that.data);
		else
			that.resolveListeners.push(fn);
	}

	this.addRejectListeners = function(fn) {
		if (that.status === "REJECTED") {
			if ( that.error instanceof Error )
				fn.call(null, that.error);
			else
				fn.call(null, new Error(that.error));
		}
		else
			that.rejectListeners.push(fn);
	}

	var resolve = function(data) {
		if (that.status !== "PENDING")
			return;

		that.status = "FULFILLED"
		that.data = data;
		that.resolveListeners.forEach(function (fn) {
			var ret = fn.call(null, data);
		});

	}

	var reject = function(err) {
		if (that.status !== "PENDING")
			return;

		that.status = "REJECTED"
		that.error = err;
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
	this.addResolveListeners(fn);
}

SimplePromise.prototype.catch = function(fn) {
	this.addRejectListeners(fn);
}

module.exports = SimplePromise;
