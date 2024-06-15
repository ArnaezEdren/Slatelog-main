import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BasicAuthService } from '../../../../data/auth/src';

@Component({
	selector: 'frontend-toolbar',
	standalone: true,
	imports: [
		CommonModule,
		MatIcon,
		MatIconButton,
		MatMenu,
		MatMenuItem,
		MatToolbar,
		NgOptimizedImage,
		RouterLink,
		MatMenuTrigger,
		AvatarModule,
	],
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
	constructor(
		private basicAuthService: BasicAuthService,
		private router: Router
	) {}

	logout() {
		this.basicAuthService.logout();
	}
}
