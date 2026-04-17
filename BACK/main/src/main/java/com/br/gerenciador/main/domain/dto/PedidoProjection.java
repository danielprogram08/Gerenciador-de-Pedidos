package com.br.gerenciador.main.domain.dto;

import java.time.LocalDateTime;

public interface PedidoProjection {
    Long getId();
    String getCliente();
    LocalDateTime getDataPedido();
    String getStatus();
}