import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				let errorMsg = '';
				if (!navigator.onLine) {
					// Handle browser being offline
					errorMsg = 'Keine Internetverbindung verfügbar.';
				} else if (error.error instanceof ErrorEvent) {
					// Client-side errors
					errorMsg = `Clientseitiger Fehler: ${error.error.message}`;
				} else {
					// Server-side errors or no response received
					errorMsg =
						error.status === 0
							? 'Keine Antwort vom Server erhalten. Bitte überprüfen Sie Ihre Netzwerkverbindung.'
							: `Serverseitiger Fehler: Code ${error.status}, Nachricht: ${error.message}`;
				}
				console.error('Netzwerk- oder Serverfehler:', errorMsg);
				// Hier kannst du weitere Fehlerbehandlungslogik hinzufügen, z. B. Weiterleiten auf eine Fehlerseite
				return throwError(() => new Error(errorMsg));
			})
		);
	}
}
