package com.br.gerenciador.main.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.br.gerenciador.main.domain.entity.Usuario;

@Service
public class ServicoToken {

    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(Object usuario) {
        try {
            Algorithm algoritimo = Algorithm.HMAC256(secret);
            String token = JWT.create()
                .withIssuer("auth-api")
                .withSubject(((Usuario) usuario).getLogin())
                .withExpiresAt(gerarDataExpiracao())
                .sign(algoritimo);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro enquanto gerava o token.", exception);
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
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Token inválido ou expirado.", exception);
        }
    }

    private Instant gerarDataExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}