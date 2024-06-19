import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomValidators } from '../validators/validators';
import {
	RegisterFormData,
	RegisterFormErrorType,
	RegisterFormType,
} from '../model/register-view.model';
import { PasswordStrengthComponent } from '../../../../../ui/src';
import { RouterLink } from '@angular/router';
import { BasicAuthService } from '../../../../../data/auth/src';
import { emailExistsValidator } from '../validators/AsyncValidatorFn';

@Component({
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
})
export class RegisterComponent {
	@Output() register = new EventEmitter<RegisterFormData>();
	hide = true;
	authService = inject(BasicAuthService);

	registerForm: FormGroup<RegisterFormType> = inject(
		FormBuilder
	).nonNullable.group({
		email: [
			'',
			[Validators.required, Validators.email],
			[emailExistsValidator(this.authService)],
		],
		password: ['', [Validators.required, CustomValidators.passwordStrength(3)]],
		passwordConfirm: [
			'',
			[Validators.required, CustomValidators.match('password')],
		],
		firstName: ['', [Validators.required, Validators.minLength(1)]],
		lastName: ['', [Validators.required, Validators.minLength(1)]],
	});

	#errorMap: RegisterFormErrorType = {
		email: {
			required: 'Email is required',
			email: 'Email is not valid',
			emailExists: 'Email already exists',
		},
		password: {
			required: 'Password is required',
			weak: 'Password not strong enough',
		},
		passwordConfirm: {
			required: 'Password confirm is required',
			mismatch: 'Passwords do not match',
		},
		firstName: {
			required: 'First name is required',
			minLength: 'First name should have at least 1 character',
		},
		lastName: {
			required: 'Last name is required',
			minLength: 'Last name should have at least 1 character',
		},
	};

	getControlByName(controlName: keyof RegisterFormData) {
		return this.registerForm.controls[controlName];
	}

	hasControlError(controlName: keyof RegisterFormData): boolean {
		return this.getControlByName(controlName).invalid;
	}

	getControlErrorMessage(controlName: keyof RegisterFormData): string {
		const control = this.getControlByName(controlName);
		const firstErrorKey = control.errors ? Object.keys(control.errors)[0] : '';
		return this.#errorMap[controlName][firstErrorKey];
	}

	onRegister() {
		this.register.emit(this.registerForm.value as RegisterFormData);
	}
}
