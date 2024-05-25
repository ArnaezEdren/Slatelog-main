import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
	selector: 'app-delete-confirm-snackbar',
	template: `
		<span>{{ data.message }}</span>
		<button mat-button (click)="data.onConfirm()">Yes</button>
		<button mat-button (click)="data.onCancel()">No</button>
	`,
	styles: [
		`
			span {
				margin-right: 16px;
			}
			button {
				color: #ff4081;
			}
		`,
	],
})
export class DeleteConfirmSnackbarComponent {
	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
