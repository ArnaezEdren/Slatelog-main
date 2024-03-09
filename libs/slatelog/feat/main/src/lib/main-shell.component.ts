import { Component } from '@angular/core';

@Component({
	selector: 'frontend-main-shell',

	template: `
		<main-shell-containter></main-shell-containter>
		<router-outlet></router-outlet>
	`,

	styles: [],
})
export class MainShellComponent {}
