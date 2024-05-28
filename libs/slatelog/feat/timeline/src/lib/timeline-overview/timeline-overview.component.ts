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
	styleUrls: ['./timeline-overview.component.css'],
})
export class TimelineOverviewComponent implements OnInit {
	pendingEvents: any[] = [];
	confirmedEvents: any[] = [];

	constructor(private http: HttpClient, private router: Router) {}

	ngOnInit() {
		this.getEventsInProgress();
	}

	getEventsInProgress() {
		this.http.get<any[]>('api/timeline').subscribe((events) => {
			const currentDate = new Date();
			this.pendingEvents = events.filter(
				(event) => new Date(event.poll.pollCloseDate) > currentDate
			);
			this.confirmedEvents = events.filter(
				(event) => new Date(event.poll.pollCloseDate) <= currentDate
			);
		});
	}
}
