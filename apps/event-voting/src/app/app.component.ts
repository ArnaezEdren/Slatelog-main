import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { VotingComponent } from './voting/voting.component';

@Component({
	standalone: true,
	imports: [NxWelcomeComponent, RouterModule, VotingComponent],
	selector: 'frontend-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'event-voting';
}
