import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details/event-details.component';

@Component({
	selector: 'frontend-event-details-container',
	standalone: true,
	imports: [CommonModule, EventDetailsComponent],
	template: `<frontend-event-details></frontend-event-details>`,
})
export class EventDetailsContainerComponent {}
