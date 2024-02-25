import {Route} from '@angular/router';
import { featureAuthRoutes } from '../../../../libs/slatelog/feat/auth/src/lib/lib.routes';


export const appRoutes: Route[] = [
  // DEFAULT ROUTE
  // { path: '', pathMatch: 'full', redirectTo: 'timeline', },
  {path: '', pathMatch:'full', redirectTo: 'auth/login'},


  // static route, prefix matching is not relevant
  // { path: 'products', component: ProductListContainerComponent },

  // dynamic route, prefix matching important
  // { path: 'products/detail/:id', component: ProductDetailContainerComponent },

  // dynamic route, prefix matching important
  // AUTH ROUTES with CHILDREN
  // { path: 'auth', children: [
  //   { path: 'login', component: LoginContainerComponent },
  //   { path: 'register', component: RegisterContainerComponent }
  // ] },

  // child routes are a concern of the library and not the app route
  { path: 'auth', children: featureAuthRoutes },

  // CATCH ALL ROUTE
  { path: '**', redirectTo: '/auth/login' },
  // { path: '**', component: NotFoundComponent },
];
