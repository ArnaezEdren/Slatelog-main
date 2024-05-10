import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EventVoteModule } from '../libs/event-vote/event-vote.module'; // Adjust path as necessary
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		EventVoteModule, // Include the EventVoteModule here
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
