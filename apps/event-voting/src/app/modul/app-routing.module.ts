// In app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotingComponent } from '../voting/voting.component';

const routes: Routes = [
	{ path: 'voting', component: VotingComponent },
	{ path: '', redirectTo: '/voting', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
