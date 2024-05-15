import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
	LoginContainerComponent,
	RegisterContainerComponent,
} from '@frontend/feat/auth';
import { AppComponent } from './app.component';
import { BasicAuthInterceptor, ErrorInterceptor } from '@frontend/data/auth';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ConfirmDialogComponent } from '../../../../libs/slatelog/feat/dialogconfirm/dialogconfirm.component';
import { CreateEventComponent } from '@frontend/createevent';

@NgModule({
	declarations: [AppComponent, ConfirmDialogComponent],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		RegisterContainerComponent,
		LoginContainerComponent,
		MatDialogModule,
		MatButtonModule,
		RouterModule.forRoot(appRoutes, { useHash: false }),
		CreateEventComponent,

		//Was set to true
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: BasicAuthInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
// router=inject(Router);
// route = inject(ActivatedRoute);

// constructor() {
// this.router.events.subscribe((event) => {
//   if (event instanceof NavigationStart) {
//     console.log('NavigationStart event:', event);
//   } else if (event instanceof RoutesRecognized) {
//     console.log('RoutesRecognized event:', event);
//   } else if (event instanceof RouteConfigLoadStart) {
//     console.log('RouteConfigLoadStart event:', event);
//   } else if (event instanceof RouteConfigLoadEnd) {
//     console.log('RouteConfigLoadEnd event:', event);
//   } else if (event instanceof NavigationEnd) {
//     console.log('NavigationEnd event:', event);
//   } else if (event instanceof NavigationCancel) {
//     console.log('NavigationCancel event:', event);
//   } else if (event instanceof NavigationError) {
//     console.log('NavigationError event:', event);
//   } else if (event instanceof ChildActivationStart) {
//     console.log('ChildActivationStart event:', event);
//   } else if (event instanceof ChildActivationEnd) {
//     console.log('ChildActivationEnd event:', event);
//   }
// });
// 1. ------ NavigateByUrl ------
// Absolute Path Route as a string
// this.router.navigateByUrl('/products/123');
// 2. ------ Navigate ------
// Absolute Path Route as an array of url segments
// Navigates to '/products'
// const productId = 123;
// this.router.navigate(['/products', productId]);
// 3. ------ Navigate ------
// To Relative Sibling Route as an array of url segments
// Navigate to a sibling route
// this.router.navigate(['../sibling'], { relativeTo: this.route });
// 4. ------ Navigate ------
// To Child Route as an array of url segments
// this.router.navigate(['./child'], { relativeTo: this.route });
