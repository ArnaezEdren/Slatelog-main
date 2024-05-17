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
	FormArray,
	ReactiveFormsModule,
} from '@angular/forms';

@Component({
	selector: 'frontend-event-details',
	standalone: true,
	imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
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
	createForm2: FormGroup;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private http: HttpClient,
		private eventHttpService: EventHttpService,
		private router: Router,
		private datePipe: DatePipe
	) {
		this.createForm2 = this.fb.group({
			title: ['', [Validators.required, Validators.minLength(3)]],
			description: ['', [Validators.maxLength(500)]],
			street: ['', [Validators.required]],
			city: ['', [Validators.required]],
			zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,}$/)]],
			state: ['', [Validators.required]],
			deadlineDate: ['', [Validators.required]],
			deadlineTime: ['', [Validators.required]],
			timePoints: this.fb.array([]),
			invitations: this.fb.array([]),
		});
	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.eventId = params['eventId'];
			this.getEvents();
		});
	}

	getEvents(): void {
		this.http.get<any[]>('api/timeline').subscribe((events) => {
			this.events = events;
			this.filteredEvents = this.events.filter((event) =>
				this.isEventId(event.id)
			);
			this.filteredEvents.forEach((event) => {
				event.pollOptions = event.poll.pollOptions || [];
				event.pollCloseDate = event.poll.pollCloseDate;
				event.pollResults = Object.keys(event.poll.pollOptions).map((key) => {
					const pollOption = event.poll.pollOptions[key];
					return {
						dateTime: key,
						yesCount: pollOption.filter(
							(vote: any) => vote.voteOption === 'Yes'
						).length,
						noCount: pollOption.filter((vote: any) => vote.voteOption === 'No')
							.length,
						maybeCount: pollOption.filter(
							(vote: any) => vote.voteOption === 'Maybe'
						).length,
					};
				});
			});
		});
	}

	get timePointsControls(): FormArray {
		return this.createForm2.get('timePoints') as FormArray;
	}

	get invitationsControls(): FormArray {
		return this.createForm2.get('invitations') as FormArray;
	}

	getTimePointsArray(): FormGroup[] {
		return this.timePointsControls.controls as FormGroup[];
	}

	getInvitationsArray(): FormGroup[] {
		return this.invitationsControls.controls as FormGroup[];
	}

	isEventId(id: string): boolean {
		const actualId = this.eventId.replace('eventId=', '');
		return actualId === id;
	}

	toggleUpdateMode(): void {
		if (!this.updateMode) {
			this.originalEventData = {
				...this.filteredEvents.find((event) => this.isEventId(event.id)),
			};
			this.eventData = { ...this.originalEventData };
			this.setFormData(this.eventData);
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

	setFormData(event: any): void {
		this.createForm2.patchValue({
			title: event.title,
			description: event.description,
			street: event.location.street,
			city: event.location.city,
			zipCode: event.location.zipCode,
			state: event.location.state,
			deadlineDate: this.datePipe.transform(event.pollCloseDate, 'yyyy-MM-dd'),
			deadlineTime: this.datePipe.transform(event.pollCloseDate, 'HH:mm'),
		});

		if (event.poll) {
			this.setTimePoints(event.poll.pollOptions || {});
			this.setInvitations(event.invitations || []);
		} else {
			console.error('Poll data is undefined:', event.poll);
		}
	}

	setTimePoints(pollOptions: any): void {
		const timePointsArray = this.timePointsControls;
		timePointsArray.clear(); // Clear existing controls
		if (pollOptions) {
			Object.keys(pollOptions).forEach((key) => {
				const [date, time] = key.split('T');
				timePointsArray.push(
					this.fb.group({
						date: [date, Validators.required],
						time: [time.split('Z')[0], Validators.required],
					})
				);
			});
		} else {
			console.error('Poll options are invalid or undefined:', pollOptions);
		}
	}

	setInvitations(invitations: any): void {
		const invitationsArray = this.invitationsControls;
		invitationsArray.clear(); // Clear existing controls
		if (invitations && Array.isArray(invitations)) {
			invitations.forEach((invitation: any) => {
				invitationsArray.push(
					this.fb.group({
						email: [invitation.email, [Validators.required, Validators.email]],
					})
				);
			});
		} else {
			console.error('Invitations data is invalid or undefined:', invitations);
		}
	}

	addInvitation(): void {
		this.invitationsControls.push(
			this.fb.group({
				email: ['', [Validators.required, Validators.email]],
			})
		);
	}

	removeInvitation(index: number): void {
		this.invitationsControls.removeAt(index);
	}

	updateEvent(): void {
		const actualId = this.eventId.replace('eventId=', '');
		this.eventData = this.formatEventData(this.createForm2.value);
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

	private formatEventData(formData: any): any {
		return {
			title: formData.title,
			description: formData.description,
			locationStreet: formData.street,
			locationCity: formData.city,
			locationZipCode: formData.zipCode,
			locationState: formData.state,
			pollOptions: formData.timePoints.map(
				(tp: any) =>
					`${this.datePipe.transform(tp.date, 'yyyy-MM-dd')}T${tp.time}Z`
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

	goBack(): void {
		this.router.navigate(['/timeline']);
	}

	downloadIcsFile(base64Data: string): void {
		const binaryString = window.atob(base64Data);
		const bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		const blob = new Blob([bytes.buffer], { type: 'text/calendar' });
		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = 'event.ics';
		link.click();
	}
}
