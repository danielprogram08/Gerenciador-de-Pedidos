package com.br.gerenciador.main.domain.dto;

import java.time.LocalDateTime;
import java.util.List;

public record PedidoDTO(Long id, String cliente, String endereco, LocalDateTime dataPedido, List<ItemDTO> itens, String telefone, String status) {}