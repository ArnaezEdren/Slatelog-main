import { Route } from '@angular/router';
import { MainShellComponent } from './main-shell.component';
import { TimelineContainerComponent } from '../../../timeline/src';
import { CreateEventContainerComponent } from '../../../createevent/src';
import { EventDetailsContainerComponent } from '../../../timeline/src';

export const featureMainRoutes: Route[] = [
	{
		path: '',
		component: MainShellComponent,
		children: [
			{ path: '', redirectTo: 'timeline', pathMatch: 'full' }, // Default-Routing zur 'timeline'
			{ path: 'timeline', component: TimelineContainerComponent },
			{ path: 'createevent', component: CreateEventContainerComponent },
			{ path: 'event/:eventId', component: EventDetailsContainerComponent },
			{ path: '**', redirectTo: 'timeline' },
		],
	},
];
