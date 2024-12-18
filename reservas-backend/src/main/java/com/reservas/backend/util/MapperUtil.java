package com.reservas.backend.util;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MapperUtil {
    private final ModelMapper  modelMapper;

    public <S,T> T map(S source, Class<T> targetClass) {
        return modelMapper.map(source, targetClass);
    }

    public <S,T> List<T> mapList(List<S> sourceList, Class<T> targetClass) {
        return sourceList.stream().map(source -> map(source, targetClass)).toList();
    }
}
