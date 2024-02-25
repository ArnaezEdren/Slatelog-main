import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginContainerComponent, RegisterContainerComponent } from '@frontend/auth';
import { AppComponent } from './app.component';
import { BasicAuthInterceptor, ErrorInterceptor } from '@frontend/data/auth';
import {
  ActivatedRoute,
  ChildActivationEnd,
  ChildActivationStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterModule,
  RoutesRecognized,
} from '@angular/router';
import { appRoutes } from './app.routes';


// A module is a container for components, directives, pipes, and services
// All of our components, directives, pipes, and services must be declared in a module
@NgModule({
  declarations: [AppComponent],
  imports: [
    // Needed for HttpClient
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
RegisterContainerComponent,
   LoginContainerComponent,
    RouterModule.forRoot(appRoutes),
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
export class AppModule {
  router=inject(Router);
  route = inject(ActivatedRoute);


  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart event:', event);
      } else if (event instanceof RoutesRecognized) {
        console.log('RoutesRecognized event:', event);
      } else if (event instanceof RouteConfigLoadStart) {
        console.log('RouteConfigLoadStart event:', event);
      } else if (event instanceof RouteConfigLoadEnd) {
        console.log('RouteConfigLoadEnd event:', event);
      } else if (event instanceof NavigationEnd) {
        console.log('NavigationEnd event:', event);
      } else if (event instanceof NavigationCancel) {
        console.log('NavigationCancel event:', event);
      } else if (event instanceof NavigationError) {
        console.log('NavigationError event:', event);
      } else if (event instanceof ChildActivationStart) {
        console.log('ChildActivationStart event:', event);
      } else if (event instanceof ChildActivationEnd) {
        console.log('ChildActivationEnd event:', event);
      }
    });


  }
}
