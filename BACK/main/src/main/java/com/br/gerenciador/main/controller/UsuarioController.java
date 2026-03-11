package com.br.gerenciador.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.br.gerenciador.main.domain.dto.LoginResponseDTO;
import com.br.gerenciador.main.domain.dto.UsuarioDTO;
import com.br.gerenciador.main.domain.entity.Usuario;
import com.br.gerenciador.main.repository.UsuarioRepository;
import com.br.gerenciador.main.security.ServicoToken;

@Controller
@RequestMapping("/auth")
public class UsuarioController {

    @Autowired
    private AuthenticationManager service;

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private ServicoToken servicoToken;

    @PostMapping("/login")
    public ResponseEntity login (@RequestBody UsuarioDTO dto) {
        var loginPassword = new UsernamePasswordAuthenticationToken(dto.login(), dto.senha());
        var auth = this.service.authenticate(loginPassword);
        var token = servicoToken.gerarToken(auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register (@RequestBody UsuarioDTO dto) {
       if (this.repository.findByLogin(dto.login()) != null) return ResponseEntity.badRequest().build();
       String encryptedPassword = new BCryptPasswordEncoder().encode(dto.senha());
       Usuario newUser = new Usuario(dto.login(), encryptedPassword);
       this.repository.save(newUser);
       return ResponseEntity.ok().build();
    }
}