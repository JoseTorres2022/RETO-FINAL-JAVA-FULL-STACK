package com.reservas.backend.service.impl;

import com.reservas.backend.model.Room;
import com.reservas.backend.repository.IGenericRepo;
import com.reservas.backend.repository.IRoomRepo;
import com.reservas.backend.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl extends CRUDImpl<Room,Integer> implements IRoomService {

    private final IRoomRepo repo;

    @Override
    protected IGenericRepo<Room, Integer> getRepo() {
        return repo;
    }

}
