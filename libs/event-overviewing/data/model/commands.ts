// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Commands {
	export interface UpdateEventVoting {
		// Dies wird nun eine Array von Objekten, jedes mit einem instant und voteOption Key
		votes: Array<{ [key: string]: string }>;
	}
}
