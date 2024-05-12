import { Pipe, PipeTransform } from '@angular/core';
import { AnswerOption } from './voting-model';

@Pipe({ standalone: true, name: 'translateAnswer' })
export class TranslateAnswerPipe implements PipeTransform {
	transform(value: AnswerOption): string {
		switch (value) {
			case AnswerOption.Yes:
				return 'Yes';
			case AnswerOption.No:
				return 'No';
			case AnswerOption.Maybe:
				return 'Maybe';
			default:
				return '';
		}
	}
}
