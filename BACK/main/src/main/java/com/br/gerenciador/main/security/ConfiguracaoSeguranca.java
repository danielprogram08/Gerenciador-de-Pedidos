package com.br.gerenciador.main.security;

import java.sql.SQLException;

import org.springframework.security.config.Customizer;

import java.util.Arrays;
import java.util.List;

import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class ConfiguracaoSeguranca {

    @Autowired
    FiltroSeguranca filtroSeguranca;
	
	@Bean
	public SecurityFilterChain CorrenteFiltroSeguranca(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity
				.cors(Customizer.withDefaults())
				.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
						.requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
						.requestMatchers(HttpMethod.POST, "/pedidos/cadastrar").hasAuthority("ADMIN")
						.requestMatchers(HttpMethod.GET, "/pedidos/listar").hasAuthority("ADMIN")
						.requestMatchers(HttpMethod.GET, "/pedidos/projection").hasAuthority("ADMIN")
						.requestMatchers(HttpMethod.POST, "/pedidos/atualizar").hasAuthority("ADMIN")
						.requestMatchers(HttpMethod.DELETE, "/pedidos/excluir").hasAuthority("ADMIN")
						.requestMatchers("/error").permitAll()
						.anyRequest().authenticated()
				)
				.addFilterBefore(filtroSeguranca, UsernamePasswordAuthenticationFilter.class)
				.build();
	}

	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
	@Bean
	public AuthenticationManager ConfigAutenticacao(AuthenticationConfiguration ConfigAutenticacao) throws Exception {
		return ConfigAutenticacao.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder CriptografiaSenha () {
		return new BCryptPasswordEncoder();	
	}

	@Bean(initMethod = "start", destroyMethod = "stop")
    public Server h2Server() throws SQLException {
        return Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9092");
    }
}