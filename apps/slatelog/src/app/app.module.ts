import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginContainerComponent} from '@frontend/auth';
import { BasicAuthInterceptor, ErrorInterceptor } from '../../../../libs/slatelog/data/auth/src';
import { AppComponent } from './app.component';
import {
  RegisterContainerComponent
} from '../../../../libs/slatelog/feat/auth/src/lib/register/regiter-container.component';


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
