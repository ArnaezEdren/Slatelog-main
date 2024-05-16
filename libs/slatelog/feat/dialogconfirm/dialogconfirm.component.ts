import { Component } from '@angular/core';
import {
	MatDialogActions,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
	selector: 'frontend-app-confirm-dialog',
	templateUrl: 'dialogconfirm.component.html',
	standalone: true,
	imports: [MatDialogActions, MatDialogTitle, MatButton],
})
export class ConfirmDialogComponent {
	constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

	onConfirm(): void {
		this.dialogRef.close(true);
	}

	onCancel(): void {
		this.dialogRef.close(false);
	}
}
