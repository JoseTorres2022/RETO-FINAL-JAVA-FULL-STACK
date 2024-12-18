import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Reservation } from '../../../model/reservation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from '../../../services/reservation.service';
import { switchMap } from 'rxjs';
import { Room } from '../../../model/room';
import { RoomService } from '../../../services/room.service';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css',
})
export class ReservationDialogComponent {
  minDate: Date = new Date();
  reservation: Reservation;
  reservations: Reservation[];
  rooms: Room[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Reservation,
    private _dialogRef: MatDialogRef<ReservationDialogComponent>,
    private reservationService: ReservationService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    console.log('this.data: ', this.data);
    this.reservation = { ...this.data };
    // Validar checkInDate
    if (this.reservation.checkInDate) {
      this.reservation.checkInDate = format(
        new Date(this.reservation.checkInDate),
        "yyyy-MM-dd'T'HH:mm:ss"
      );
    }

    // Validar checkOutDate
    if (this.reservation.checkOutDate) {
      this.reservation.checkOutDate = format(
        new Date(this.reservation.checkOutDate),
        "yyyy-MM-dd'T'HH:mm:ss"
      );
    }
    console.log('this.reservation: ', this.reservation);
    this.roomService.findAll().subscribe((data) => (this.rooms = data));
    console.log('this.rooms: ', this.rooms);
  }

  close() {
    this._dialogRef.close();
  }

  operate() {
    if (this.reservation != null && this.reservation.id > 0) {
      //UPDATE
      this.reservationService
        .update(this.reservation.id, this.reservation)
        .pipe(switchMap(() => this.reservationService.findAll()))
        .subscribe((data) => {
          this.reservationService.setReservationChange(data);
          this.reservationService.setMessageChange('UPDATED!');
        });
    } else {
      //INSERT
      this.reservationService
        .save(this.reservation)
        .pipe(switchMap(() => this.reservationService.findAll()))
        .subscribe((data) => {
          this.reservationService.setReservationChange(data);
          this.reservationService.setMessageChange('INSERTED!');
        });
    }
    this.close();
  }
}
