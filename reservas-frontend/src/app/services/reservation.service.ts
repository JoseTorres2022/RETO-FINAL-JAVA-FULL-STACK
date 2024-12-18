import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { Reservation } from '../model/reservation';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends GenericService<Reservation> {

  private reservationChange: Subject<Reservation[]> = new Subject<Reservation[]>(); // Subject para notificar cambios en la lista de pacientes
  private messageChange: Subject<string> = new Subject<string>(); // Subject para notificar mensajes

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/v1/reservation`)
   }
   
  setReservationChange(data: Reservation[]) {
    this.reservationChange.next(data);
  }

  getReservationChange() {
    return this.reservationChange.asObservable();
  }

  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

}
