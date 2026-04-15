package com.br.gerenciador.main.domain.dto;

import java.time.LocalDateTime;

public record PedidoProjection(Long id, String cliente, LocalDateTime dataPedido, String status) {}