import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from './main-shell.component';
import { RouterModule } from '@angular/router';
import { featureMainRoutes } from './lib.routes';
import { MainShellContainerComponent } from './mainshell-container.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(featureMainRoutes),
		MainShellContainerComponent,
	],

	declarations: [MainShellComponent],

	exports: [MainShellComponent],
})
export class FeatMainModule {}
