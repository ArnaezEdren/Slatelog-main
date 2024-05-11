import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'frontend-sidebar',
	standalone: true,
	imports: [CommonModule, MatIcon, RouterLink],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
