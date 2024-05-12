import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../service/voting-http-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PollOptionResult, VoteCount } from '../model/voting-model';
import { TranslateAnswerPipe } from '../model/answer.component';
import { Commands } from '../model/commands';

@Component({
	selector: 'frontend-app-voting',
	templateUrl: './voting.component.html',
	styleUrls: ['./voting.component.css'],
	standalone: true,
	imports: [CommonModule, FormsModule, HttpClientModule, TranslateAnswerPipe],
})
export class VotingComponent implements OnInit {
	event: any = {};
	eventId!: string;
	emailToken!: string;
	pollResults: PollOptionResult[] = [];

	constructor(
		private pollService: PollService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.eventId = params['eventId'];
			this.emailToken = params['emailToken'];
			console.log(this.eventId, this.emailToken);
			if (this.eventId && this.emailToken) {
				this.loadEvent(this.eventId, this.emailToken);
			} else {
				console.error('Required parameters are missing or invalid');
			}
		});
	}

	private loadEvent(eventId: string, emailToken: string): void {
		this.pollService.getPollEvent(eventId, emailToken).subscribe({
			next: (event) => {
				this.event = event;
				if (event.poll && event.poll.pollOptions) {
					this.processPollOptions(event.poll.pollOptions);
				}
			},
			error: (err) => console.error('Failed to load event:', err),
		});
	}

	private processPollOptions(pollOptions: any): void {
		Object.keys(pollOptions).forEach((originalKey) => {
			const key = originalKey.replace('T', ' ').replace('Z', '');
			const votes = pollOptions[originalKey];
			const voteCounts: VoteCount = { yes: 0, no: 0, maybe: 0 };

			votes.forEach((vote: any) => {
				if (vote.voteOption === 'Yes') voteCounts.yes++;
				else if (vote.voteOption === 'No') voteCounts.no++;
				else if (vote.voteOption === 'Maybe') voteCounts.maybe++;
			});

			this.pollResults.push({ key: key, counts: voteCounts });
		});
	}

	submitVotes() {
		if (!this.emailToken || !this.eventId) {
			console.error('Authorization token or event ID missing');
			return;
		}

		// Function to remove milliseconds if they are zero
		const formatInstant = (date: Date) => {
			const isoString = date.toISOString();
			return isoString.replace(/\.\d{3}/, ''); // Removes milliseconds if they are .000
		};

		// Create a structure that matches the backend's expected format
		const votes: { [key: string]: string }[] = this.pollResults
			.filter((result) => result.selectedVote !== undefined)
			.map((result) => {
				const vote: { [key: string]: string } = {}; // Properly typed now
				vote[formatInstant(new Date(result.key))] =
					result.selectedVote as string;
				return vote;
			});

		const command: Commands.UpdateEventVoting = {
			votes: votes,
		};

		this.pollService
			.updateEventVoting(this.event.id, this.emailToken, command)
			.subscribe({
				next: () => console.log('Vote updated successfully!'),
				error: (err) => console.error('Error updating vote:', err),
			});
	}
}
