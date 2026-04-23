package com.br.gerenciador.main.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.br.gerenciador.main.domain.dto.PedidoDTO;
import com.br.gerenciador.main.domain.dto.PedidoProjection;
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
    public ResponseEntity<Optional<Pedido>> listar(@RequestParam Long id) {
        var pedidos = service.listarPorId(id);
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/projection")
    public ResponseEntity<List<PedidoProjection>> listarProjection() {
        var pedidos = service.listarPedidosProjection();
        return ResponseEntity.ok(pedidos);
    }

    @PutMapping("/atualizar")
    public ResponseEntity<String> atualizar(@RequestBody PedidoDTO data) {
        service.atualizarPedido(data.id(), data);
        return ResponseEntity.ok("Pedido atualizado com sucesso!");
    }

    @PutMapping("/atualizarStatus")
    public ResponseEntity<String> atualizarStatus(@RequestParam Long id, @RequestParam String novoStatus) {
        service.atualizarStatus(id, novoStatus);
        return ResponseEntity.ok("Status do pedido atualizado com sucesso!");
    }

    @DeleteMapping("/excluir")
    public ResponseEntity<String> excluir(@RequestParam Long id) {
        service.excluirPedido(id);
        return ResponseEntity.ok("Pedido excluído com sucesso!");
    }
}