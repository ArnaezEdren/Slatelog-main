import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'frontend-app-confirm-dialog',
	templateUrl: 'dialogconfirm.component.html',
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
