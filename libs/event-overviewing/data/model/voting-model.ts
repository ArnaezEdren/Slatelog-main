export interface Event {
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
	pollOptions: { [key: string]: PollOption[] }; // Map of timestamp to array of PollOption
	pollCloseDate: string;
	pollOpen: boolean;
}

export interface PollOption {
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
	lastVote?: string;
}

export interface VoteCount {
	yes: number;
	no: number;
	maybe: number;
}
export interface VoteDetail {
	votedAt: string;
	voterEmail: string;
	voteOption: string;
}
