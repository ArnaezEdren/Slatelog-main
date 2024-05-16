import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'frontend-timeline-overview',
	standalone: true,
	imports: [CommonModule, RouterLink, ButtonModule],
	templateUrl: './timeline-overview.component.html',
	styleUrl: './timeline-overview.component.css',
})
export class TimelineOverviewComponent implements OnInit {
	inProgressEvents: any[] = [];

	constructor(private http: HttpClient, private router: Router) {}

	ngOnInit() {
		this.getEventsInProgress();
	}

	getEventsInProgress() {
		this.http.get<any[]>('api/timeline').subscribe((events) => {
			this.inProgressEvents = events;
			console.log(events);
		});
	}

	goToEventDetails(eventId: number) {
		this.router.navigate(['/event-details', eventId]);

		console.log('Navigating to event details for event ID:', eventId);
	}
}
