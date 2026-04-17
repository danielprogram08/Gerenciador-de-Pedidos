package com.br.gerenciador.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.br.gerenciador.main.domain.dto.PedidoProjection;
import com.br.gerenciador.main.domain.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query(nativeQuery = true, value = "SELECT ID, CLIENTE, DATA_PEDIDO, STATUS FROM PEDIDO")
    List<PedidoProjection> findProjection();
}