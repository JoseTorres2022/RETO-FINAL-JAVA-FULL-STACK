package com.reservas.backend.controller;

import com.reservas.backend.dto.request.ReservationRequestDto;
import com.reservas.backend.dto.response.ReservationReponseDto;
import com.reservas.backend.model.Reservation;
import com.reservas.backend.service.IReservationService;
import com.reservas.backend.util.MapperUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reservation")
public class ReservationController {

    private final IReservationService reservationService;
    private final MapperUtil mapperUtil;

    @GetMapping
    public ResponseEntity<List<ReservationReponseDto>> findAll() {
        List<ReservationReponseDto> list = mapperUtil.mapList(reservationService.findAll(), ReservationReponseDto.class);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationReponseDto> findById(@PathVariable Integer id) {
        ReservationReponseDto reservationReponseDto = mapperUtil.map(reservationService.findById(id), ReservationReponseDto.class);
        return ResponseEntity.ok(reservationReponseDto);
    }

//
    @PostMapping
    public ResponseEntity<Reservation> create(@Valid @RequestBody ReservationRequestDto reservationRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationService.saveReservation(reservationRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        reservationService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
