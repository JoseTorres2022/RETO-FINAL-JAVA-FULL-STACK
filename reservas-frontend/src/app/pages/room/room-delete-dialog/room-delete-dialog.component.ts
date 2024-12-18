import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomService } from '../../../services/room.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-room-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './room-delete-dialog.component.html',
  styleUrl: './room-delete-dialog.component.css'
})
export class RoomDeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: number,
    private roomService: RoomService,
    private _dialogRef: MatDialogRef<RoomDeleteDialogComponent>
  ) { }

  close() {
    this._dialogRef.close();
  }

  delete() {
    this.roomService.delete(this.id)
    .pipe(switchMap(() => this.roomService.findAll()))
    .subscribe(data => {
      this.roomService.setRoomChange(data);
      this.roomService.setMessageChange('DELETED!');
    });
    this.close();
  }

}
