package com.reservas.backend.repository;

import com.reservas.backend.model.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface IReservationRepo extends IGenericRepo<Reservation,Integer>{

    @Query("SELECT r FROM Reservation r WHERE r.room.id = :roomId AND " +
            "(r.checkInDate < :checkOutDate AND r.checkOutDate > :checkInDate)")
    List<Reservation> findByRoomIdAndDatesOverlap(@Param("roomId") Integer roomId,
                                                  @Param("checkInDate") LocalDateTime checkInDate,
                                                  @Param("checkOutDate") LocalDateTime checkOutDate);

}
