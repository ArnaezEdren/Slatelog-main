import { __decorate } from 'tslib';
import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
let ToolbarComponent = class ToolbarComponent {};
ToolbarComponent = __decorate(
	[
		Component({
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
			],
			templateUrl: './toolbar.component.html',
			styleUrl: './toolbar.component.css',
		}),
	],
	ToolbarComponent
);
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map
