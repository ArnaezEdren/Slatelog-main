import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotingComponent } from './voting/voting.component';

const routes: Routes = [
	{ path: 'path-to-component', component: VotingComponent },
	{ path: 'voting', component: VotingComponent },
	{ path: '', redirectTo: '/voting', pathMatch: 'full' },
	{ path: '**', redirectTo: '/voting' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
