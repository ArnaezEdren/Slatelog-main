import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, throwError } from 'rxjs';
import { Event } from '../model/createEvent-view.model';
import { CreateFormType } from '../model/createEvent-view.model';
import { User } from '../../../../../data/user/src';

@Injectable({
	providedIn: 'root',
})
export class EventHttpService {
	private http = inject(HttpClient);
	private eventApiUrl = '/api/event'; // URL des Backend-Endpoints für Events

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
		console.log('Sending data:', eventData);
		return this.http
			.post(this.eventApiUrl, eventData)
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
}
