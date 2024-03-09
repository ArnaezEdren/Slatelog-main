import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from './main-shell.component';
import { RouterModule } from '@angular/router';
import { featureMainRoutes } from './lib.routes';
import { MainshellContainterComponent } from './mainshell-containter.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(featureMainRoutes),
		MainshellContainterComponent,
	],
	declarations: [MainShellComponent],

	exports: [MainShellComponent],
})
export class FeatMainModule {}
