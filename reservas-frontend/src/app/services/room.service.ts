import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { Room } from '../model/room';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends GenericService<Room> {

  private roomChange: Subject<Room[]> = new Subject<Room[]>(); // Subject para notificar cambios en la lista de pacientes
  private messageChange: Subject<string> = new Subject<string>(); // Subject para notificar mensajes

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/v1/room`)
   }
   
  setRoomChange(data: Room[]) {
    this.roomChange.next(data);
  }

  getRoomChange() {
    return this.roomChange.asObservable();
  }

  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

}
