import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {
	MatDrawer,
	MatDrawerContainer,
	MatSidenavContainer,
} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'main-shell',
	standalone: true,
	imports: [
		MatToolbar,
		MatIcon,
		MatDrawerContainer,
		MatSidenavContainer,
		MatButtonModule,
		MatDrawer,
	],
	templateUrl: 'mainshell.component.html',
	styleUrl: 'mainshell.component.css',
})
export class MainShellComponent1 {}
