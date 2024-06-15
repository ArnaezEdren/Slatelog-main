import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { UserHttpService } from '../../../../../../data/user/src';
import { NgIf } from '@angular/common';

@Component({
	selector: 'frontend-forgot-username',
	standalone: true,
	templateUrl: './forgotten-username.component.html',
	styleUrl: './forgotten-username.component.css',
	imports: [ReactiveFormsModule, NgIf],
})
export class ForgotUsernameComponent {
	forgotUsernameForm: FormGroup;
	successMessage: string | null = null;

	constructor(private fb: FormBuilder) {
		this.forgotUsernameForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	onSubmit() {
		if (this.forgotUsernameForm.valid) {
			const email = this.forgotUsernameForm.value.email;
			// Simulate an API call
			setTimeout(() => {
				this.successMessage = 'Username has been sent to your email.';
			}, 1000);
		}
	}
}
