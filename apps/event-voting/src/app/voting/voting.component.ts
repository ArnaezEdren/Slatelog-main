import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../service/voting-http-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateAnswerPipe } from './answer.component';

@Component({
	selector: 'frontend-app-voting',
	templateUrl: './voting.component.html',
	styleUrls: ['./voting.component.css'],
	standalone: true,
	imports: [CommonModule, FormsModule, HttpClientModule, TranslateAnswerPipe],
})
export class VotingComponent implements OnInit {
	event: any = {};
	votes: any[] = [];
	eventId!: string;
	emailToken!: string;

	constructor(
		private pollService: PollService,
		private route: ActivatedRoute,
		private cdr: ChangeDetectorRef
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
				this.cdr.detectChanges(); // Manually trigger change detection
			},
			error: (err) => console.error('Failed to load event:', err),
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
}
