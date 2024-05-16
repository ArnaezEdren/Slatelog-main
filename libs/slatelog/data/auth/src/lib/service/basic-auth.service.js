'use strict';
// Angular Service
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
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		var _ = {
				label: 0,
				sent: function () {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === 'function' &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError('Generator is already executing.');
			while ((g && ((g = 0), op[0] && (_ = 0)), _))
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y['return']
									: op[0]
									? y['throw'] || ((t = y['return']) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === 'a' && !f)
			throw new TypeError('Private accessor was defined without a getter');
		if (
			typeof state === 'function'
				? receiver !== state || !f
				: !state.has(receiver)
		)
			throw new TypeError(
				'Cannot read private member from an object whose class did not declare it'
			);
		return kind === 'm'
			? f
			: kind === 'a'
			? f.call(receiver)
			: f
			? f.value
			: state.get(receiver);
	};
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === 'm') throw new TypeError('Private method is not writable');
		if (kind === 'a' && !f)
			throw new TypeError('Private accessor was defined without a setter');
		if (
			typeof state === 'function'
				? receiver !== state || !f
				: !state.has(receiver)
		)
			throw new TypeError(
				'Cannot write private member to an object whose class did not declare it'
			);
		return (
			kind === 'a'
				? f.call(receiver, value)
				: f
				? (f.value = value)
				: state.set(receiver, value),
			value
		);
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.BasicAuthService = void 0;
// Auth Service Responsibility
// - Provide Basic Auth Header
// - Save Basic Auth Header
// 1. register
// -> UserService#register
// 2. login
// -> Append Basic Auth Header
// -> On Success, save Auth Header
// 3. logout
// -> Remove Basic Auth Header
var core_1 = require('@angular/core');
var user_1 = require('@frontend/data/user');
var auth_util_1 = require('../utils/auth.util');
// Basic Auth
var BasicAuthService = (function () {
	var _BasicAuthService_authToken;
	var _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
	var _classDescriptor;
	var _classExtraInitializers = [];
	var _classThis;
	var BasicAuthService = (_classThis = /** @class */ (function () {
		function BasicAuthService_1() {
			_BasicAuthService_authToken.set(this, null);
			this.userHttpService = (0, core_1.inject)(user_1.UserHttpService);
		}
		Object.defineProperty(BasicAuthService_1.prototype, 'isAuthenticated', {
			get: function () {
				return (
					__classPrivateFieldGet(this, _BasicAuthService_authToken, 'f') != null
				);
			},
			enumerable: false,
			configurable: true,
		});
		BasicAuthService_1.prototype.register = function (command) {
			console.log('BasicAuthService#register', command);
			return this.userHttpService.register(command);
		};
		BasicAuthService_1.prototype.login = function (command) {
			return __awaiter(this, void 0, void 0, function () {
				var error_1;
				return __generator(this, function (_a) {
					switch (_a.label) {
						case 0:
							console.log('BasicAuthService#login', command);
							// 1. Generate Auth Token
							__classPrivateFieldSet(
								this,
								_BasicAuthService_authToken,
								(0, auth_util_1.generateAuthToken)(
									command.email,
									command.password
								),
								'f'
							);
							_a.label = 1;
						case 1:
							_a.trys.push([1, 3, , 4]);
							return [4 /*yield*/, this.userHttpService.login()];
						case 2:
							return [2 /*return*/, _a.sent()];
						case 3:
							error_1 = _a.sent();
							// 3. On Failure, null Auth Token
							__classPrivateFieldSet(
								this,
								_BasicAuthService_authToken,
								null,
								'f'
							);
							throw error_1;
						case 4:
							return [2 /*return*/];
					}
				});
			});
		};
		BasicAuthService_1.prototype.logout = function () {
			__classPrivateFieldSet(this, _BasicAuthService_authToken, null, 'f');
			document.location.reload();
		};
		BasicAuthService_1.prototype.appendAuthHeader = function (req) {
			if (
				__classPrivateFieldGet(this, _BasicAuthService_authToken, 'f') == null
			)
				return req;
			return req.clone({
				headers: (0, auth_util_1.appendAuthHeader)(
					req.headers,
					__classPrivateFieldGet(this, _BasicAuthService_authToken, 'f')
				),
			});
		};
		return BasicAuthService_1;
	})());
	_BasicAuthService_authToken = new WeakMap();
	__setFunctionName(_classThis, 'BasicAuthService');
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
		BasicAuthService = _classThis = _classDescriptor.value;
		if (_metadata)
			Object.defineProperty(_classThis, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata,
			});
		__runInitializers(_classThis, _classExtraInitializers);
	})();
	return (BasicAuthService = _classThis);
})();
exports.BasicAuthService = BasicAuthService;
