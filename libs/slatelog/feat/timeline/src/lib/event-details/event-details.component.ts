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
	FormControl,
} from '@angular/forms';
import {
	atLeastOneEmailValidator,
	futureDateValidator,
	noOverlapValidator,
} from '../../../../createevent/src/lib/createevent/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmSnackbarComponent } from './delete-confirm-snackbar.component'; // Import MatSnackBar

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
	formInvalid: boolean = false;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private http: HttpClient,
		private eventHttpService: EventHttpService,
		private router: Router,
		private datePipe: DatePipe,
		private snackBar: MatSnackBar // Inject MatSnackBar
	) {
		this.createForm2 = this.fb.group({
			title: ['', [Validators.required, Validators.minLength(3)]],
			description: ['', [Validators.maxLength(500)]],
			street: ['', [Validators.required]],
			city: ['', [Validators.required]],
			zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,}$/)]],
			state: ['', [Validators.required]],
			deadlineDate: ['', [Validators.required, futureDateValidator()]],
			deadlineTime: ['', [Validators.required]],
			timePoints: this.fb.array([], noOverlapValidator),
			invitations: this.fb.array([], atLeastOneEmailValidator),
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
			// Optionally, reset the form with the updated event data
			if (this.filteredEvents.length > 0) {
				this.setFormData(this.filteredEvents[0]);
			}
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
				let formattedTime = time.split('Z')[0];

				// Ensure formattedTime is in hh:mm:ss format
				if (!formattedTime.includes(':')) {
					formattedTime += ':00'; // Append seconds if missing
				} else if (formattedTime.split(':').length === 2) {
					formattedTime += ':00'; // Append seconds if only hours and minutes are provided
				}

				timePointsArray.push(
					this.fb.group({
						date: [date, Validators.required],
						time: [formattedTime, Validators.required],
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

	addTimePoint(): void {
		this.timePointsControls.push(
			this.fb.group({
				date: ['', Validators.required],
				time: ['', Validators.required],
			})
		);
	}

	removeTimePoint(index: number): void {
		this.timePointsControls.removeAt(index);
	}

	updateEvent(): void {
		if (this.createForm2.valid) {
			const actualId = this.eventId.replace('eventId=', '');
			this.eventData = this.formatEventData(this.createForm2.value);
			this.eventHttpService
				.updateEvent(actualId, this.eventData)
				.pipe(
					catchError((error) => {
						console.error('Error updating event:', error);
						return throwError(error);
					})
				)
				.subscribe(() => {
					console.log('Event updated successfully');
					this.updateMode = false;
					// Reload the events to refresh the data
					this.getEvents();
				});
		} else {
			this.validateAllFormFields(this.createForm2);
			this.formInvalid = true;
			console.log('Form is not valid');
		}
	}

	confirmPollOption(eventId: string, dateTime: string): void {
		// Your logic to handle poll option confirmation
		console.log(`Confirming poll option for event ${eventId} at ${dateTime}`);
		// Update event data or call a service to handle confirmation
		// Example: this.eventHttpService.confirmPollOption(eventId, dateTime)...
	}

	private formatEventData(formData: any): any {
		const formattedTimePoints = formData.timePoints.map((tp: any) => {
			// Ensure tp.time is in hh:mm:ss format
			let time = tp.time;
			if (!time.includes(':')) {
				time += ':00'; // Append seconds if missing
			} else if (time.split(':').length === 2) {
				time += ':00'; // Append seconds if only hours and minutes are provided
			}

			// Return the formatted datetime string
			return `${this.datePipe.transform(tp.date, 'yyyy-MM-dd')}T${time}Z`;
		});

		return {
			title: formData.title,
			description: formData.description,
			locationStreet: formData.street,
			locationCity: formData.city,
			locationZipCode: formData.zipCode,
			locationState: formData.state,
			pollOptions: formattedTimePoints,
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

		const snackBarRef = this.snackBar.openFromComponent(
			DeleteConfirmSnackbarComponent,
			{
				data: {
					message: 'Do you really want to delete this Event?',
					onConfirm: () => {
						snackBarRef.dismiss();
						this.eventHttpService
							.deleteEvent(actualId)
							.pipe(
								catchError((error) => {
									console.error('Error deleting Event:', error);
									this.snackBar.open('Error deleting Event', 'Close', {
										duration: 3000,
									});
									return throwError(error);
								})
							)
							.subscribe({
								next: () => {
									console.log('Successfully deleted Event');
									this.snackBar.open('Successfully deleted Event', 'Close', {
										duration: 3000,
									});
									this.router.navigate(['/timeline']);
								},
							});
					},
					onCancel: () => {
						snackBarRef.dismiss();
					},
				},
			}
		);
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

	private validateAllFormFields(formGroup: FormGroup): void {
		Object.keys(formGroup.controls).forEach((field) => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			} else if (control instanceof FormArray) {
				control.controls.forEach((group) => {
					this.validateAllFormFields(group as FormGroup);
				});
			}
		});
	}
}
