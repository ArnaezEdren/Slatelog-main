import { AUTH_HEADER } from '../model/auth.model';
export function generateAuthToken(username, password) {
	return `Basic ${btoa(username + ':' + password)}`;
	// return 'Basic ' + btoa(username + ':' + password);
}
export function appendAuthHeader(headers, authToken) {
	return headers.set(AUTH_HEADER, authToken);
}
//# sourceMappingURL=auth.util.js.map
