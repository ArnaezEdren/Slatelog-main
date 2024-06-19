import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { BasicAuthService } from '../../../../../data/auth/src';

export function emailExistsValidator(
	authService: BasicAuthService
): AsyncValidatorFn {
	return (control: AbstractControl) => {
		if (!control.value) {
			return of(null);
		}
		return authService.emailExists(control.value).then((exists) => {
			return exists ? { emailExists: true } : null;
		});
	};
}
