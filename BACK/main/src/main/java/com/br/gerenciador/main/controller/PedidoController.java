package com.br.gerenciador.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.br.gerenciador.main.domain.dto.PedidoDTO;
import com.br.gerenciador.main.domain.entity.Pedido;
import com.br.gerenciador.main.service.PedidoService;

@Controller
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody PedidoDTO data) {
        service.cadastrarPedido(data);
        return ResponseEntity.ok("Pedido cadastrado com sucesso!");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Pedido>> listar() {
        var pedidos = service.listarPedidos();
        return ResponseEntity.ok(pedidos);
    }

}