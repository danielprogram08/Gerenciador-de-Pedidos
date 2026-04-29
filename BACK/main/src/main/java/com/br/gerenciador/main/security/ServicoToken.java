package com.br.gerenciador.main.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.br.gerenciador.main.domain.entity.Usuario;
import com.br.gerenciador.main.exception.TokenErrorMessage;

@Service
public class ServicoToken {

    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(Usuario usuario) {
        try {
            Algorithm algoritimo = Algorithm.HMAC256(secret);
            String token = JWT.create()
                .withIssuer("auth-api")
                .withSubject(usuario.getLogin())
                .withExpiresAt(gerarDataExpiracao())
                .sign(algoritimo);
            return token;
        } catch (JWTCreationException exception) {
            throw new TokenErrorMessage("Erro ao gerar token.");
        }
    }

    public String validarToken(String token) {
        try {
            Algorithm algoritimo = Algorithm.HMAC256(secret);
            return JWT.require(algoritimo)
                .withIssuer("auth-api")
                .build()
                .verify(token)
                .getSubject();
        } catch (JWTVerificationException exception) {
            throw new TokenErrorMessage("Token inválido ou expirado.");
        }
    }

    private Instant gerarDataExpiracao() {
        return Instant.now().plus(2, ChronoUnit.HOURS);
    }
}