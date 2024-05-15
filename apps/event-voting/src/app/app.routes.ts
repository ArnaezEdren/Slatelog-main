import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { VotingComponent } from '../../../../libs/event-overviewing/feat/voting/voting.component';

const routes: Routes = [
	{ path: 'voting/:eventId/:emailToken', component: VotingComponent },

	// { path: '', redirectTo: '/voting-overview', pathMatch: 'full' },
	// { path: '**', redirectTo: '/voting-overview' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
