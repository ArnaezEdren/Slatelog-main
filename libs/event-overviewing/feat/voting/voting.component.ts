import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateAnswerPipe } from '../../data/model/answer.component';
import {
	PollOptionResult,
	VoteCount,
	VoteDetail,
} from '../../data/model/voting-model';
import { PollService } from '../../data/service/voting-http-service';
import { Commands } from '../../data/model/commands';

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
	isLoading = false;
	feedbackMessage = '';
	votesDetail: VoteDetail[] = [];

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
					this.loadVotesDetail(eventId, emailToken); // Load votes details
				}
			},
			error: (err) => console.error('Failed to load event:', err),
		});
	}

	private loadVotesDetail(eventId: string, emailToken: string): void {
		this.pollService.getPollEvent(eventId, emailToken).subscribe({
			next: (event) => {
				console.log('Event received:', event);
				if (event.poll && event.poll.pollOptions) {
					const pollOptions = event.poll.pollOptions;
					const transformedVotes: VoteDetail[] = [];

					// Iterate over each key in pollOptions object
					Object.keys(pollOptions).forEach((key) => {
						// Each key is a date, and its value is an array of vote details
						pollOptions[key].forEach(
							(voteDetail: { voterEmail: any; voteOption: any }) => {
								transformedVotes.push({
									votedAt: key, // The key is the votedAt date
									voterEmail: voteDetail.voterEmail,
									voteOption: voteDetail.voteOption,
								});
							}
						);
					});

					this.votesDetail = transformedVotes;
					console.log('Transformed Votes:', this.votesDetail);
				} else {
					console.error(
						'Poll options not found or invalid structure:',
						event.poll.pollOptions
					);
				}
			},
			error: (err) => console.error('Failed to load event data:', err),
		});
	}

	private processPollOptions(pollOptions: any): void {
		Object.keys(pollOptions).forEach((originalKey) => {
			const key = originalKey; //.replace('T', ' ').replace('Z', '');
			const votes = pollOptions[originalKey];
			const voteCounts: VoteCount = { yes: 0, no: 0, maybe: 0 };

			votes.forEach((vote: any) => {
				if (vote.voteOption === 'Yes') voteCounts.yes++;
				else if (vote.voteOption === 'No') voteCounts.no++;
				else if (vote.voteOption === 'Maybe') voteCounts.maybe++;
			});

			this.pollResults.push({ key: key, counts: voteCounts }); // Assign lastVote to selectedVote
		});
	}

	submitVotes(): void {
		if (!this.emailToken || !this.eventId) {
			console.error('Authorization token or event ID missing');
			return;
		}

		const votes: Array<{ [key: string]: string }> = this.pollResults
			.filter((result) => result.selectedVote !== undefined)
			.map((result) => ({ [result.key]: result.selectedVote as string }));

		if (!votes.length) {
			console.error('No votes selected');
			return;
		}

		this.isLoading = true; // Optionally show a loading indicator
		this.pollService
			.updateEventVoting(this.event.id, this.emailToken, { votes })
			.subscribe({
				next: () => {
					console.log('Vote updated successfully!');
					// Reload the page to reflect changes
					window.location.reload();
				},
				error: (err) => {
					console.error('Error updating vote:', err);
					this.feedbackMessage = 'Failed to update vote. Please try again.';
					this.isLoading = false;
				},
			});
	}
}
