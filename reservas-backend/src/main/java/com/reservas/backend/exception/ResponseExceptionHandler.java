package com.reservas.backend.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class ResponseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorRecord> handleDefaultExceptions(Exception ex, WebRequest request) {
        log.error("Exception");
        CustomErrorRecord err = new CustomErrorRecord(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ModelNotFoundException.class)
    public ResponseEntity<CustomErrorRecord> handleModelNotFoundException(ModelNotFoundException ex, WebRequest request) {
        log.error("ModelNotFoundException");
        CustomErrorRecord err = new CustomErrorRecord(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        log.error("MethodArgumentNotValidException");
        String msg = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField().concat(":").concat(err.getDefaultMessage()))
                .collect(Collectors.joining(","));

        CustomErrorRecord err = new CustomErrorRecord(LocalDateTime.now(), msg, request.getDescription(false));

        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BussinesException.class)
    public ResponseEntity<CustomErrorRecord> businesExceptionHandler(BussinesException exception,WebRequest request){
        log.error("BussinesException");
        CustomErrorRecord errorResponse = new CustomErrorRecord(LocalDateTime.now(), exception.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorResponse, exception.getStatus());
    }


}
