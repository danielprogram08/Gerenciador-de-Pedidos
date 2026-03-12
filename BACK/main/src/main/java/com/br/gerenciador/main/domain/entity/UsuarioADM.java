package com.br.gerenciador.main.domain.entity;

public enum UsuarioADM {

    ADMIN("admin");

    private String perfil;

    UsuarioADM(String perfil) {
        this.perfil = perfil;
    }

    public String getPerfil() {
        return perfil;
    }

}