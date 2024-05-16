import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventHttpService } from '../../../../createevent/src';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { catchError, throwError } from 'rxjs';

@Component({
	selector: 'frontend-event-details',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
	eventId!: string;
	events: any[] = [];
	filteredEvents: any[] = [];
	eventData: any;

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		private eventHttpService: EventHttpService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.eventId = params['eventId'];
			//console.log(this.eventId);
		});
		this.getEvents();
	}

	getEvents(): void {
		this.http.get<any[]>('api/timeline').subscribe((events) => {
			this.events = events;
			this.filteredEvents = this.events.filter((event) =>
				this.isEventId(event.id)
			);
			//console.log('Filtered Events:', this.filteredEvents);
		});
	}

	isEventId(id: string): boolean {
		//console.log('Comparing IDs:', this.eventId, id);
		const actualId = this.eventId.replace('eventId=', '');
		//console.log('Actual ID:', actualId, 'eventId:', this.eventId)
		//console.log('Übergebener ID wert', id);
		return actualId === id;
	}

	//TODO  UPDATE THE EVENT
	updateEvent(eventId: string): void {
		//Logic has to be implemented
		console.log('Edit Event:', eventId);
	}

	deleteEvent(): void {
		const actualId = this.eventId.replace('eventId=', '');
		if (confirm('Do you really want to delete this Event?')) {
			if (this.isEventId(actualId)) {
				this.eventHttpService
					.deleteEvent(actualId)
					.pipe(
						catchError((error) => {
							console.error('Error deleting Event:', error);
							return throwError(error);
						})
					)
					.subscribe({
						next: () => {
							console.log('Successfully deleted Event');
							this.router.navigate(['/timeline']);
						},
					});
			}
		}
	}
}
