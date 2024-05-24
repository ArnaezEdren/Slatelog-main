import { FormControl } from '@angular/forms';

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
	id: string;
	title: string;
	description: string;
	locationStreet: string;
	locationCity: string;
	locationZipCode: string;
	locationState: string;
	poll: Poll; // Verwendung des neuen Interface
	invitationEmails: string[];
	deadlineDate: string;
	deadlineTime: string;
	icsFileData: string; // Ensure this field is included
	createdAt: string;
}

interface Poll {
	pollOptions: { [key: string]: PollOption[] }; // Map of timestamp to array of PollOption
	pollCloseDate: string;
	pollOpen: boolean;
}

export interface PollOption {
	voterEmail: string;
	votedAt: string;
	voteOption: string;
}

// Type for the form errors
export type CreateFormErrorType = Record<
	keyof CreateFormData,
	Record<string, string>
>;

// Type for the form controls
export type CreateFormType = Record<keyof CreateFormData, FormControl<string>>;
