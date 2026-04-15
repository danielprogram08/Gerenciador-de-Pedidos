package com.br.gerenciador.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.gerenciador.main.domain.dto.PedidoDTO;
import com.br.gerenciador.main.domain.entity.Pedido;
import com.br.gerenciador.main.domain.entity.Item;
import com.br.gerenciador.main.repository.PedidoRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository repository;

    public PedidoDTO cadastrarPedido(PedidoDTO data) {
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
            item.setTotal(itemDTO.total());
            return item;
        }).collect(Collectors.toList());
        
        pedido.setItens(itens);
        pedido.setTelefone(data.telefone());
        pedido.setStatus(data.status());
        
        repository.save(pedido);
        return data;
    }

    public List<Pedido> listarPedidos() {
        return repository.findAll();
    }

}