import { __decorate, __metadata } from 'tslib';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//  The import * as syntax is used for importing the default export
// The import { ... } syntax is used for importing named exports
import zxcvbn from 'zxcvbn';
let PasswordStrengthComponent = class PasswordStrengthComponent {
	constructor() {
		// Whenever the input changes the `barLevelClass` getter is executed
		this.password = '';
	}
	// This is a TypeScript get property
	get barLevelClass() {
		const result = zxcvbn(this.password);
		const score = result.score;
		// returns `bar level-x` as a string for the [ngClass]
		return `bar level-${score}`;
	}
};
__decorate(
	[Input(), __metadata('design:type', Object)],
	PasswordStrengthComponent.prototype,
	'password',
	void 0
);
PasswordStrengthComponent = __decorate(
	[
		Component({
			selector: 'frontend-ui',
			standalone: true,
			imports: [CommonModule],
			templateUrl: './password-strength.component.html',
			styleUrl: './password-strength.component.css',
			changeDetection: ChangeDetectionStrategy.OnPush,
		}),
	],
	PasswordStrengthComponent
);
export { PasswordStrengthComponent };
//# sourceMappingURL=password-strength.component.js.map
