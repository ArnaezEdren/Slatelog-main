// This is a model for the view e.g. `login.component.ts`.
// It is not the model for our data e.g. `data/user/model`.

import { FormControl } from '@angular/forms';

export interface Address {
	street: string;
	city: string;
	postalCode: string;
	country: string;
}

export interface TimePoint {
	dateTime: DateTime;
}
export interface Poll {
	timePoints: TimePoint[];
}

export interface DateTime {
	date: Date;
	time: string; // Angenommen, dies ist eine Zeitangabe im String-Format
	answers: AnswerNull;
}

export interface Answer {
	voter: string; // Email des Abstimmenden
	votedAt: Date;
	option: AnswerOption;
}

export interface AnswerNull {}

enum AnswerOption {
	YES,
	NO,
	MAYBE,
}

export interface CreateFormData {
	title: string;
	description: string;
	poll: Poll;
	location: Address;
	invitations: Map<string, string>;
}

export interface Event {
	title: string;
	description: string;
	poll: Poll;
	location: Address;
	invitations: Map<string, string>;
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
