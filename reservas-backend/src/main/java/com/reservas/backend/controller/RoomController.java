package com.reservas.backend.controller;

import com.reservas.backend.dto.request.RoomRequestDto;
import com.reservas.backend.dto.response.RoomResponseDto;
import com.reservas.backend.model.Room;
import com.reservas.backend.service.IRoomService;
import com.reservas.backend.util.MapperUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/room")
public class RoomController {

    private final IRoomService roomService;
    private final MapperUtil mapperUtil;

    @GetMapping
    public ResponseEntity<List<RoomResponseDto>> findAll() {
        List<RoomResponseDto> list = mapperUtil.mapList(roomService.findAll(), RoomResponseDto.class);

        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponseDto> findById(@PathVariable Integer id) {
        RoomResponseDto roomDto = mapperUtil.map(roomService.findById(id), RoomResponseDto.class);
        return ResponseEntity.ok(roomDto);
    }

    @PostMapping
    public ResponseEntity<RoomResponseDto> create(@Valid @RequestBody RoomRequestDto roomRequestDto) {
        Room room =roomService.save(mapperUtil.map(roomRequestDto, Room.class));
        RoomResponseDto roomResponseDto = mapperUtil.map(room, RoomResponseDto.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(roomResponseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponseDto> update(@PathVariable("id") Integer id,@Valid @RequestBody RoomRequestDto roomRequestDto) throws Exception {
        Room room = roomService.update(id, mapperUtil.map(roomRequestDto, Room.class));
        RoomResponseDto roomResponseDto = mapperUtil.map(room, RoomResponseDto.class);
        return ResponseEntity.ok(roomResponseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        roomService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
}
