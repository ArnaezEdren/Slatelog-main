import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Commands } from '../model/commands';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class PollService {
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
		console.log(eventId, emailToken);
		return this.http
			.get<any>('http://localhost:8080/api/event/poll', { params })
			.pipe(
				catchError((error) => {
					console.error('Error fetching event:', error);
					throw error;
				})
			);
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
		command: Commands.UpdateEventVoting
	): Observable<any> {
		// Base URL for the PUT request
		const url = 'http://localhost:8080/api/event/poll';

		// Setting up HTTP parameters
		let params = new HttpParams();
		params = params.append('eventId', eventId);
		params = params.append('emailToken', emailToken);

		// Options object including the parameters
		const options = {
			params: params,
		};

		// Make the HTTP PUT request
		return this.http.put(url, command, options).pipe(
			catchError(this.handleError) // Use the handleError method
		);
	}

	/**
	 * A method to handle errors if any occurs during the HTTP request.
	 * @param error The error response object.
	 * @returns An Observable throwing an error suitable for client-side consumption.
	 */
	private handleError(error: HttpErrorResponse): Observable<never> {
		if (error.error instanceof ErrorEvent) {
			// Client-side or network error occurred
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code
			console.error(
				`Backend returned code ${error.status}, body was: `,
				error.error
			);
		}

		// Here, we can check if the response body is parseable and log it
		if (error.error && typeof error.error === 'string') {
			try {
				const errorData = JSON.parse(error.error);
				console.error('Parsed error body:', errorData);
			} catch (e) {
				console.error('Error parsing the error response:', error.error);
			}
		}

		// Return a more specific error message or handle specific statuses
		const errorMessage =
			error.status === 404
				? 'Resource not found'
				: 'Something bad happened; please try again later.';
		return throwError(() => new Error(errorMessage));
	}
}
