import { __decorate } from 'tslib';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
let SidebarComponent = class SidebarComponent {
	constructor() {
		this.RouterLink = RouterLink;
	}
};
SidebarComponent = __decorate(
	[
		Component({
			selector: 'frontend-sidebar',
			standalone: true,
			imports: [CommonModule, MatIcon, RouterLink],
			templateUrl: './sidebar.component.html',
			styleUrl: './sidebar.component.css',
		}),
	],
	SidebarComponent
);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map
