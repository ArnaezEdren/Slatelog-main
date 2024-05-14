import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
let TimelineOverviewComponent = class TimelineOverviewComponent {
	constructor(http) {
		this.http = http;
		this.inProgressEvents = [];
	}
	ngOnInit() {
		this.getEventsInProgress();
	}
	getEventsInProgress() {
		this.http.get('api/timeline').subscribe((events) => {
			this.inProgressEvents = events;
		});
	}
};
TimelineOverviewComponent = __decorate(
	[
		Component({
			selector: 'frontend-timeline-overview',
			standalone: true,
			imports: [CommonModule, RouterLink],
			templateUrl: './timeline-overview.component.html',
			styleUrl: './timeline-overview.component.css',
		}),
		__metadata('design:paramtypes', [HttpClient]),
	],
	TimelineOverviewComponent
);
export { TimelineOverviewComponent };
//# sourceMappingURL=timeline-overview.component.js.map
