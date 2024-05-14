import { __decorate, __metadata } from 'tslib';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
	FormBuilder,
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
let CreateEventComponent = class CreateEventComponent {
	addTimePoint() {
		const timePointForm = this.fb.group({
			date: ['2024-05-30', Validators.required],
			time: ['18:00', Validators.required],
			vote: [''], // optional, initial leer
		});
		this.timePoints.push(timePointForm);
	}
	constructor(fb, createService, datePipe, snackBar, router) {
		this.fb = fb;
		this.createService = createService;
		this.datePipe = datePipe;
		this.snackBar = snackBar;
		this.router = router;
		this.create = new EventEmitter();
		this.createForm = this.fb.group({
			title: ['title', [Validators.required, Validators.minLength(3)]],
			description: ['description', [Validators.maxLength(500)]],
			street: ['street', [Validators.required]],
			city: ['city', [Validators.required]],
			postalCode: [
				'1120',
				[Validators.required, Validators.pattern(/^[0-9]{4,}$/)],
			], // Beispiel für Postleitzahlen mit mindestens 4 Ziffern
			country: ['country', [Validators.required]],
			deadlineDate: ['2024-05-26', [Validators.required]],
			deadlineTime: ['14:00', [Validators.required]],
			timePoints: this.fb.array([]),
			invitations: this.fb.array([]),
		});
	}
	get timePoints() {
		return this.createForm.get('timePoints');
	}
	get invitations() {
		return this.createForm.get('invitations');
	}
	addInvitation() {
		const group = this.fb.group({
			email: ['lukas@home.at', [Validators.required, Validators.email]],
		});
		this.invitations.push(group);
	}
	removeTimePoint(index) {
		this.timePoints.removeAt(index);
	}
	removeInvitation(index) {
		this.invitations.removeAt(index);
	}
	onSubmit() {
		if (this.createForm.valid) {
			const formattedData = this.formatEventData(this.createForm.value);
			this.createService.createEvent(formattedData).subscribe(
				(response) => {
					console.log('Event successfully created:', response);
					this.create.emit(response); // Emit event creation success
					this.snackBar.open('Event created successfully!', 'Close', {
						duration: 3000,
						horizontalPosition: 'right',
						verticalPosition: 'top',
					});
					this.createForm.reset(); // Optional: Reset form
					this.router.navigate(['../timeline']); // Modify this route as needed
				},
				(error) => {
					console.error('Failed to create event:', error);
					this.snackBar.open('Failed to create event!', 'Close', {
						duration: 3000,
						horizontalPosition: 'right',
						verticalPosition: 'top',
					});
				}
			);
		} else {
			console.log('Form is not valid:', this.createForm.errors);
			this.snackBar.open(
				'Form is not valid, please review your entries!',
				'Close',
				{
					duration: 3000,
					horizontalPosition: 'right',
					verticalPosition: 'top',
				}
			);
		}
	}
	formatEventData(formData) {
		return {
			title: formData.title,
			description: formData.description,
			locationStreet: formData.street,
			locationCity: formData.city,
			locationZipCode: formData.postalCode,
			locationState: formData.country,
			pollOptions: formData.timePoints.map(
				(tp) =>
					`${this.datePipe.transform(tp.date, 'yyyy-MM-dd')}T${tp.time}:00Z`
			), // Assuming time is in HH:mm format and Z is added for UTC
			invitationEmails: formData.invitations.map((inv) => inv.email),
			deadlineDate: this.datePipe.transform(
				formData.deadlineDate,
				'yyyy-MM-dd'
			),
			deadlineTime: formData.deadlineTime,
		};
	}
};
__decorate(
	[Output(), __metadata('design:type', Object)],
	CreateEventComponent.prototype,
	'create',
	void 0
);
CreateEventComponent = __decorate(
	[
		Component({
			selector: 'frontend-createevent',
			standalone: true,
			imports: [
				MatSnackBarModule,
				CommonModule,
				RouterLink,
				MatFormFieldModule,
				MatSelectModule,
				MatInputModule,
				MatLabel,
				MatCardModule,
				MatDatepickerModule,
				MatChipsModule,
				MatIconModule,
				ReactiveFormsModule,
				MatButtonModule,
				CalendarModule,
				FormsModule,
			],
			templateUrl: './createevent.component.html',
			styleUrls: ['./createevent.component.css'],
			providers: [provideNativeDateAdapter(), DatePipe],
			schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
		}),
		__metadata('design:paramtypes', [
			FormBuilder,
			EventHttpService,
			DatePipe,
			MatSnackBar,
			Router,
		]),
	],
	CreateEventComponent
);
export { CreateEventComponent };
//# sourceMappingURL=createevent.component.js.map
