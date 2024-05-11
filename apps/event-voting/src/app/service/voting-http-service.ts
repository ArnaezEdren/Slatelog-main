// poll.service.ts in Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PollService {
	private baseUrl = '/api/event'; // URL des Spring Boot Servers

	constructor(private http: HttpClient) {}

	getPollEvent(eventId: string, emailToken: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/poll`, {
			params: { eventId, emailToken },
		});
	}

	updateEventVoting(
		eventId: string,
		emailToken: string,
		votes: any
	): Observable<any> {
		return this.http.put(`${this.baseUrl}/poll`, votes, {
			params: { eventId, emailToken },
		});
	}
}
