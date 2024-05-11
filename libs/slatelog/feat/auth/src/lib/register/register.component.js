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
//import {min3} from "@frontend/feat/auth/validators/validators";
let RegisterComponent = class RegisterComponent {
	constructor() {
		this.register = new EventEmitter();
		// This is a public property in JavaScript
		// registerForm: FormGroup;
		this.hide = true;
		// # is a private property in JavaScript
		// registerForm = inject(FormBuilder).nonNullable.group({
		this.registerForm = inject(FormBuilder).nonNullable.group({
			email: ['edren@home.at', [Validators.required, Validators.email]],
			password: [
				'spengergasse',
				[Validators.required, CustomValidators.passwordStrength(3)],
			],
			passwordConfirm: [
				'spengergasse',
				[Validators.required, CustomValidators.match('password')],
			],
			firstName: ['edren', [Validators.required, Validators.minLength(1)]],
			lastName: ['arnaez', [Validators.required, Validators.minLength(1)]],
		});
		// Type Safe Forms from Angular v14 ---------------------
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
			passwordConfirm: {
				required: 'password confirm is required',
				mismatch: 'passwords do not match',
			},
			firstName: {
				required: 'firstName is required',
				minLength: 'firstName should have at least 1 character',
			},
			lastName: {
				required: 'lastName is required',
				minLength: 'lastName should have at least 1 character',
			},
			// wrong: { ... } // does not work, we are typesafe
		};
	}
	// Type Safe Forms from Angular v14 ---------------------
	// Typesafe Error messages for each form control
	#errorMap;
	// Gets the control by name in a typesafe way
	getControlByName(controlName) {
		// return this.registerForm.get(controlName);
		return this.registerForm.controls[controlName];
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
	onRegister() {
		// console.log('form object', this.registerForm);
		this.register.emit(this.registerForm.value);
	}
};
__decorate(
	[Output(), __metadata('design:type', Object)],
	RegisterComponent.prototype,
	'register',
	void 0
);
RegisterComponent = __decorate(
	[
		Component({
			selector: 'frontend-register',
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
			templateUrl: './register.component.html',
			styleUrl: './register.component.css',
		}),
	],
	RegisterComponent
);
export { RegisterComponent };
// 	constructor() {
// 		this.registerForm = new FormGroup({
// 			//firstName: new FormControl(),
// 			//lastName: new FormControl(),
// 			email: new FormControl('', [Validators.required, Validators.email]),
// 			password: new FormControl('', [
// 				Validators.required,
// 				CustomValidators.passwordStrength(8),
// 			]),
// 			passwordConfirm: new FormControl('', [
// 				Validators.required,
// 			//	CustomValidators.match('password'),
// 			]),
// 		});  CustomValidators.match2('password', 'passwordConfirm');
// 	}
//
//
// 	onRegister(): void {
// 		console.log('register button clicked', this.registerForm);
// 	}
//
//   protected readonly CustomValidators = CustomValidators;
// }
//# sourceMappingURL=register.component.js.map
