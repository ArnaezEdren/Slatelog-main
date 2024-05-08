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
export class CreateEventComponent implements OnInit {
	@Output() create = new EventEmitter<any>();
	createForm: FormGroup;
	private subscription: Subscription | null = null;

	constructor(
		private fb: FormBuilder,
		private createService: EventHttpService
	) {
		this.createForm = this.fb.group({
			title: [''],
			description: [''],
			poll: this.fb.group({
				timePoints: this.fb.array([]),
				options: this.fb.array([]),
			}),
			location: this.fb.group({
				street: [''],
				city: [''],
				postalCode: [''],
				country: [''],
			}),
			invitations: this.fb.array([this.createInvitationGroup()]),
		});
	}

	ngOnInit() {}

	get invitations(): FormArray {
		return this.createForm.get('invitations') as FormArray;
	}

	createInvitationGroup(): FormGroup {
		return this.fb.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	get timePoints(): FormArray {
		return this.createForm.get('poll.timePoints') as FormArray;
	}

	removeTimePoint(index: number): void {
		this.timePoints.removeAt(index);
	}

	removeInvitation(index: number): void {
		this.invitations.removeAt(index);
	}

	addTimePoint(): void {
		this.timePoints.push(this.createDateTimeGroup());
	}

	// TypeScript-Komponente

	addInvitation(): void {
		this.invitations.push(this.createInvitationGroup());
	}

	createDateTimeGroup(): FormGroup {
		return this.fb.group({
			date: ['', Validators.required],
			time: ['', Validators.required],
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	onSubmit(): void {
		if (this.createForm.valid) {
			this.createService
				.createEvent(this.createForm.value)
				.pipe(
					retry(3), // Versuchen Sie es bis zu dreimal
					catchError((error) => {
						console.error('An error occurred:', error);
						return throwError(() => new Error('Failed to create event.'));
					})
				)
				.subscribe({
					next: (response) => {
						console.log('Event created successfully', response);
						// Weitere Aktionen nach erfolgreichem Erstellen, z.B. Navigation oder Anzeigen einer Erfolgsmeldung
					},
					error: (error) => {
						console.error('Error creating event', error);
						// Hier können Sie Fehlerbehandlung durchführen, z.B. Anzeigen einer Fehlermeldung im UI
					},
				});
		} else {
			// Optionale Validierungsfehler-Handling hier
			console.error('Form is not valid');
		}
	}
}
