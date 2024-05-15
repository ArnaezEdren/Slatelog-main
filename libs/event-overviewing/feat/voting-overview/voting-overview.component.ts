import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from '../../data/service/voting-http-service';
import { PollOption } from '../../data/model/voting-model';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
	selector: 'frontend-voting-overview',
	templateUrl: './voting-overview.component.html',
	standalone: true,
	styleUrls: ['./voting-overview.component.css'],
	imports: [AsyncPipe, CommonModule],
})
export class VotingOverviewComponent implements OnInit {
	events: any[] = [];
	voteSummaryByDate: any = {}; // Object to hold the vote counts by date

	eventId!: string;
	emailToken!: string;
	pendingEvents: any[] = [];
	fixedEvents: any[] = [];

	constructor(
		private pollService: PollService,
		private route: ActivatedRoute,
		private router: Router
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
				console.log('Event loaded:', event); // Check what the event data looks like
				this.events = [event];
				this.pendingEvents = this.events.filter((event) =>
					this.filterPending(event)
				);
				this.fixedEvents = this.events.filter((event) =>
					this.filterFixed(event)
				);
				if (event.poll && event.poll.pollOptions) {
					this.processPollOptions(event.poll.pollOptions); // Make sure this is called
				}
			},
			error: (err) => console.error('Failed to load event:', err),
		});
	}

	private processPollOptions(pollOptions: {
		[key: string]: PollOption[];
	}): void {
		console.log('Processing poll options:', pollOptions);
		this.voteSummaryByDate = {}; // Reset for fresh processing

		Object.keys(pollOptions).forEach((date) => {
			this.voteSummaryByDate[date] = { yes: 0, no: 0, maybe: 0 };
			pollOptions[date].forEach((option) => {
				if (option.voteOption === 'Yes') this.voteSummaryByDate[date].yes++;
				if (option.voteOption === 'No') this.voteSummaryByDate[date].no++;
				if (option.voteOption === 'Maybe') this.voteSummaryByDate[date].maybe++;
			});
		});

		console.log('Vote summary by date:', this.voteSummaryByDate);
	}

	changeParticipation(event: any): void {
		console.log('Navigating to voting component for event:', event);
		this.router.navigate(['/voting']); // Navigate with both parameters
	}

	countVotes(event: any): number {
		// Placeholder implementation; this should count votes based on your data structure
		return event.votes ? event.votes.length : 0;
	}

	filterPending(event: any): boolean {
		const isPending = new Date(event.poll.pollCloseDate) > new Date();
		console.log(`Event ${event.title} is pending: ${isPending}`);
		return isPending;
	}

	filterFixed(event: any): boolean {
		const isFixed = new Date(event.poll.pollCloseDate) <= new Date();
		console.log(`Event ${event.title} is fixed: ${isFixed}`);
		return isFixed;
	}

	getDates(): string[] {
		return Object.keys(this.voteSummaryByDate);
	}
}
