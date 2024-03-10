import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {
	MatDatepicker,
	MatDatepickerModule,
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
	FormBuilder,
	FormArray,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

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
})
export class CreateEventComponent implements OnInit {
	emailForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.emailForm = this.fb.group({
			emails: this.fb.array([
				this.fb.control('', [Validators.required, Validators.email]),
			]),
			dateTimes: this.fb.array([this.createDateTimeGroup()]),
		});
	}

	separatorKeysCodes: number[] = [ENTER, COMMA]; // ENTER und COMMA müssen definiert sein, z.B. aus @angular/cdk/keycodes

	ngOnInit() {}

	getEmailControls(): FormArray {
		return this.emailForm.get('emails') as FormArray;
	}

	getDateTimes(): FormArray {
		return this.emailForm.get('dateTimes') as FormArray;
	}

	createDateTimeGroup(): FormGroup {
		return this.fb.group({
			date: ['', Validators.required],
			time: ['', Validators.required],
		});
	}

	addEmail(): void {
		this.getEmailControls().push(
			this.fb.control('', [Validators.required, Validators.email])
		);
	}

	removeEmail(index: number): void {
		this.getEmailControls().removeAt(index);
	}

	addDateTimeField(): void {
		this.getDateTimes().push(this.createDateTimeGroup());
	}

	removeDateTimeField(index: number): void {
		this.getDateTimes().removeAt(index);
	}

	openDatePicker(picker: MatDatepicker<Date>): void {
		picker.open();
	}
}
