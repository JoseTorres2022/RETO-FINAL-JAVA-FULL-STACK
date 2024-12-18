package com.reservas.backend.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationRequestDto {

    private Integer id;
    @NotBlank(message = "El nombre del cliente es requerido")
    private String customerName;
    @NotNull(message = "La fecha de checkInDate es requerida")
    private LocalDateTime checkInDate;
    @NotNull(message = "La fecha de checkOutDate  es requerida")
    private LocalDateTime checkOutDate;
    @NotNull(message = "El idRoom es requerido")
    private Integer idRoom;

}
