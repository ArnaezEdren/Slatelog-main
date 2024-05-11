import { __decorate } from 'tslib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from './main-shell.component';
import { RouterModule } from '@angular/router';
import { featureMainRoutes } from './lib.routes';
import { MainshellContainterComponent } from './mainshell-containter.component';
let FeatMainModule = class FeatMainModule {};
FeatMainModule = __decorate(
	[
		NgModule({
			imports: [
				CommonModule,
				RouterModule.forChild(featureMainRoutes),
				MainshellContainterComponent,
			],
			declarations: [MainShellComponent],
			exports: [MainShellComponent],
		}),
	],
	FeatMainModule
);
export { FeatMainModule };
//# sourceMappingURL=slatelog-feat-main.module.js.map
