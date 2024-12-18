package com.reservas.backend.service.impl;

import com.reservas.backend.dto.request.ReservationRequestDto;
import com.reservas.backend.exception.BussinesException;
import com.reservas.backend.exception.ModelNotFoundException;
import com.reservas.backend.model.Reservation;
import com.reservas.backend.model.Room;
import com.reservas.backend.repository.IGenericRepo;
import com.reservas.backend.repository.IReservationRepo;
import com.reservas.backend.repository.IRoomRepo;
import com.reservas.backend.service.IReservationService;
import com.reservas.backend.util.MapperUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.service.spi.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl extends CRUDImpl<Reservation,Integer> implements IReservationService {

    private final IReservationRepo repo;
    private final IRoomRepo roomRepo;
    private final MapperUtil mapperUtil;

    @Override
    protected IGenericRepo<Reservation, Integer> getRepo() {
        return repo;
    }

    @Transactional
    @Override
    public Reservation saveReservation(ReservationRequestDto reservationRequestDto) {
        Room room = roomRepo.findById(reservationRequestDto.getIdRoom()).orElseThrow(
                ()-> new ModelNotFoundException("ROOM WITH ID: " + reservationRequestDto.getIdRoom()+" NOT FOUND"));

        if (!room.getAvailable()){
            throw new BussinesException("HABITACIÓN " + room.getNumber() + " NO DISPONIBLE", HttpStatus.CONFLICT);
        }

        List<Reservation> conflictingReservations = repo.findByRoomIdAndDatesOverlap(
                reservationRequestDto.getIdRoom(), reservationRequestDto.getCheckInDate(), reservationRequestDto.getCheckOutDate());

        if (!conflictingReservations.isEmpty()) {
            throw new ServiceException("HABITACIÓN YA RESERVADA PARA LAS FECHAS INDICADAS");
        }

        Reservation reservation = mapperUtil.map(reservationRequestDto, Reservation.class);
        room.setAvailable(false);
        roomRepo.save(room);
        return  repo.save(reservation);
    }
}
