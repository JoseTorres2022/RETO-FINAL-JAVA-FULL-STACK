package com.reservas.backend.dto.request;


import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequestDto {

    private Integer id;
    @NotBlank(message = "El número es requerido")
    private String number;
    @NotBlank(message = "El tipo es requerido")
    private String type;
    @NotNull(message = "El precio es requerido")
    @DecimalMin("0.0")
    private Double price;
    @NotNull(message = "La disponibilidad es requerida")
    private Boolean available;

}
