import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineOverviewComponent } from './timeline-overview/timeline-overview.component';

@Component({
	selector: 'frontend-timeline-container',
	standalone: true,
	imports: [CommonModule, TimelineOverviewComponent],
	template: `<frontend-timeline-overview></frontend-timeline-overview>`,
	styles: [],
})
export class TimelineContainerComponent {}
