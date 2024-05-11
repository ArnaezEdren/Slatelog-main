import { MainShellComponent } from './main-shell.component';
import { TimelineContainerComponent } from '../../../timeline/src';
import { CreateEventContainerComponent } from '../../../createevent/src';
export const featureMainRoutes = [
	{
		path: '',
		component: MainShellComponent,
		children: [
			{ path: '', redirectTo: 'timeline', pathMatch: 'full' }, // Default-Routing zur 'timeline'
			{ path: 'timeline', component: TimelineContainerComponent },
			{ path: 'createevent', component: CreateEventContainerComponent },
			{ path: '**', redirectTo: 'timeline' },
		],
	},
];
//# sourceMappingURL=lib.routes.js.map
