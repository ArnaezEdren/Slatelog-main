import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { VotingComponent } from '../../../../libs/event-overviewing/feat/scr/voting/voting.component';
// eslint-disable-next-line @nx/enforce-module-boundaries

const routes: Routes = [
	{ path: 'voting/:eventId/:emailToken', component: VotingComponent },

	{ path: '', redirectTo: '/voting', pathMatch: 'full' },
	{ path: '**', redirectTo: '/voting' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
