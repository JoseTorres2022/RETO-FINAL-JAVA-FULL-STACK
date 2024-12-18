import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from '../../model/reservation';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from '../../services/reservation.service';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { ReservationDeleteDialogComponent } from './reservation-delete-dialog/reservation-delete-dialog.component';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [MaterialModule,DatePipe,FormsModule,ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent {
  dataSource: MatTableDataSource<Reservation>;
  //displayedColumns: string[] = ['idRoom', 'firstName', 'lastName', 'dni'];
  columnsDefinitions = [
    { def: 'id', label: 'idReservation', hide: true },
    { def: 'customerName', label: 'Custor Name', hide: false },
    { def: 'checkInDate', label: 'Checkin In Date', hide: false },
    { def: 'checkOutDate', label: 'Checkout Date', hide: false },
    { def : 'roomNumber', label: 'Room Number', hide: false},
    { def: 'actions', label: 'Actions', hide: false }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private reservationService: ReservationService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.reservationService.findAll().subscribe(data => {
      this.createTable(data);
    });
    this.reservationService.getReservationChange().subscribe(data => {
      this.createTable(data);
    });
    this.reservationService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
  }

  createTable(data: Reservation[]){
    console.log('data: ',data);
    this.dataSource = new MatTableDataSource(data);
    console.log('this.dataSource: ', this.dataSource.filteredData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(reservation?: Reservation): void {
    console.log('reservation: ', reservation);
    this._dialog.open(ReservationDialogComponent, {
      width: '750px',
      data: reservation
    });
  }

  delete(id: number): void {
    this._dialog.open(ReservationDeleteDialogComponent, {
      width: '200px',
      data: id
    });
  }

  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

}
