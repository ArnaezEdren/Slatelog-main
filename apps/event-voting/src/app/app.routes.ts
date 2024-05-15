import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { VotingComponent } from '../../../../libs/event-overviewing/feat/scr/voting/voting.component';
// eslint-disable-next-line @nx/enforce-module-boundaries

const routes: Routes = [
	{ path: 'voting/token', component: VotingComponent },
	{ path: '', redirectTo: '/voting/token', pathMatch: 'full' },
	{ path: '**', redirectTo: '/voting/token' }, // Ensure this redirects to the correct route
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
