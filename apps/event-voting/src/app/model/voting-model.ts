export interface EventData {
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
}

interface Poll {
	pollOptions: PollOption[];
}

interface PollOption {
	voterEmail: string;
	votedAt: string;
	voteOption: string;
}

export enum AnswerOption {
	Yes,
	No,
	Maybe,
}

export interface PollOptionResult {
	key: string;
	counts: VoteCount;
	selectedVote?: string;
}

export interface VoteCount {
	yes: number;
	no: number;
	maybe: number;
}
