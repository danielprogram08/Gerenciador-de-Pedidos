package com.br.gerenciador.main.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;

import com.br.gerenciador.main.domain.dto.PedidoProjection;
import com.br.gerenciador.main.domain.entity.Pedido;

@DataJpaTest
public class PedidoRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Test
    public void findProjection_DeveRetornarUmaListaDeProjecaoDePedido() {
        Pedido pedido = new Pedido();

        entityManager.persistAndFlush(pedido);

        List<PedidoProjection> projections = pedidoRepository.findProjection();

        assertThat(projections).isNotEmpty();
        assertThat(projections).hasSize(1);
    }
}