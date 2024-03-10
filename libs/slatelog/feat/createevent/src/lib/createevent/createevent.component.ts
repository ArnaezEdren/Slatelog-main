import { Component } from '@angular/core';
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
import { provideNativeDateAdapter } from '@angular/material/core';

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
	],
	templateUrl: './createevent.component.html',
	styleUrl: './createevent.component.css',
	providers: [provideNativeDateAdapter()],
})
export class CreateeventComponent {}
