import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventHttpService } from '../../../../createevent/src';
import { error } from '@angular/compiler-cli/src/transformers/util';

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

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		private eventHttpService: EventHttpService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.eventId = params['id'];
			console.log(this.eventId);
		});
		this.getEvents();
	}

	getEvents(): void {
		this.http.get<any[]>('api/timeline').subscribe((events) => {
			this.events = events;
			this.filteredEvents = this.events.filter((event) =>
				this.isEventId(event.id)
			);
		});
	}

	isEventId(id: string): boolean {
		return this.eventId === id;
	}

	//TODO  UPDATE THE EVENT
	updateEvent(eventId: string): void {
		//Logic has to be implemented
		console.log('Edit Event:', eventId);
	}

	//TODO  FIX THE ERROR 400 BAD REQUEST
	deleteEvent(eventId: string): void {
		if (confirm('Are you sure you want to delete this Event?')) {
			this.eventHttpService.deleteEvent(eventId).subscribe({
				next: () => {
					console.log('Successfully deleted Event');
					this.filteredEvents = this.filteredEvents.filter(
						(e) => e.id !== eventId
					);
				},
				error: (error) => {
					console.error('Error occurred:', error);
				},
			});
		}
	}
}
