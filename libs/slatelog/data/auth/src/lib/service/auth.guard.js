import { __decorate } from 'tslib';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { BasicAuthService } from './basic-auth.service';
let AuthGuard = class AuthGuard {
	constructor() {
		this.service = inject(BasicAuthService);
		this.router = inject(Router);
	}
	canActivate() {
		if (this.service.isAuthenticated) {
			return true;
		}
		return this.router.parseUrl('/auth/login');
	}
};
AuthGuard = __decorate([Injectable({ providedIn: 'root' })], AuthGuard);
export { AuthGuard };
// export function authenticationGuard(): CanActivateFn {
//   return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//
//     const isAuthenticated = inject((BasicAuthService).isAuthenticated;
//     if (isAuthenticated) {
//       return true;
//     }
//     const  router = inject(Router);
//     return  router.parseUrl('/auth/login');
//
//   }
// }
//# sourceMappingURL=auth.guard.js.map
