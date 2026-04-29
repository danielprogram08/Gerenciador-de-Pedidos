package com.br.gerenciador.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.br.gerenciador.main.domain.dto.LoginRespostaDTO;
import com.br.gerenciador.main.domain.dto.RegistrarUsuarioDTO;
import com.br.gerenciador.main.domain.dto.UsuarioDTO;
import com.br.gerenciador.main.domain.entity.Usuario;
import com.br.gerenciador.main.exception.LoginErrorMessage;
import com.br.gerenciador.main.repository.UsuarioRepository;
import com.br.gerenciador.main.security.ServicoToken;

@Controller
@RequestMapping("/auth")
public class UsuarioController {

    @Autowired
    private AuthenticationManager aut;

    @Autowired
    private UsuarioRepository repositorio;

    @Autowired
    private ServicoToken servicoToken;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginRespostaDTO> login (@RequestBody UsuarioDTO dto) {
        if (this.repositorio.findByLogin(dto.login()) == null) {
            throw new LoginErrorMessage("Login ou senha incorretos");
        }
        var loginSenha = new UsernamePasswordAuthenticationToken(dto.login(), dto.senha());
        var autenticacao = this.aut.authenticate(loginSenha);
        var token = servicoToken.gerarToken((Usuario) autenticacao.getPrincipal());
        return ResponseEntity.ok(new LoginRespostaDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario (@RequestBody RegistrarUsuarioDTO dto) {
       if (this.repositorio.findByLogin(dto.login()) != null) return ResponseEntity.badRequest().build();
       String senhaCriptografada = this.passwordEncoder.encode(dto.senha());
       Usuario novoUsuario = new Usuario(dto.nome(), dto.login(), senhaCriptografada, dto.perfil());
       this.repositorio.save(novoUsuario);
       return ResponseEntity.ok().build();
    }
}