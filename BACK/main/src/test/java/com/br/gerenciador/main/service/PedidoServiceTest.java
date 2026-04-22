package com.br.gerenciador.main.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.br.gerenciador.main.domain.dto.ItemDTO;
import com.br.gerenciador.main.domain.dto.PedidoDTO;
import com.br.gerenciador.main.domain.dto.PedidoProjection;
import com.br.gerenciador.main.domain.entity.Item;
import com.br.gerenciador.main.domain.entity.Pedido;
import com.br.gerenciador.main.repository.PedidoRepository;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @InjectMocks
    private PedidoService pedidoService;

    private PedidoDTO pedidoDTO;
    private ItemDTO itemDTO;
    private Pedido pedido;

    @BeforeEach
    void setUp() {
        itemDTO = new ItemDTO(null, "Cimento", 45.00, 1, 2.0);
        pedidoDTO = new PedidoDTO(
                null,
                "João da Silva",
                "Rua das Flores, 123",
                LocalDateTime.parse("2026-04-21T22:30:00"),
                Collections.singletonList(itemDTO),
                "11987654321",
                "pendente"
        );

        pedido = new Pedido();
        pedido.setId(1L);
        pedido.setCliente(pedidoDTO.cliente());
        pedido.setEndereco(pedidoDTO.endereco());
        pedido.setDataPedido(pedidoDTO.dataPedido());
        pedido.setItens(new ArrayList<>(pedidoDTO.itens().stream().map(item -> {
            Item itemEntity = new Item();
            itemEntity.setNome(item.nome());
            itemEntity.setPreco(item.preco());
            return itemEntity;
        }).toList()));
        pedido.setTelefone(pedidoDTO.telefone());
        pedido.setStatus(pedidoDTO.status());
    }

    @Test
    @DisplayName("Deve cadastrar um novo pedido com sucesso")
    void cadastrarPedido_ComDadosValidos_DeveSalvarPedido() {
        ArgumentCaptor<Pedido> pedidoCaptor = ArgumentCaptor.forClass(Pedido.class);

        PedidoDTO resultado = pedidoService.cadastrarPedido(pedidoDTO);

        verify(pedidoRepository).save(pedidoCaptor.capture());
        Pedido pedidoSalvo = pedidoCaptor.getValue();

        assertThat(resultado).isEqualTo(pedidoDTO);
        assertThat(pedidoSalvo.getCliente()).isEqualTo(pedidoDTO.cliente());
        assertThat(pedidoSalvo.getEndereco()).isEqualTo(pedidoDTO.endereco());
        assertThat(pedidoSalvo.getStatus()).isEqualTo(pedidoDTO.status());
        assertThat(pedidoSalvo.getItens()).hasSize(1);
        assertThat(pedidoSalvo.getItens().get(0).getNome()).isEqualTo("Cimento");
        assertThat(pedidoSalvo.getItens().get(0).getPedido()).isEqualTo(pedidoSalvo);
    }

    @Test
    @DisplayName("Deve listar todos os pedidos como projeções")
    void listarPedidosProjection_DeveRetornarListaDeProjections() {
        PedidoProjection projectionMock = mock(PedidoProjection.class);
        List<PedidoProjection> listaProjetada = Collections.singletonList(projectionMock);
        when(pedidoRepository.findProjection()).thenReturn(listaProjetada);

        List<PedidoProjection> resultado = pedidoService.listarPedidosProjection();

        assertThat(resultado).isNotNull().hasSize(1);
        assertThat(resultado.get(0)).isEqualTo(projectionMock);
        verify(pedidoRepository).findProjection();
    }

    @Test
    @DisplayName("Deve listar um pedido por ID quando ele existir")
    void listarPorId_QuandoIdExiste_DeveRetornarOptionalComPedido() {
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        Optional<Pedido> resultado = pedidoService.listarPorId(1L);

        assertThat(resultado).isPresent().contains(pedido);
        verify(pedidoRepository).findById(1L);
    }

    @Test
    @DisplayName("Deve retornar Optional vazio ao listar por ID que não existe")
    void listarPorId_QuandoIdNaoExiste_DeveRetornarOptionalVazio() {
        when(pedidoRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Pedido> resultado = pedidoService.listarPorId(99L);

        assertThat(resultado).isNotPresent();
        verify(pedidoRepository).findById(99L);
    }

    @Test
    @DisplayName("Deve atualizar um pedido com sucesso quando o ID existir")
    void atualizarPedido_QuandoIdExiste_DeveAtualizarEretornarDTO() {
        ItemDTO itemAtualizadoDTO = new ItemDTO(null, "Cimento", 45.000, 2,22.0);
        PedidoDTO dtoAtualizado = new PedidoDTO(1L, "Maria Souza", "Avenida Principal, 456", LocalDateTime.parse("2026-04-21T23:00:00"), Collections.singletonList(itemAtualizadoDTO), "11912345678", "entregue");

        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));
        ArgumentCaptor<Pedido> pedidoCaptor = ArgumentCaptor.forClass(Pedido.class);

        PedidoDTO resultado = pedidoService.atualizarPedido(1L, dtoAtualizado);

        verify(pedidoRepository).save(pedidoCaptor.capture());
        Pedido pedidoSalvo = pedidoCaptor.getValue();

        assertThat(resultado).isEqualTo(dtoAtualizado);
        assertThat(pedidoSalvo.getCliente()).isEqualTo("Maria Souza");
        assertThat(pedidoSalvo.getStatus()).isEqualTo("entregue");
        assertThat(pedidoSalvo.getItens()).hasSize(1);
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar atualizar pedido com ID inexistente")
    void atualizarPedido_QuandoIdNaoExiste_DeveLancarRuntimeException() {
        when(pedidoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> pedidoService.atualizarPedido(99L, pedidoDTO)).isInstanceOf(RuntimeException.class).hasMessage("Pedido não encontrado com o ID: 99");
        verify(pedidoRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve excluir um pedido com sucesso")
    void excluirPedido_QuandoIdExiste_DeveChamarDeleteById() {
        Long idParaExcluir = 1L;
        doNothing().when(pedidoRepository).deleteById(idParaExcluir);

        pedidoService.excluirPedido(idParaExcluir);

        verify(pedidoRepository, times(1)).deleteById(idParaExcluir);
    }
}