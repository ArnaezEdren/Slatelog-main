import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserHttpService } from '../../../../../../data/user/src';

@Component({
	selector: 'frontend-forgot-password',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './forgotten-password.component.html',
	styleUrl: './forgotten-password.component.css',
})
export class ForgotPasswordComponent {
	forgotPasswordForm: FormGroup;
	successMessage: string | null = null;

	constructor(private fb: FormBuilder) {
		this.forgotPasswordForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	onSubmit() {
		if (this.forgotPasswordForm.valid) {
			const email = this.forgotPasswordForm.value.email;
			// Simulate an API call
			setTimeout(() => {
				this.successMessage =
					'Password reset link has been sent to your email.';
			}, 1000);
		}
	}
}
