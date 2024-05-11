import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from './main-shell.component';
import { RouterModule } from '@angular/router';
import { featureMainRoutes } from './lib.routes';
import { MainshellContainerComponent } from './mainshell-container.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(featureMainRoutes),
		MainshellContainerComponent,
	],

	declarations: [MainShellComponent],

	exports: [MainShellComponent],
})
export class FeatMainModule {}
