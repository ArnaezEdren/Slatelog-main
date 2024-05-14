import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
	selector: 'frontend-sidebar',
	standalone: true,
	imports: [CommonModule, MatIcon, RouterLink],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
	activeRoute: string = '';
	protected readonly RouterLink = RouterLink;

	constructor(private router: Router) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.activeRoute = event.url;
			}
		});
	}
}
