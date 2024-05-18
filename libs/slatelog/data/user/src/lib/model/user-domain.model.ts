// This is the domain model for our data or store. It usually comes from the server.
// The frontend domain model DOES NOT MATCH the backend domain model.

// The frontend domain model usually
// - does not need all the attributes (e.g. sensitive data)
// - does need additional calculated attributes

// Model all our frontend data with interfaces
export interface User {
	id: string;
	email: string;
	password: string;
	role: string[];
	profile: {
		firstName: string;
		lastName: string;
	};
	social: {
		// add social properties if any
	};
	account: {
		enabled: boolean;
		emailToken: {
			verificationEmail: string;
			encodedValue: string;
			createdAt: string;
			expiresAt: string;
		};
	};
	createdAt: string;
	lastModifiedAt: string;
	version: number;
	_class: string;
}

export interface Profile {
	firstName: string;
	lastName: string;
}

export enum Role {
	Admin = 'ADMIN',
	User = 'USER',
}

// export enum Role {
//   Admin,
//   User,
// }
