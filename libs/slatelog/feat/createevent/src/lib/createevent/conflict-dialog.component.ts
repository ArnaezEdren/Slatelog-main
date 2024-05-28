import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'frontend-app-conflict-dialog',
	template: `
		<h1 mat-dialog-title>Conflicts Found</h1>
		<div mat-dialog-content>
			<p *ngFor="let conflict of data.conflicts">{{ conflict }}</p>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="onClose()">OK</button>
		</div>
	`,
	styles: [
		`
			mat-dialog-content {
				white-space: pre-line;
			}
		`,
	],
})
export class ConflictDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<ConflictDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { conflicts: string[] }
	) {}

	onClose(): void {
		this.dialogRef.close();
	}
}
