import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventHttpService } from '../../../../createevent/src';
import { catchError, throwError } from 'rxjs';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'frontend-event-details',
	standalone: true,
	imports: [CommonModule, RouterLink, FormsModule],
	providers: [DatePipe],
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
	eventId!: string;
	events: any[] = [];
	filteredEvents: any[] = [];
	eventData: any;
	updateMode: boolean = false;
	originalEventData: any;
	createForm2: FormGroup = this.fb.group({
		title: ['title', [Validators.required, Validators.minLength(3)]],
		description: ['description', [Validators.maxLength(500)]],
		street: ['street', [Validators.required]],
		city: ['city', [Validators.required]],
		postalCode: [
			'1120',
			[Validators.required, Validators.pattern(/^[0-9]{4,}$/)],
		],
		country: ['country', [Validators.required]],
		deadlineDate: ['2024-05-26', [Validators.required]],
		deadlineTime: ['14:00', [Validators.required]],
		timePoints: this.fb.array([]),
		invitations: this.fb.array([]),
	});

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private http: HttpClient,
		private eventHttpService: EventHttpService,
		private router: Router,
		private datePipe: DatePipe
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

	toggleUpdateMode(): void {
		if (!this.updateMode) {
			this.originalEventData = {
				...this.filteredEvents.find((event) => this.isEventId(event.id)),
			};
			this.eventData = { ...this.originalEventData };
		} else {
			this.filteredEvents = this.filteredEvents.map((event) => {
				if (this.isEventId(event.id)) {
					return { ...this.originalEventData };
				}
				return event;
			});
		}
		this.updateMode = !this.updateMode;
	}

	//TODO CANT SAVE THE EVENT YET (BACKEND EXCEPTION)
	updateEvent(): void {
		const actualId = this.eventId.replace('eventId=', '');
		this.eventData = this.formatEventData2(this.createForm2.value);
		this.eventHttpService
			.updateEvent(actualId, this.eventData)
			.pipe(
				catchError((error) => {
					console.error('Error updating event:', error);
					throw error;
				})
			)
			.subscribe(() => {
				console.log('Event updated successfully');
				this.updateMode = false;
			});
	}

	private formatEventData2(formData: any): any {
		return {
			title: formData.title,
			description: formData.description,
			locationStreet: formData.street,
			locationCity: formData.city,
			locationZipCode: formData.postalCode,
			locationState: formData.country,
			pollOptions: formData.timePoints.map(
				(tp: any) =>
					`${this.datePipe.transform(tp.date, 'yyyy-MM-dd')}T${tp.time}:00Z`
			),
			invitationEmails: formData.invitations.map((inv: any) => inv.email),
			deadlineDate: this.datePipe.transform(
				formData.deadlineDate,
				'yyyy-MM-dd'
			),
			deadlineTime: formData.deadlineTime,
		};
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
