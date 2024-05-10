// Path: apps/EventVoting/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { EventVoteComponent } from '../libs/event-vote/event-vote.component'; // Adjust path as necessary

export const appRoutes: Routes = [
	{ path: 'event-vote', component: EventVoteComponent },
	// other routes...
];
