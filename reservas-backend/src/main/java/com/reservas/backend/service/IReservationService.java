package com.reservas.backend.service;

import com.reservas.backend.dto.request.ReservationRequestDto;
import com.reservas.backend.model.Reservation;

public interface IReservationService extends ICRUD<Reservation,Integer>{

    Reservation saveReservation(ReservationRequestDto reservationRequestDto);

}
