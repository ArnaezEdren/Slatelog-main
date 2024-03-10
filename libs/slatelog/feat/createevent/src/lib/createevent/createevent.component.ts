import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	ErrorStateMatcher,
	provideNativeDateAdapter,
} from '@angular/material/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	FormGroupDirective,
	NgForm,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {
	MatChip,
	MatChipInput,
	MatChipInputEvent,
} from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
	selector: 'frontend-createevent',
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,
		MatFormField,
		MatSelect,
		MatOption,
		MatFormFieldModule,
		MatSelect,
		MatSelectModule,
		MatInputModule,
		MatLabel,
		MatCard,
		MatDatepickerModule,
		MatChip,
		MatIcon,
		MatChipInput,
		MatChip,
		ReactiveFormsModule,
		MatButton,
	],
	templateUrl: './createevent.component.html',
	styleUrl: './createevent.component.css',
	providers: [provideNativeDateAdapter()],
})
export class CreateEventComponent implements OnInit {
	emailForm: FormGroup = {} as FormGroup;

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.emailForm = this.fb.group({
			emails: this.fb.array([
				this.fb.control('', [Validators.required, Validators.email]),
			]),
		});
	}

	getEmailControls(): FormArray {
		return this.emailForm.get('emails') as FormArray;
	}

	addEmail() {
		this.getEmailControls().push(
			this.fb.control('', [Validators.required, Validators.email])
		);
	}

	removeEmail(index: number) {
		this.getEmailControls().removeAt(index);
	}
}
