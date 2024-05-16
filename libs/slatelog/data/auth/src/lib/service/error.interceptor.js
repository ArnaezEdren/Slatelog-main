'use strict';
var __esDecorate =
	(this && this.__esDecorate) ||
	function (
		ctor,
		descriptorIn,
		decorators,
		contextIn,
		initializers,
		extraInitializers
	) {
		function accept(f) {
			if (f !== void 0 && typeof f !== 'function')
				throw new TypeError('Function expected');
			return f;
		}
		var kind = contextIn.kind,
			key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
		var target =
			!descriptorIn && ctor
				? contextIn['static']
					? ctor
					: ctor.prototype
				: null;
		var descriptor =
			descriptorIn ||
			(target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
		var _,
			done = false;
		for (var i = decorators.length - 1; i >= 0; i--) {
			var context = {};
			for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
			for (var p in contextIn.access) context.access[p] = contextIn.access[p];
			context.addInitializer = function (f) {
				if (done)
					throw new TypeError(
						'Cannot add initializers after decoration has completed'
					);
				extraInitializers.push(accept(f || null));
			};
			var result = (0, decorators[i])(
				kind === 'accessor'
					? { get: descriptor.get, set: descriptor.set }
					: descriptor[key],
				context
			);
			if (kind === 'accessor') {
				if (result === void 0) continue;
				if (result === null || typeof result !== 'object')
					throw new TypeError('Object expected');
				if ((_ = accept(result.get))) descriptor.get = _;
				if ((_ = accept(result.set))) descriptor.set = _;
				if ((_ = accept(result.init))) initializers.unshift(_);
			} else if ((_ = accept(result))) {
				if (kind === 'field') initializers.unshift(_);
				else descriptor[key] = _;
			}
		}
		if (target) Object.defineProperty(target, contextIn.name, descriptor);
		done = true;
	};
var __runInitializers =
	(this && this.__runInitializers) ||
	function (thisArg, initializers, value) {
		var useValue = arguments.length > 2;
		for (var i = 0; i < initializers.length; i++) {
			value = useValue
				? initializers[i].call(thisArg, value)
				: initializers[i].call(thisArg);
		}
		return useValue ? value : void 0;
	};
var __setFunctionName =
	(this && this.__setFunctionName) ||
	function (f, name, prefix) {
		if (typeof name === 'symbol')
			name = name.description ? '['.concat(name.description, ']') : '';
		return Object.defineProperty(f, 'name', {
			configurable: true,
			value: prefix ? ''.concat(prefix, ' ', name) : name,
		});
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.ErrorInterceptor = void 0;
var core_1 = require('@angular/core');
var http_1 = require('@angular/common/http');
var rxjs_1 = require('rxjs');
var ErrorInterceptor = (function () {
	var _classDecorators = [(0, core_1.Injectable)()];
	var _classDescriptor;
	var _classExtraInitializers = [];
	var _classThis;
	var ErrorInterceptor = (_classThis = /** @class */ (function () {
		function ErrorInterceptor_1() {
			this.retryDelay = 1000;
			this.retryMaxAttempts = 3;
		}
		ErrorInterceptor_1.prototype.intercept = function (req, next) {
			// NAIVE VERSION
			var _this = this;
			/*
        return next.handle(req)
          .pipe(
            tap(() => console.error(`retry request ${req.url}`)),
            retry(this.retryMaxAttempts),
            catchError((error) => throwError(() =>
              new Error(`request ${req.url} failed after ${this.retryMaxAttempts}`)))
          // catchError((error) => {
          // throw new Error(`request ${req.url} failed after ${this.retryMaxAttempts}`); })
        )
         */
			return next.handle(req).pipe(
				//  tap(() => console.error(`retry request ${req.url}`)),
				(0, rxjs_1.retry)({
					// Maximum number of retry attempts
					count: this.retryMaxAttempts,
					// The `Notifier Function` has to return an observable following the contract:
					// If the Observable throws an Error: no retry
					// If the Observable emits a value: then retry
					delay: function (error, retryCount) {
						if (shouldRetry(error))
							// Linear backoff
							// return timer(this.retryDelay)
							// Exponential backoff
							return (0, rxjs_1.timer)(
								_this.retryDelay * Math.pow(2, retryCount - 1)
							);
						else
							return (0, rxjs_1.throwError)(function () {
								return error;
							});
					},
				}),
				(0, rxjs_1.catchError)(function (error) {
					return (0, rxjs_1.throwError)(function () {
						return new Error(
							'request '
								.concat(req.url, ' failed after ')
								.concat(_this.retryMaxAttempts)
						);
					});
				})
				// catchError((error) => {
				// throw new Error(`request ${req.url} failed after ${this.retryMaxAttempts}`); })
			);
		};
		return ErrorInterceptor_1;
	})());
	__setFunctionName(_classThis, 'ErrorInterceptor');
	(function () {
		var _metadata =
			typeof Symbol === 'function' && Symbol.metadata
				? Object.create(null)
				: void 0;
		__esDecorate(
			null,
			(_classDescriptor = { value: _classThis }),
			_classDecorators,
			{ kind: 'class', name: _classThis.name, metadata: _metadata },
			null,
			_classExtraInitializers
		);
		ErrorInterceptor = _classThis = _classDescriptor.value;
		if (_metadata)
			Object.defineProperty(_classThis, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata,
			});
		__runInitializers(_classThis, _classExtraInitializers);
	})();
	return (ErrorInterceptor = _classThis);
})();
exports.ErrorInterceptor = ErrorInterceptor;
// Worthy Status Codes to retry ?
// 408 Request Timeout
// 429 Too Many Requests
// (500 Internal Server Error !?)
// 502 Bad Gateway
// 503 Service Unavailable
// 504 Gateway Timeout
// If no request was sent at all (no internet connection)
var HttpStatusCodes;
(function (HttpStatusCodes) {
	HttpStatusCodes[(HttpStatusCodes['BadGateway'] = 502)] = 'BadGateway';
	HttpStatusCodes[(HttpStatusCodes['ServiceUnavailable'] = 503)] =
		'ServiceUnavailable';
	HttpStatusCodes[(HttpStatusCodes['GatewayTimeout'] = 504)] = 'GatewayTimeout';
	// etc.
})(HttpStatusCodes || (HttpStatusCodes = {}));
var retryCodes = [
	HttpStatusCodes.BadGateway,
	HttpStatusCodes.ServiceUnavailable,
	HttpStatusCodes.GatewayTimeout,
];
// Here we can define under which circumstances we want to retry.
// e.g. Only GET requests, or specific status codes.
function shouldRetry(error) {
	// 1. Retry if the error is coming from the Server and is one of our status codes
	if (
		error instanceof http_1.HttpErrorResponse &&
		retryCodes.includes(error.status)
	)
		return true;
	return false;
	// 2. Retry if the error is e.g. no internet
	// TODO testing needed
	// return error.status === undefined || error.status === 0;
}
