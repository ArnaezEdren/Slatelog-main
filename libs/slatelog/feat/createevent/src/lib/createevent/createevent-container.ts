import { Component, inject } from '@angular/core';
import { CreateEventComponent } from './createevent.component';
import { BasicAuthService } from '../../../../../data/auth/src';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Smart Container which connects to a Service or Store.
// -> See also login.component.ts
@Component({
	selector: 'frontend-register-container',
	standalone: true,
	imports: [CommonModule, CreateEventComponent],
	template: `<frontend-createevent></frontend-createevent>`,
	styles: [],
})
export class CreateEventContainerComponent {
	authService = inject(BasicAuthService);
	router = inject(Router);
}
