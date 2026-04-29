package com.br.gerenciador.main.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.br.gerenciador.main.domain.dto.ItemDTO;
import com.br.gerenciador.main.domain.dto.PedidoDTO;
import com.br.gerenciador.main.domain.dto.PedidoProjection;
import com.br.gerenciador.main.domain.entity.Item;
import com.br.gerenciador.main.domain.entity.Pedido;
import com.br.gerenciador.main.exception.OrderErrorMessage;
import com.br.gerenciador.main.repository.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository repository;

    @Transactional
    public PedidoDTO cadastrarPedido(PedidoDTO data) {
        try {
            Pedido pedido = new Pedido();
            pedido.setCliente(data.cliente());
            pedido.setEndereco(data.endereco());
            pedido.setDataPedido(data.dataPedido());
            
            List<Item> itens = data.itens().stream().map(itemDTO -> {
                Item item = new Item();
                item.setNome(itemDTO.nome());
                item.setPreco(itemDTO.preco());
                item.setQuantidade(itemDTO.quantidade());
                item.setTaxa(itemDTO.taxa());
                item.setPedido(pedido);
                return item;
            }).collect(Collectors.toList());
            
            pedido.setItens(itens);
            pedido.setTelefone(data.telefone());
            pedido.setStatus(data.status());
            
            repository.save(pedido);
            return data;
        } catch (Exception e) {
            throw new OrderErrorMessage("Erro ao cadastrar o pedido: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public Optional<Pedido> listarPorId(Long id) {
        return repository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<PedidoProjection> listarPedidosProjection() {
        return repository.findProjection();
    }

    @Transactional
    public PedidoDTO atualizarPedido(Long id, PedidoDTO data) {
        Pedido pedido = repository.findById(id)
                .orElseThrow(() -> new OrderErrorMessage("Pedido não encontrado com o ID: " + id));

        pedido.setCliente(data.cliente());
        pedido.setEndereco(data.endereco());
        pedido.setDataPedido(data.dataPedido());
        pedido.setTelefone(data.telefone());
        pedido.setStatus(data.status());
        
        List<Item> novosItens = data.itens().stream().map(itemDTO -> {
            Item item = new Item();
            item.setId(itemDTO.id());
            item.setNome(itemDTO.nome());
            item.setPreco(itemDTO.preco());
            item.setQuantidade(itemDTO.quantidade());
            item.setTaxa(itemDTO.taxa());
            item.setPedido(pedido);
            return item;
        }).collect(Collectors.toList());
    
        pedido.getItens().clear();
        pedido.getItens().addAll(novosItens);
        
        repository.save(pedido);
        return data;
    }

    @Transactional
    public void excluirPedido(Long id) {
        if (!repository.existsById(id)) {
            throw new OrderErrorMessage("Não é possível excluir: Pedido não encontrado com o ID: " + id);
        }
        repository.deleteById(id);
    }

    @Transactional
    public PedidoDTO atualizarStatus(Long id, String novoStatus) {
        Pedido pedido = repository.findById(id)
                .orElseThrow(() -> new OrderErrorMessage("Pedido não encontrado com o ID: " + id));

        pedido.setStatus(novoStatus);
        repository.save(pedido);

        return new PedidoDTO(
            pedido.getId(),
            pedido.getCliente(),
            pedido.getEndereco(),
            pedido.getDataPedido(),
            pedido.getItens().stream()
                .map(item -> new ItemDTO(
                    item.getId(),
                    item.getNome(),
                    item.getPreco(),
                    item.getQuantidade(),
                    item.getTaxa()
                ))
                .collect(Collectors.toList()),
            pedido.getTelefone(),
            pedido.getStatus()
        );
    }
}
