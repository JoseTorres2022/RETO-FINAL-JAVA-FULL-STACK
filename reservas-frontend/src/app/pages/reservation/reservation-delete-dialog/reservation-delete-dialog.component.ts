import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { ReservationService } from '../../../services/reservation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-reservation-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './reservation-delete-dialog.component.html',
  styleUrl: './reservation-delete-dialog.component.css'
})
export class ReservationDeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: number,
    private reservationService: ReservationService,
    private _dialogRef: MatDialogRef<ReservationDeleteDialogComponent>
  ) { }

  close() {
    this._dialogRef.close();
  }

  delete() {
    this.reservationService.delete(this.id)
    .pipe(switchMap(() => this.reservationService.findAll()))
    .subscribe(data => {
      this.reservationService.setReservationChange(data);
      this.reservationService.setMessageChange('DELETED!');
    });
    this.close();
  }



}
