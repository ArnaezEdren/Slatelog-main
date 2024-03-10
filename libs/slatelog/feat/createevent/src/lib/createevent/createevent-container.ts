import { Component } from '@angular/core';
import { CreateEventComponent } from './createevent.component';

// Smart Container which connects to a Service or Store.
// -> See also login.component.ts
@Component({
	selector: 'frontend-register-container',
	standalone: true,
	imports: [CreateEventComponent],
	template: `<frontend-createevent></frontend-createevent>`,
	styles: [],
})
export class CreateEventContainerComponent {}
