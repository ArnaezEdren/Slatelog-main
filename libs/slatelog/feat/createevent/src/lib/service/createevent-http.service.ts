import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, throwError } from 'rxjs';
import { User } from '../../../../../data/user/src';
import { Event } from '../model/createEvent-view.model'; // Ensure this is the correct import

@Injectable({
	providedIn: 'root',
})
export class EventHttpService {
	private http = inject(HttpClient);
	private eventApiUrl = '/api/event'; // URL des Backend-Endpoints für Events
	//changed to this from: '/api/event'

	login(): Promise<User> {
		// `firstValueFrom` turns an `Observable` into a `Promise`
		// return lastValueFrom(this.http.get<User>('/api/user/login', { headers }));
		// return lastValueFrom(this.http.get<User>('/api/user/login'));
		return lastValueFrom(this.http.get<User>('/api/user'));
	}
	// createEvent(eventData: any): Observable<any> {
	// 	return this.http.post<any>(this.eventApiUrl, eventData);
	//
	//
	// }

	createEvent(eventData: any): Observable<any> {
		//	console.log('Sending data:', eventData);
		return this.http
			.post(this.eventApiUrl, eventData)
			.pipe(catchError(this.handleError));
	}

	//TODO IMPLEMENT UPDATE EVENT
	updateEvent(eventId: string, eventData: any): Observable<any> {
		console.log('Editing event with ID:', eventId);
		return (
			this.http
				//.put(`${this.eventApiUrl}/${eventId}`, eventData)
				.put(`${this.eventApiUrl}/${eventId}`, eventData)
				.pipe(catchError(this.handleError))
		);
	}

	deleteEvent(eventId: string): Observable<any> {
		console.log('Delete event with ID:', eventId);
		return this.http
			.delete(`${this.eventApiUrl}/${eventId}`)
			.pipe(catchError(this.handleError));
	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error(
				'Client-side or network error occurred:',
				error.error.message
			);
		} else {
			console.error(
				`Backend returned code ${error.status}, response body:`,
				error.error
			);
		}
		return throwError(
			() => new Error('Something bad happened; please try again later.')
		);
	}
	getAllEvents(): Observable<Event[]> {
		return this.http.get<Event[]>('/api/timeline');
	}
}
