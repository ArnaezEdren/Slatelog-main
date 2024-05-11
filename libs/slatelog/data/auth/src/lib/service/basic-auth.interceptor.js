import { __decorate } from 'tslib';
import { inject, Injectable } from '@angular/core';
import { BasicAuthService } from './basic-auth.service';
let BasicAuthInterceptor = class BasicAuthInterceptor {
	constructor() {
		this.authService = inject(BasicAuthService);
	}
	intercept(req, next) {
		// append basic auth header
		const reqWithAuthHeaders = this.authService.appendAuthHeader(req);
		// call next interceptor
		return next.handle(reqWithAuthHeaders);
	}
};
BasicAuthInterceptor = __decorate([Injectable()], BasicAuthInterceptor);
export { BasicAuthInterceptor };
//# sourceMappingURL=basic-auth.interceptor.js.map
