import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
// The import { ... } syntax is used for importing named exports
//  The import * as syntax is used for importing the default export
import zxcvbn, { ZXCVBNFeedback, ZXCVBNResult, ZXCVBNScore } from 'zxcvbn';

// Technically this is a class, but it is used as a namespace for the static methods.
export class CustomValidators {
  /**
   * ONLY EXAMPLE: A Configured Validator
   * For checking if the value is at least the given length
   * @param length The minimum length
   */
  static min(length: number): ValidatorFn {
    return function(control: AbstractControl): ValidationErrors | null {
      // If the value is too short return an error object
      if (control.value.length < length) {
        return {
          minimum: true,
        };
      }

      // if the value is long enough return null
      return null;
    };
  }

  /**
   * Validator for checking if the password is strong enough using `zxcvbn`
   * @param minScore The minimum strength level
   */
  static passwordStrength(minScore: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const result: ZXCVBNResult = zxcvbn(control.value);
      const score: ZXCVBNScore = result.score;
      const feedback: ZXCVBNFeedback = result.feedback;

      // If the password is not good enough return an error object
      if (score < minScore) {
        return {
          weak: {
            // valid: false,
            score,
            feedback,
          },
        };
      }

      // If the password is strong enough return null
      return null;
    };
  }

  /**
   * Single Field Validator for checking if the two fields match
   * @param matchTo The name of the other field
   *
   * Problem:
   * If this or the other control value changes this validator should.
   *
   * Solution:
   * Involves a `Subscription` to the other control value and listen to its changes.
   */
  static match(matchTo: string): ValidatorFn {
    let thisControl: AbstractControl;
    let otherControl: AbstractControl;

    return (control: AbstractControl): ValidationErrors | null => {
      // 1. In the first call there is no parent control
      if (!control.parent) return null;

      // 2. In the second call there is a parent control
      // This is purely for setting up the `Subscription` to the other control.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent?.get(matchTo) as AbstractControl;

        // 2a. Set up `Subscription` to update validity of this control when the other control changes
        // In other words, call this validator, whenever one of the control value changes.
        otherControl.valueChanges.subscribe(() => {
          // If the other control changes call my own validator _AGAIN_
          thisControl.updateValueAndValidity({
            onlySelf: true,
            emitEvent: false,
          });
        });
      }

      // 3. Verify if the both control values match
      // If not return an error object.
      if (thisControl.value !== otherControl.value) {
        return {
          mismatch: true,
        };
      }

      // 4. If the values are equal return null.
      return null;
    };
  }

  /**
   * Group Validator for checking if the two fields match
   * @param controlName1 The first control
   * @param controlName2 The second control
   */
  static match2(controlName1: string, controlName2: string) {
    return (parent: AbstractControl): ValidationErrors | null => {
      // Get the values of the two controls from the perspective of the FormGroup
      const value1 = parent.get(controlName1)?.value;
      const value2 = parent.get(controlName2)?.value;

      // If the values are not equal return an error object
      if (value1 !== value2) {
        return {
          mismatch: true,
        };
      }

      // If the values are equal return null
      return null;
    };
  }
}
