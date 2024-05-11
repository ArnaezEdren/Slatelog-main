import { __decorate } from 'tslib';
import { Component, inject } from '@angular/core';
import { CreateEventComponent } from './createevent.component';
import { BasicAuthService } from '../../../../../data/auth/src';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// Smart Container which connects to a Service or Store.
// -> See also login.component.ts
let CreateEventContainerComponent = class CreateEventContainerComponent {
	constructor() {
		this.authService = inject(BasicAuthService);
		this.router = inject(Router);
	}
};
CreateEventContainerComponent = __decorate(
	[
		Component({
			selector: 'frontend-register-container',
			standalone: true,
			imports: [CommonModule, CreateEventComponent],
			template: `<frontend-createevent></frontend-createevent>`,
			styles: [],
		}),
	],
	CreateEventContainerComponent
);
export { CreateEventContainerComponent };
//# sourceMappingURL=createevent-container.js.map
