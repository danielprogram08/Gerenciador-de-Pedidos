package com.br.gerenciador.main.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(LoginErrorMessage.class)
    public ResponseEntity<RestErrorMessage> handleLoginError(LoginErrorMessage exception) {
        RestErrorMessage error = new RestErrorMessage(exception.getMessage(), HttpStatus.UNAUTHORIZED.toString());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}