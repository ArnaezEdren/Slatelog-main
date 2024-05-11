import { __decorate } from 'tslib';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { BasicAuthService } from '../../../../../data/auth/src';
// Smart Container which connects to a Service or Store.
// -> See also login.component.ts
let LoginContainerComponent = class LoginContainerComponent {
	constructor() {
		this.authService = inject(BasicAuthService);
		this.router = inject(Router);
	}
	onLogin(formData) {
		const command = formData;
		this.authService.login(command).then(() => {
			this.router.navigate(['/timeline']).catch((error) => {
				console.error('Login failed:', error);
			});
		});
	}
};
LoginContainerComponent = __decorate(
	[
		Component({
			selector: 'frontend-login-container',
			standalone: true,
			imports: [CommonModule, LoginComponent], //FeatMainModule entfernen
			template: `<frontend-login (login)="onLogin($event)"></frontend-login>`,
			styles: [],
		}),
	],
	LoginContainerComponent
);
export { LoginContainerComponent };
//# sourceMappingURL=login-container.component.js.map
