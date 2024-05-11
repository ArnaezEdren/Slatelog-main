import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { VotingComponent } from './voting/voting.component'; // Ensure this is imported

@NgModule({
	declarations: [
		AppComponent,
		// other components
	],
	imports: [
		BrowserModule,
		HttpClientModule, // This should be listed in imports
		AppRoutingModule,
		VotingComponent,
		// Make sure your routing is set up correctly
		// other modules
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
