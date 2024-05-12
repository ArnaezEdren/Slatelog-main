export interface EventData {
	title: string;
	description: string;
	locationStreet: string;
	locationCity: string;
	locationZipCode: string;
	locationState: string;
	pollOptions: PollOption[]; // Verwendung des neuen Interface
	invitationEmails: string[];
	deadlineDate: string;
	deadlineTime: string;
}

export interface PollOption {
	time: string; //
	voting: AnswerOption;
}

export enum AnswerOption {
	YES,
	NO,
	MAYBE,
}
