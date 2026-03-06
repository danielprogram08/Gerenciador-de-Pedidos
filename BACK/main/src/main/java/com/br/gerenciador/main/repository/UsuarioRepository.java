package com.br.gerenciador.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.gerenciador.main.domain.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> buscarPorUsuario(String login, String senha);
}
