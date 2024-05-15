import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class EventService {
	private eventId!: string;
	private emailToken!: string;

	constructor() {}

	setEventId(id: string) {
		this.eventId = id;
	}

	getEventId(): string {
		return this.eventId;
	}

	setEmailToken(token: string) {
		this.emailToken = token;
	}

	getEmailToken(): string {
		return this.emailToken;
	}
}
