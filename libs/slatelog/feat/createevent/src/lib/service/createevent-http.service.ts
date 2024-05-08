import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Event } from '../model/createEvent-view.model';
import { CreateFormType } from '../model/createEvent-view.model';

@Injectable({
	providedIn: 'root',
})
export class EventHttpService {
	private http = inject(HttpClient);
	private eventApiUrl = '/api/event'; // URL des Backend-Endpoints für Events

	createEvent(eventData: any): Observable<any> {
		return this.http.post<any>(this.eventApiUrl, eventData);
	}
}
