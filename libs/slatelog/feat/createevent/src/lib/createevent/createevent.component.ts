import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { EventHttpService } from '../service/createevent-http.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { catchError, retry, Subscription, throwError } from 'rxjs';
import { convertElementSourceSpanToLoc } from '@angular-eslint/template-parser/dist/convert-source-span-to-loc';

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
	providers: [provideNativeDateAdapter()],
	schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class CreateEventComponent {
	@Output() create = new EventEmitter<any>();

	createForm: FormGroup = this.fb.group({
		title: ['title', [Validators.required, Validators.minLength(3)]],
		description: ['descrition', [Validators.maxLength(500)]],
		location: this.fb.group({
			street: ['street', [Validators.required]],
			city: ['city', [Validators.required]],
			postalCode: [
				'1120',
				[Validators.required, Validators.pattern(/^[0-9]{4,}$/)],
			], // Beispiel für Postleitzahlen mit mindestens 4 Ziffern
			country: ['country', [Validators.required]],
		}),
		poll: this.fb.group({
			timePoints: this.fb.array([], Validators.minLength(1)),
			options: this.fb.array([], Validators.minLength(1)),
		}),
		invitations: this.fb.array([]),
	});

	constructor(
		private fb: FormBuilder,
		private createService: EventHttpService
	) {}

	get timePoints(): FormArray {
		return this.createForm.get('poll.timePoints') as FormArray;
	}

	get invitations(): FormArray {
		return this.createForm.get('invitations') as FormArray;
	}

	addTimePoint(): void {
		this.timePoints.push(
			this.fb.group({
				date: ['', Validators.required],
				time: ['', Validators.required],
			})
		);
	}

	addInvitation(): void {
		this.invitations.push(
			this.fb.group({
				email: ['', [Validators.required, Validators.email]],
			})
		);
	}

	removeTimePoint(index: number): void {
		this.timePoints.removeAt(index);
	}

	removeInvitation(index: number): void {
		this.invitations.removeAt(index);
	}

	onSubmit(): void {
		if (this.createForm.valid) {
			console.log('Form data being submitted:', this.createForm.value);
			this.createService.createEvent(this.createForm.value).subscribe({
				next: (response) => {
					console.log('Event created successfully', response);
					this.create.emit(response);
				},
				error: (error) => {
					console.error('Error creating event', error);
				},
			});
		} else {
			console.error('Form is not valid');
		}
	}
}
