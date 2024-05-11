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
	event: any;
	votes: any[] = [];
	pollGroupName = 'pollGroup';
	eventId!: string;
	emailToken!: string;

	constructor(
		private pollService: PollService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.eventId = params['eventId'];
			this.emailToken = params['emailToken'];
			if (this.eventId && this.emailToken) {
				this.loadEvent(this.eventId, this.emailToken);
			} else {
				console.error('Required parameters are missing or invalid');
			}
		});
	}

	loadEvent(eventId: string, emailToken: string) {
		this.pollService.getPollEvent(eventId, emailToken).subscribe({
			next: (data) => {
				this.event = data;
				this.votes = new Array(data.pollOptions.length).fill(null); // Assuming pollOptions is an array
			},
			error: (error) => console.error('Failed to load event', error),
		});
	}

	updateVotes() {
		if (this.votes.some((vote) => vote != null)) {
			this.pollService
				.updateEventVoting(this.event.id, this.event.emailToken, this.votes)
				.subscribe({
					next: () => console.log('Votes updated successfully!'),
					error: (error) => console.error('Failed to update votes', error),
				});
		} else {
			console.log('No option selected.');
		}
	}

	submitVotes() {
		this.updateVotes();
	}
}
