import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../../auth/src/lib/login/login.component';
import { MainShellComponent1 } from './mainshell.component';

@Component({
	selector: 'main-shell-containter',
	standalone: true,
	imports: [CommonModule, MainShellComponent1, LoginComponent],
	template: `<main-shell></main-shell>`,
	styles: [],
})
export class MainshellContainterComponent {}
