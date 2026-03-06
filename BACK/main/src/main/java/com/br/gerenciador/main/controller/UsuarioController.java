package com.br.gerenciador.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.br.gerenciador.main.domain.dto.UsuarioDTO;
import com.br.gerenciador.main.service.UsuarioService;

@Controller
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UsuarioDTO usuario) {
        service.validarLogin(usuario);
        return ResponseEntity.status(HttpStatus.OK).body("Login realizado com sucesso!");
    } 
}