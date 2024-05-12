import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'frontend-timeline-overview',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './timeline-overview.component.html',
	styleUrl: './timeline-overview.component.css',
})
export class TimelineOverviewComponent implements OnInit {
	inProgressEvents: any[] = [];

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.getEventsInProgress();
	}

	getEventsInProgress() {
		this.http.get<any[]>('api/timeline').subscribe((events) => {
			this.inProgressEvents = events;
		});
	}
}
