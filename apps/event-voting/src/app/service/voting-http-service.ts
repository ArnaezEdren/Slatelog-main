import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpErrorResponse,
	HttpParams,
} from '@angular/common/http';
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
		// Construct the URL with proper query parameters
		const params = new HttpParams()
			.set('eventId', eventId)
			.set('emailToken', emailToken);

		// Use the constructed URL and params to make the HTTP GET request
		return this.http.get(`${this.baseUrl}/poll`, { params }).pipe(
			catchError((error: HttpErrorResponse) => {
				console.error('Error fetching event:', error.message);
				return throwError(
					() => new Error('Error fetching the event. Please try again later.')
				);
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
