import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VotingComponent } from './voting/voting.component'; // Ensure this import is correct

@NgModule({
	declarations: [
		AppComponent, // Declare AppComponent here
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot([]),
		VotingComponent,
		// Example routing setup
	],
	providers: [],
	bootstrap: [AppComponent], // Bootstrap AppComponent here
})
export class AppModule {}
