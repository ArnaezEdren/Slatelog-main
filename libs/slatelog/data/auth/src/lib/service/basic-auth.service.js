// Angular Service
import { __decorate } from 'tslib';
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
import { inject, Injectable } from '@angular/core';
import { UserHttpService } from '@frontend/data/user';
import { appendAuthHeader, generateAuthToken } from '../utils/auth.util';
// Basic Auth
let BasicAuthService = class BasicAuthService {
	constructor() {
		this.#authToken = null;
		this.userHttpService = inject(UserHttpService);
	}
	#authToken;
	get isAuthenticated() {
		return this.#authToken != null;
	}
	register(command) {
		console.log('BasicAuthService#register', command);
		return this.userHttpService.register(command);
	}
	async login(command) {
		console.log('BasicAuthService#login', command);
		// 1. Generate Auth Token
		this.#authToken = generateAuthToken(command.email, command.password);
		// 2. Auth Header will be appended by the interceptor on the http login request
		try {
			return await this.userHttpService.login();
		} catch (error) {
			// 3. On Failure, null Auth Token
			this.#authToken = null;
			throw error;
		}
	}
	logout() {
		this.#authToken = null;
		document.location.reload();
	}
	appendAuthHeader(req) {
		if (this.#authToken == null) return req;
		return req.clone({
			headers: appendAuthHeader(req.headers, this.#authToken),
		});
	}
};
BasicAuthService = __decorate(
	[Injectable({ providedIn: 'root' })],
	BasicAuthService
);
export { BasicAuthService };
//# sourceMappingURL=basic-auth.service.js.map
