import { __decorate } from 'tslib';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../../auth/src/lib/login/login.component';
import { MainShellComponent1 } from './mainshell.component';
let MainshellContainerComponent = class MainshellContainterComponent {};
MainshellContainterComponent = __decorate(
	[
		Component({
			selector: 'main-shell-containter',
			standalone: true,
			imports: [CommonModule, MainShellComponent1, LoginComponent],
			template: `<main-shell></main-shell>`,
			styles: [],
		}),
	],
	MainshellContainterComponent
);
export { MainshellContainterComponent };
//# sourceMappingURL=mainshell-containter.component.js.map
