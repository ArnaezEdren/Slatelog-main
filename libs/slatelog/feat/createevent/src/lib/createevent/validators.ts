import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const today = new Date();
		const inputDate = new Date(control.value);
		return inputDate >= today ? null : { pastDate: true };
	};
}

export function noOverlapValidator(
	control: AbstractControl
): ValidationErrors | null {
	const timePoints = control.value;
	if (!timePoints || timePoints.length === 0) {
		return { noTimePoints: true };
	}

	for (let i = 0; i < timePoints.length - 1; i++) {
		for (let j = i + 1; j < timePoints.length; j++) {
			const start1 = new Date(`${timePoints[i].date}T${timePoints[i].time}`);
			const start2 = new Date(`${timePoints[j].date}T${timePoints[j].time}`);

			if (start1.getTime() === start2.getTime()) {
				return { overlapping: true };
			}
		}
	}

	return null;
}

export function atLeastOneEmailValidator(
	control: AbstractControl
): ValidationErrors | null {
	const invitations = control.value;
	if (!invitations || invitations.length === 0) {
		return { noEmails: true };
	}
	return null;
}
