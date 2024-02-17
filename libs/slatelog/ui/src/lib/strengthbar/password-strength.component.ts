import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//  The import * as syntax is used for importing the default export
// The import { ... } syntax is used for importing named exports
import zxcvbn, { ZXCVBNResult, ZXCVBNScore } from 'zxcvbn';

@Component({
  selector: 'frontend-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordStrengthComponent {

  // Whenever the input changes the `barLevelClass` getter is executed
  @Input() password = '';

  // This is a TypeScript get property
  get barLevelClass() {
    const result: ZXCVBNResult = zxcvbn(this.password);
    const score: ZXCVBNScore = result.score;
    // returns `bar level-x` as a string for the [ngClass]
    return `bar level-${score}`;
  }


}
