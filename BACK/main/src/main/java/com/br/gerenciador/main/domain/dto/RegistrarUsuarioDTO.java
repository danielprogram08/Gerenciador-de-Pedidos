package com.br.gerenciador.main.domain.dto;

import com.br.gerenciador.main.domain.entity.UsuarioADM;

public record RegistrarUsuarioDTO(String nome, String login, String senha, UsuarioADM perfil) {}