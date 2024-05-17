import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
	FormBuilder,
	FormArray,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { EventHttpService } from '../service/createevent-http.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../dialogconfirm/dialogconfirm.component';
import { Event } from '../model/createEvent-view.model'; // Ensure the correct Event model is imported

@Component({
	selector: 'frontend-createevent',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterLink,
		MatSnackBarModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatCardModule,
		MatDatepickerModule,
		MatChipsModule,
		MatIconModule,
		MatButtonModule,
		CalendarModule,
	],
	templateUrl: './createevent.component.html',
	styleUrls: ['./createevent.component.css'],
	providers: [provideNativeDateAdapter(), DatePipe],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateEventComponent {
	@Output() create = new EventEmitter<any>();

	createForm: FormGroup = this.fb.group({
		title: ['PartyParty', [Validators.required, Validators.minLength(3)]],
		description: ['PartyinIbiza', [Validators.maxLength(500)]],
		street: ['Ibizastreet 17', [Validators.required]],
		city: ['Ibiza', [Validators.required]],
		postalCode: [
			'12345',
			[Validators.required, Validators.pattern(/^[0-9]{4,}$/)],
		],
		country: ['Spain', [Validators.required]],
		deadlineDate: ['2024-05-24', [Validators.required]],
		deadlineTime: ['14:00', [Validators.required]],
		timePoints: this.fb.array([]),
		invitations: this.fb.array([]),
	});

	private latestIcsFileData: string | null = null;

	constructor(
		private fb: FormBuilder,
		private createService: EventHttpService,
		private datePipe: DatePipe,
		private snackBar: MatSnackBar,
		private router: Router,
		private dialog: MatDialog
	) {}

	get timePoints(): FormArray {
		return this.createForm.get('timePoints') as FormArray;
	}

	get invitations(): FormArray {
		return this.createForm.get('invitations') as FormArray;
	}

	addTimePoint(): void {
		const timePointForm = this.fb.group({
			date: ['2024-05-29', Validators.required],
			time: ['14:00', Validators.required],
		});
		this.timePoints.push(timePointForm);
	}

	addInvitation(): void {
		const group = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
		});
		this.invitations.push(group);
	}

	removeTimePoint(index: number): void {
		this.timePoints.removeAt(index);
	}

	removeInvitation(index: number): void {
		this.invitations.removeAt(index);
	}

	onSubmit(): void {
		if (this.createForm.valid) {
			const eventData = this.formatEventData(this.createForm.value);
			this.create.emit(eventData);
			this.createService.createEvent(eventData).subscribe({
				next: (response) => {
					this.snackBar.open('Event created and emails sent!', 'Close', {
						duration: 3000,
					});
					this.loadAllEvents(); // Load all events after creation
				},
				error: (error) => {
					console.error('Error creating event:', error);
					this.snackBar.open('Failed to create event!', 'Close', {
						duration: 3000,
					});
				},
			});
		} else {
			this.snackBar.open(
				'Form is not valid, please check your entries.',
				'Close',
				{ duration: 3000 }
			);
		}
	}

	private formatEventData(formData: any): any {
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

	openConfirmDialog(): void {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: {
				message: 'Termine in Kalender eintragen?',
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result && this.latestIcsFileData) {
				this.downloadIcsFile(this.latestIcsFileData); // Trigger the download of the .ics file
				this.router.navigate(['/timeline']); // Navigate to the timeline route
			}
		});
	}

	loadAllEvents(): void {
		this.createService.getAllEvents().subscribe(
			(events: Event[]) => {
				if (events.length > 0) {
					const sortedEvents = events.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
					const latestEvent = sortedEvents[0];
					console.log('ICS File Data:', latestEvent.icsFileData);
					this.latestIcsFileData = latestEvent.icsFileData; // Store the latest ICS file data
					this.openConfirmDialog(); // Open the confirm dialog after loading events
				} else {
					console.log('No events found.');
				}
			},
			(error) => {
				console.error('Error loading events:', error);
			}
		);
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
