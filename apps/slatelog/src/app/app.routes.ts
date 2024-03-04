import {Route} from '@angular/router';
import { featureAuthRoutes } from '@frontend/feat/auth';
import { AuthGuard } from '../../../../libs/slatelog/data/auth/src/lib/service/auth.guard';




export const appRoutes: Route[] = [
  // DEFAULT ROUTE
   { path: '', pathMatch: 'full', redirectTo: 'timeline', },
 // {path: '', pathMatch:'full', redirectTo: 'auth/login'},

  // child routes are a concern of the library and not the app route
  { path: 'auth', children: featureAuthRoutes },

  {path:'', loadChildren:()=> import('@frontend/feat/main')
      .then(m => m.FeatMainModule),
  canActivate:[AuthGuard]
  },
  { path: '**', redirectTo: '/auth/login' },
  // { path: '**', component: NotFoundComponent },
];
