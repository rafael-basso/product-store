import { ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Deletar produto</h2>
  <mat-dialog-content>Deletar este produto?</mat-dialog-content>
  <mat-dialog-actions align="end">
    <!-- <button mat-button mat-dialog-close>Não</button> -->
    <button mat-button (click)="onNo()">Não</button>
    <!-- <button mat-button mat-dialog-close cdkFocusInitial>Sim</button> -->
    <button mat-raised-button color="accent" cdkFocusInitial (click)="onYes()" >Sim</button>
  </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef);

  onNo() {
    this.dialogRef.close(false);
  }

  onYes() {
    this.dialogRef.close(true);
  }
}

@Injectable({
  providedIn: 'root'
})

export class ConfirmationDialogService {
  matDialog = inject(MatDialog);

  constructor() { }

  openDialog() : Observable<boolean> {
    return this.matDialog.open(ConfirmationDialogComponent).afterClosed();
  }
}
