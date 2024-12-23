import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Room } from '../../model/room';
import { RoomService } from '../../services/room.service';
import { RoomDialogComponent } from './room-dialog/room-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomDeleteDialogComponent } from './room-delete-dialog/room-delete-dialog.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {
  dataSource: MatTableDataSource<Room>;
  //displayedColumns: string[] = ['idRoom', 'firstName', 'lastName', 'dni'];
  columnsDefinitions = [
    { def: 'id', label: 'idRoom', hide: true },
    { def: 'number', label: 'number', hide: false },
    { def: 'type', label: 'type', hide: false },
    { def: 'price', label: 'price', hide: false },
    { def: 'available', label: 'available', hide: false },
    { def: 'actions', label: 'Actions', hide: false },
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private roomService: RoomService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.roomService.findAll().subscribe((data) => {
      this.createTable(data);
    });
    this.roomService.getRoomChange().subscribe((data) => {
      this.createTable(data);
    });
    this.roomService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'INFO', {
        duration: 2000,
      });
    });
  }

  createTable(data: Room[]) {
    console.log('data: ', data);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.dataSource.filterPredicate = (data: Room, filter: string) => {
    //   // Elimina espacios en blanco y convierte el filtro a minúsculas
    //   const filterValue = filter.trim().toLowerCase();
    
    //   // Convierte el valor de disponibilidad a texto ('yes' o 'no')
    //   const availableText = data.available ? 'yes' : 'no';
    
    //   // Verifica si el texto de disponibilidad contiene el valor del filtro
    //   return availableText.includes(filterValue);
    // };
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  openDialog(room?: Room) {
    console.log('room: ', room);
    this._dialog.open(RoomDialogComponent, {
      width: '750px',
      data: room,
    });
  }

  delete(id: number) {
    console.log('Delete medic with id: ' + id);
    this._dialog.open(RoomDeleteDialogComponent, {
      width: '200px',
      data: id,
    });
  }
}
