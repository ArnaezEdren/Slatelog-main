import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../service/voting-http-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'frontend-app-voting',
	templateUrl: './voting.component.html',
	styleUrls: ['./voting.component.css'],
	standalone: true,
	imports: [CommonModule, FormsModule, HttpClientModule],
})
export class VotingComponent implements OnInit {
	event: any; // Assuming 'any' type, adjust based on your actual data model
	votes: any[] = []; // Placeholder for votes binding
	pollGroupName = 'pollGroup';

	constructor(
		private pollService: PollService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			const eventId = params['eventId'];
			const emailToken = params['emailToken'];

			// Überprüfen Sie, ob beide Parameter vorhanden sind
			if (!eventId || !emailToken) {
				console.error(
					'Required parameters are missing: eventId and emailToken are required.'
				);
				// Hier können Sie weitere Maßnahmen ergreifen, z. B. eine Fehlermeldung anzeigen oder zur Startseite umleiten
			} else {
				this.loadEvent(eventId, emailToken);
			}
		});
	}

	loadEvent(eventId: string, emailToken: string) {
		this.pollService.getPollEvent(eventId, emailToken).subscribe({
			next: (data) => {
				this.event = data;
				this.votes = new Array(data.pollOptions.length).fill(null);
			},
			error: (error) => {
				console.error('Failed to load event', error);
				this.event = undefined; // Make sure to handle this case in your template
			},
		});
	}

	updateVotes() {
		const eventId = this.event.id; // Ensure you have event ID
		const emailToken = this.event.emailToken; // Assuming token is part of the event data

		this.pollService
			.updateEventVoting(eventId, emailToken, this.votes)
			.subscribe({
				next: () => console.log('Votes updated successfully!'),
				error: (error) => console.error('Failed to update votes', error),
			});
	}

	submitVotes() {
		if (this.votes.some((vote) => vote != null)) {
			this.updateVotes();
		} else {
			console.log('No option selected.');
		}
	}
}
