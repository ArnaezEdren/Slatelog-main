import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'frontend-timeline-overview',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './timeline-overview.component.html',
	styleUrl: './timeline-overview.component.css',
})
export class TimelineOverviewComponent {}
