import { __decorate, __metadata } from 'tslib';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomValidators } from '../validators/validators';
import { PasswordStrengthComponent } from '../../../../../ui/src';
import { RouterLink } from '@angular/router';
let LoginComponent = class LoginComponent {
	constructor() {
		this.login = new EventEmitter();
		// This is a public property in JavaScript
		// registerForm: FormGroup;
		this.hide = true;
		// # is a private property in JavaScript
		// Typesafe Error messages for each form control
		this.#errorMap = {
			email: {
				required: 'email is required',
				email: 'email is not valid',
			},
			password: {
				required: 'password is required',
				weak: 'password not strong enough',
			},
		};
		// Type Safe Forms from Angular v14 ---------------------
		// registerForm = inject(FormBuilder).nonNullable.group({
		this.loginForm = inject(FormBuilder).nonNullable.group({
			email: ['edren@home.at', [Validators.required, Validators.email]],
			password: [
				'spengergasse',
				[Validators.required, CustomValidators.passwordStrength(3)],
			],
		});
	}
	// # is a private property in JavaScript
	// Typesafe Error messages for each form control
	#errorMap;
	// Gets the control by name in a typesafe way
	getControlByName(controlName) {
		// return this.registerForm.get(controlName);
		return this.loginForm.controls[controlName];
	}
	// Gets the control error in a typesafe way
	hasControlError(controlName) {
		// return !this.registerForm.get(controlName)?.valid ?? false;
		// ?. and ?? not needed, we are typesafe
		return this.getControlByName(controlName).invalid;
	}
	// Gets the control error message in a typesafe way
	getControlErrorMessage(controlName) {
		// Get the control, e.g. password control
		// const control = this.registerForm.get(controlName);
		const control = this.getControlByName(controlName);
		// Get the first error key
		// e.g. password errors: `Object { required: {}, weak: {…} }` -> `required`
		const firstErrorKey = control.errors ? Object.keys(control.errors)[0] : '';
		// Lookup and return the error message, e.g. `password is required`
		return this.#errorMap[controlName][firstErrorKey];
	}
	// Called when the register button is clicked
	onLogin() {
		// console.log('form object', this.registerForm);
		this.login.emit(this.loginForm.value);
	}
};
__decorate(
	[Output(), __metadata('design:type', Object)],
	LoginComponent.prototype,
	'login',
	void 0
);
LoginComponent = __decorate(
	[
		Component({
			selector: 'frontend-login',
			standalone: true,
			imports: [
				CommonModule,
				MatFormFieldModule,
				MatInputModule,
				ReactiveFormsModule,
				MatCardModule,
				MatButtonModule,
				MatIconModule,
				PasswordStrengthComponent,
				RouterLink,
			],
			templateUrl: './login.component.html',
			styleUrls: ['./login.component.css'],
		}),
	],
	LoginComponent
);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map
