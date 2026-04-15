package com.br.gerenciador.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.gerenciador.main.domain.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {}