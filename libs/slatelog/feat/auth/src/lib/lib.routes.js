import { LoginContainerComponent } from './login/login-container.component';
import { RegisterContainerComponent } from './register/register-container.component';
export const featureAuthRoutes = [
	{ path: '', pathMatch: 'prefix', redirectTo: 'login' },
	// static route
	{ path: 'login', component: LoginContainerComponent },
	// static route
	{ path: 'register', component: RegisterContainerComponent },
	// catch all route
	// { path: '**', redirectTo: 'login' }
];
//# sourceMappingURL=lib.routes.js.map
