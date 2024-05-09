// This is a model for the view e.g. `login.component.ts`.
// It is not the model for our data e.g. `data/user/model`.

import { FormControl, Validators } from '@angular/forms';

export interface TimePoint {
	dateTime: DateTime[];
}

export interface DateTime {
	date: string;
	time: string;
	vote?: string | null;
}

export interface Answer {
	voter: string; // Email des Abstimmenden
	votedAt: string;
	option: AnswerOption;
}

export interface AnswerNull {}

enum AnswerOption {
	YES,
	NO,
	MAYBE,
}

export interface Invitation {
	email: string;
	name: string;
}

export interface CreateFormData {
	title: string;
	description: string;
	street: string;
	city: string;
	postalCode: string;
	country: string;
	deadlineDate: string;
	deadlineTime: string;
	timePoints: TimePoint[];
	invitations: Invitation[];
}

export interface Event {
	title: string;
	description: string;
	street: string;
	city: string;
	postalCode: string;
	country: string;
	deadlineDate: string;
	deadlineTime: string;
	timePoints: TimePoint[];
	invitations: Invitation[];
}

// type FormKeyType = 'email' | 'password' | 'passwordConfirm';

// Type for the form errors
export type CreateFormErrorType = Record<
	keyof CreateFormData,
	Record<string, string>
>;

// Type for the form controls
// type RegisterFormType = Record<FormKeyType, FormControl<string>>;
export type CreateFormType = Record<keyof CreateFormData, FormControl<string>>;
