import { __decorate } from 'tslib';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, throwError } from 'rxjs';
let EventHttpService = class EventHttpService {
	constructor() {
		this.http = inject(HttpClient);
		this.eventApiUrl = '/api/event'; // URL des Backend-Endpoints für Events
	}
	login() {
		// `firstValueFrom` turns an `Observable` into a `Promise`
		// return lastValueFrom(this.http.get<User>('/api/user/login', { headers }));
		// return lastValueFrom(this.http.get<User>('/api/user/login'));
		return lastValueFrom(this.http.get('/api/user'));
	}
	// createEvent(eventData: any): Observable<any> {
	// 	return this.http.post<any>(this.eventApiUrl, eventData);
	//
	//
	// }
	createEvent(eventData) {
		console.log('Sending data:', eventData);
		return this.http
			.post(this.eventApiUrl, eventData)
			.pipe(catchError(this.handleError));
	}
	handleError(error) {
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
};
EventHttpService = __decorate(
	[
		Injectable({
			providedIn: 'root',
		}),
	],
	EventHttpService
);
export { EventHttpService };
export class DataService {
	constructor(http) {
		this.http = http;
	}
	login() {
		// `firstValueFrom` turns an `Observable` into a `Promise`
		// return lastValueFrom(this.http.get<User>('/api/user/login', { headers }));
		// return lastValueFrom(this.http.get<User>('/api/user/login'));
		return lastValueFrom(this.http.get('/api/user'));
	}
	getData(url) {
		return this.http.get(url).pipe(
			catchError((error) => {
				console.error('Error fetching data', error);
				return throwError(() => new Error('Error fetching data'));
			})
		);
	}
}
//# sourceMappingURL=createevent-http.service.js.map
