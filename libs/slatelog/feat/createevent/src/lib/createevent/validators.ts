import {
	AbstractControl,
	ValidationErrors,
	ValidatorFn,
	FormGroup,
	FormArray,
} from '@angular/forms';

export function atLeastOneEmailValidator(
	formArray: AbstractControl
): ValidationErrors | null {
	const emails = formArray.value;
	if (emails.length === 0) {
		return { atLeastOneEmail: true };
	}
	return null;
}

export function futureDateValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const today = new Date().setHours(0, 0, 0, 0);
		const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);
		return selectedDate >= today ? null : { pastDate: true };
	};
}

export function noOverlapValidator(
	formArray: AbstractControl
): ValidationErrors | null {
	const timePoints = formArray.value;
	const timeSet = new Set();
	for (const tp of timePoints) {
		const key = `${tp.date}T${tp.time}`;
		if (timeSet.has(key)) {
			return { overlapping: true };
		}
		timeSet.add(key);
	}
	return null;
}

export const futureDateTimeArrayValidator: ValidatorFn = (
	formArray: AbstractControl
): ValidationErrors | null => {
	const now = new Date();
	now.setHours(0, 0, 0, 0); // Set the current date to start of the day
	const controls = (formArray as FormArray).controls;

	for (let i = 0; i < controls.length; i++) {
		const dateControl = controls[i].get('date');

		if (dateControl) {
			const date = dateControl.value;

			if (!date) {
				continue; // Skip this iteration if date is not defined
			}

			// Parse date and compare with the current date
			const selectedDate = new Date(date);
			selectedDate.setHours(0, 0, 0, 0); // Set selected date to start of the day

			// Validate date
			if (selectedDate < now) {
				console.log('Date is in the past');
				dateControl.setErrors({ pastDateTime: true });
				return { pastDateTime: true };
			} else {
				console.log('Date is in the future');
				// Clear the error if the date is valid
				dateControl.setErrors(null);
			}
		}
	}
	return null;
};
