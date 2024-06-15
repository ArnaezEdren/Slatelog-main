import { Route } from '@angular/router';
import { LoginContainerComponent } from './login/login-container.component';
import { RegisterContainerComponent } from './register/register-container.component';
import { ForgotPasswordComponent } from './forgotten-data/forgot-password/forgotten-password.component';
import { ForgotUsernameComponent } from './forgotten-data/forgot-username/forgotten-username.component';

export const featureAuthRoutes: Route[] = [
	{ path: '', pathMatch: 'prefix', redirectTo: 'login' },

	// static route
	{ path: 'login', component: LoginContainerComponent },

	// static route
	{ path: 'register', component: RegisterContainerComponent },

	{ path: 'forgot-username', component: ForgotUsernameComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },

	// catch all route
	// { path: '**', redirectTo: 'login' }
];
