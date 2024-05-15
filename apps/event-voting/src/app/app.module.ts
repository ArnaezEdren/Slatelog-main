import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { VotingComponent } from '../../../../libs/event-overviewing/feat/voting/voting.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { VotingOverviewComponent } from '../../../../libs/event-overviewing/feat/voting-overview/voting-overview.component';

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
		VotingOverviewComponent,
		// Make sure your routing is set up correctly
		// other modules
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
