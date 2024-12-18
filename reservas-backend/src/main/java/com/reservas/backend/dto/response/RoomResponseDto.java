package com.reservas.backend.dto.response;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponseDto {

    private Integer id;
    private String number;
    private String type;
    private Double price;
    private Boolean available;

}
