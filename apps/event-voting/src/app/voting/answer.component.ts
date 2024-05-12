import { Pipe, PipeTransform } from '@angular/core';
import { AnswerOption } from '../model/voting-model';

@Pipe({ standalone: true, name: 'translateAnswer' })
export class TranslateAnswerPipe implements PipeTransform {
	transform(value: AnswerOption): string {
		switch (value) {
			case AnswerOption.YES:
				return 'Yes';
			case AnswerOption.NO:
				return 'No';
			case AnswerOption.MAYBE:
				return 'Maybe';
			default:
				return '';
		}
	}
}
