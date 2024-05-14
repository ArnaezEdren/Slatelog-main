import { __decorate } from 'tslib';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let ErrorHandlingInterceptor = class ErrorHandlingInterceptor {
	intercept(req, next) {
		return next.handle(req).pipe(
			catchError((error) => {
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
};
ErrorHandlingInterceptor = __decorate([Injectable()], ErrorHandlingInterceptor);
export { ErrorHandlingInterceptor };
//# sourceMappingURL=error-handling.interceptor.js.map
