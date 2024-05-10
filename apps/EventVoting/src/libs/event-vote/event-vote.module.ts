// Path: apps/EventVoting/src/libs/event-vote/event-vote.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventVoteComponent } from './event-vote.component';

@NgModule({
	declarations: [EventVoteComponent],
	imports: [CommonModule],
	exports: [EventVoteComponent], // Make sure to export the component
})
export class EventVoteModule {}
