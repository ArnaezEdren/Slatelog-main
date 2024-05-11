import { Component } from '@angular/core';

@Component({
	selector: 'frontend-main-shell',

	template: `
		<main-shell-container></main-shell-container>
		<router-outlet></router-outlet>
	`,

	styles: [],
})
export class MainShellComponent {}
