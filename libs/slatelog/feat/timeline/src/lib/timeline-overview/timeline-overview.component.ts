import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BasicAuthService } from '../../../../../data/auth/src';

@Component({
	selector: 'frontend-timeline-overview',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './timeline-overview.component.html',
	styleUrl: './timeline-overview.component.css',
})
export class TimelineOverviewComponent implements OnInit {
	inProgressEvents: any[] = [];

	constructor(
		private http: HttpClient,
		private authService: BasicAuthService
	) {}

	ngOnInit() {
		this.getEventsInProgress();
	}

	getEventsInProgress() {
		this.http.get<any[]>('api/timeline').subscribe((events) => {
			this.inProgressEvents = events;
		});
	}
}
