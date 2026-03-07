package com.br.gerenciador.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.gerenciador.main.domain.dto.UsuarioDTO;
import com.br.gerenciador.main.domain.entity.Usuario;
import com.br.gerenciador.main.exception.LoginErrorMessage;
import com.br.gerenciador.main.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Optional<Usuario> validarLogin(UsuarioDTO usuario) {
        Usuario usuarioEntity = new Usuario(usuario.login(), usuario.senha());
        if (!repository.findByLoginAndSenha(usuarioEntity.getLogin(), usuarioEntity.getSenha()).isPresent()) {
            throw new LoginErrorMessage("Login ou senha inválidos!");
        }
        return repository.findByLoginAndSenha(usuarioEntity.getLogin(), usuarioEntity.getSenha());
    }
}