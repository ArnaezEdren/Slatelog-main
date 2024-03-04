import { Component } from '@angular/core';


@Component({
	selector: 'frontend-main-shell',

  template: `
    <p>main-shell works!</p>
    <router-outlet></router-outlet>
  `,
	styles:[],
})
export class MainShellComponent {}
