import { Route } from '@angular/router';
import { featureAuthRoutes } from '@frontend/feat/auth';
import { AuthGuard } from '@frontend/data/auth';

export const appRoutes: Route[] = [
	{ path: '', pathMatch: 'full', redirectTo: 'timeline' },

	{ path: 'auth', children: featureAuthRoutes },

	{
		path: '',
		loadChildren: () =>
			import('@frontend/feat/main').then((m) => m.FeatMainModule),
		canActivate: [AuthGuard],
	},
	{ path: '**', redirectTo: '/auth/login' },
	// { path: '**', component: NotFoundComponent },
];
