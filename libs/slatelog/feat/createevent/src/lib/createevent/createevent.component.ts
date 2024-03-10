import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'frontend-createevent',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: './createevent.component.html',
	styleUrl: './createevent.component.css',
})
export class CreateeventComponent {}
