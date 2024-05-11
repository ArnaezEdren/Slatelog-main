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
				if (error.error instanceof ErrorEvent) {
					// Client-side errors
					errorMsg = `Error: ${error.error.message}`;
				} else {
					// Server-side errors
					errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
				}
				console.error(errorMsg);
				// Here you can add more error handling logic, like redirecting to an error page
				return throwError(errorMsg);
			})
		);
	}
}
