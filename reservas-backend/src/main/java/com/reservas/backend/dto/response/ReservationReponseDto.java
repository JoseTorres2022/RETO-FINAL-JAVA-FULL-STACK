package com.reservas.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationReponseDto {

    private Integer id;
    private String customerName;
    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDate;
    private RoomResponseDto room;

}
