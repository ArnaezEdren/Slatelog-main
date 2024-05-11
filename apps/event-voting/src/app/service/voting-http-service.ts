import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class PollService {
	private baseUrl = '/api/event'; // Base URL for your API

	constructor(private http: HttpClient) {}

	/**
	 * Fetches a specific poll event based on event ID and email token.
	 * @param eventId The ID of the event.
	 * @param emailToken A token associated with the user's email.
	 * @returns An Observable of the event data.
	 */
	getPollEvent(eventId: string, emailToken: string): Observable<any> {
		const params = new HttpParams()
			.set('eventId', eventId)
			.set('emailToken', emailToken);
		return this.http
			.get(`${this.baseUrl}/poll`, { params })
			.pipe(catchError(this.handleError));
	}

	/**
	 * Updates the voting for an event.
	 * @param eventId The ID of the event.
	 * @param emailToken A token associated with the user's email.
	 * @param votes Data structure containing the votes to be updated.
	 * @returns An Observable of the update response.
	 */
	updateEventVoting(
		eventId: string,
		emailToken: string,
		votes: any
	): Observable<any> {
		const params = new HttpParams()
			.set('eventId', eventId)
			.set('emailToken', emailToken);
		return this.http
			.put(`${this.baseUrl}/poll`, votes, { params })
			.pipe(catchError(this.handleError));
	}

	/**
	 * A method to handle errors if any occurs during the HTTP request.
	 * @param error The error response object.
	 * @returns An Observable throwing an error suitable for client-side consumption.
	 */
	private handleError(error: any): Observable<never> {
		let errorMessage = 'An unknown error occurred!';
		if (error.error instanceof ErrorEvent) {
			// Client-side errors
			errorMessage = `Error: ${error.error.message}`;
		} else {
			// Server-side errors
			errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
		}
		console.error(errorMessage);
		return throwError(errorMessage);
	}
}
