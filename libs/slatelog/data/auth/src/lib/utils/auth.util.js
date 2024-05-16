'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.appendAuthHeader = exports.generateAuthToken = void 0;
var auth_model_1 = require('../model/auth.model');
function generateAuthToken(username, password) {
	return 'Basic '.concat(btoa(username + ':' + password));
	// return 'Basic ' + btoa(username + ':' + password);
}
exports.generateAuthToken = generateAuthToken;
function appendAuthHeader(headers, authToken) {
	return headers.set(auth_model_1.AUTH_HEADER, authToken);
}
exports.appendAuthHeader = appendAuthHeader;
