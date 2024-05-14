import { __decorate } from 'tslib';
import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {
	MatDrawer,
	MatDrawerContainer,
	MatSidenavContainer,
} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormField, MatInput, MatSuffix } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NgOptimizedImage } from '@angular/common';
let MainShellComponent1 = class MainShellComponent1 {
	constructor() {
		this.RouterLink = RouterLink;
	}
};
MainShellComponent1 = __decorate(
	[
		Component({
			selector: 'main-shell',
			standalone: true,
			imports: [
				MatToolbar,
				MatIcon,
				MatDrawerContainer,
				MatSidenavContainer,
				MatButtonModule,
				MatDrawer,
				RouterLink,
				MatInput,
				MatMenu,
				NgOptimizedImage,
				MatMenuItem,
				MatFormField,
				MatSuffix,
				MatMenuTrigger,
			],
			templateUrl: 'mainshell.component.html',
			styleUrl: 'mainshell.component.css',
		}),
	],
	MainShellComponent1
);
export { MainShellComponent1 };
//# sourceMappingURL=mainshell.component.js.map
