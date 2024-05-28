import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../../auth/src/lib/login/login.component';

import { RouterOutlet } from '@angular/router';
import { TimelineOverviewComponent } from '../../../timeline/src/lib/timeline-overview/timeline-overview.component';
import { MainShellComponent1 } from './mainshell.component';
import { SidebarComponent, ToolbarComponent } from '../../../../ui/src';

@Component({
	selector: 'main-shell-container',
	standalone: true,
	imports: [
		CommonModule,
		MainShellComponent1,
		LoginComponent,
		RouterOutlet,
		SidebarComponent,
		ToolbarComponent,
		TimelineOverviewComponent,
	],
	template: `
		<main-shell></main-shell>
		<frontend-toolbar></frontend-toolbar>
		<frontend-sidebar></frontend-sidebar>
	`,
	styles: `
    .container {
    width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  `,
})
export class MainShellContainerComponent {}
