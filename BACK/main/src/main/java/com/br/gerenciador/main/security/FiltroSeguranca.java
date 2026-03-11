package com.br.gerenciador.main.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.br.gerenciador.main.repository.UsuarioRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class FiltroSeguranca extends OncePerRequestFilter {

    @Autowired
    private ServicoToken servicoToken;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain correnteFiltro) throws ServletException, IOException {
        var token = this.recuperarToken(req);
        if (token != null) {
            var login = servicoToken.validarToken(token);
            UserDetails usuario = usuarioRepository.findByLogin(login);
            var autenticacao = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(autenticacao);
        }
        correnteFiltro.doFilter(req, res);
    }

    private String recuperarToken(HttpServletRequest req) {
        var authHeader = req.getHeader("Autorizacao");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }

}