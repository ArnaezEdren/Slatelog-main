import { __decorate } from 'tslib';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { BasicAuthService } from '../../../../../data/auth/src';
import { Router } from '@angular/router';
// Smart Container which connects to a Service or Store.
// -> See also login.component.ts
let RegisterContainerComponent = class RegisterContainerComponent {
	constructor() {
		this.authService = inject(BasicAuthService);
		this.router = inject(Router);
	}
	onRegister(formData) {
		const { passwordConfirm, ...command } = formData;
		// const registrationCommand = command as UserRegistrationCommand;
		this.authService
			.register(command)
			.then(() => {
				this.router.navigate(['/auth/login']);
			})
			.catch((error) => {
				console.error('Register failed:', error);
			});
	}
};
RegisterContainerComponent = __decorate(
	[
		Component({
			selector: 'frontend-register-container',
			standalone: true,
			imports: [CommonModule, RegisterComponent],
			template: `<frontend-register (register)="onRegister($event)"></frontend-register>`,
			styles: [],
		}),
	],
	RegisterContainerComponent
);
export { RegisterContainerComponent };
//# sourceMappingURL=register-container.component.js.map
