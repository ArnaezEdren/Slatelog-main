import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
	FormBuilder,
	FormArray,
	FormGroup,
	ReactiveFormsModule,
	Validators,
	FormControl,
	ValidatorFn,
	AbstractControl,
} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { EventHttpService } from '../service/createevent-http.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { catchError, retry, Subscription, throwError } from 'rxjs';
import { convertElementSourceSpanToLoc } from '@angular-eslint/template-parser/dist/convert-source-span-to-loc';
import { TimePoint } from '../model/createEvent-view.model';

@Component({
	selector: 'frontend-createevent',
	standalone: true,
	imports: [
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
	],
	templateUrl: './createevent.component.html',
	styleUrls: ['./createevent.component.css'],
	providers: [provideNativeDateAdapter(), DatePipe],
	schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class CreateEventComponent {
	@Output() create = new EventEmitter<any>();

	createForm: FormGroup = this.fb.group({
		title: ['title', [Validators.required, Validators.minLength(3)]],
		description: ['description', [Validators.maxLength(500)]],
		street: ['street', [Validators.required]],
		city: ['city', [Validators.required]],
		postalCode: [
			'1120',
			[Validators.required, Validators.pattern(/^[0-9]{4,}$/)],
		], // Beispiel für Postleitzahlen mit mindestens 4 Ziffern
		country: ['country', [Validators.required]],
		deadlineDate: ['2024-05-08', [Validators.required]],
		deadlineTime: ['14:00', [Validators.required]],
		timePoints: this.fb.array([]),
		invitations: this.fb.array([]),
	});

	addTimePoint(): void {
		const timePointForm = this.fb.group({
			date: ['2020-05-18', Validators.required],
			time: ['18:00', Validators.required],
			vote: [''], // optional, initial leer
		});
		this.timePoints.push(timePointForm);
	}

	constructor(
		private fb: FormBuilder,
		private createService: EventHttpService,
		private datePipe: DatePipe
	) {}

	get timePoints(): FormArray {
		return this.createForm.get('timePoints') as FormArray;
	}

	get invitations(): FormArray {
		return this.createForm.get('invitations') as FormArray;
	}

	addInvitation(): void {
		const group = this.fb.group({
			email: ['edren@home.at', [Validators.required, Validators.email]],
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
			const formattedData = this.formatEventData(this.createForm.value);
			console.log('Formatted Data to be sent:', formattedData);
			this.createService.createEvent(formattedData).subscribe(
				(response) => {
					console.log('Event successfully created:', response);
					this.create.emit(response); // Emit event creation success
				},
				(error) => console.error('Failed to create event:', error)
			);
		} else {
			console.log('Form is not valid:', this.createForm.errors);
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
			), // Assuming time is in HH:mm format and Z is added for UTC
			invitationEmails: formData.invitations.map((inv: any) => inv.email),
			deadlineDate: this.datePipe.transform(
				formData.deadlineDate,
				'yyyy-MM-dd'
			),
			deadlineTime: formData.deadlineTime,
		};
	}
}
