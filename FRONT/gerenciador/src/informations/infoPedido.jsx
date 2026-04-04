import './infoPedido.css';
import { Fragment } from 'react';
import { FaWhatsapp, FaPrint } from 'react-icons/fa';

function InfoPedido() {

     const pedidos = [
        {
            id: 1,
            cliente: "Daniel",
            endereco: "Av. Maciel Bezerra 1490",
            dataPedido: "24/03/2026-17:31",
            Itens: [
                {
                    id: 1,
                    pedido: "Vara de Cano de 50m", 
                    preco: 25.00,
                    quantidade: 1
                },
                {
                    id: 2,
                    pedido: "Vara de Cano 2", 
                    preco: 30.00,
                    quantidade: 2
                }
            ],
            taxa: 2.00,
            total: 27.00,
            telefone: "85 98648-1992"
        }
    ]
    
    return (
        <>
            <div className='container-info-pedido'>
                <div className='titulo-pd'>
                    <img id='logo-pd' src='/Neide.jpg' alt='Logo Neide' />
                    <h1 id='titulo-pd-h1'>Informações do Pedido</h1>
                </div>
                <div className='titulo-pedido-container'>
                    <ul className='titulo-info-pedido'>
                        <p>Cliente</p>
                        <p>Endereço</p>
                        <p>Data do Pedido</p>
                        <p>Telefone</p>
                    </ul>
                    {pedidos.map((pedido) => (
                    <Fragment key={pedido.id}>
                        <ul className='info-pedido'>
                            <div id='cliente'>{pedido.cliente}</div>
                            <div id='endereco'>{pedido.endereco}</div>
                            <div id='data'>{pedido.dataPedido}</div>
                            <div id='telefone'>{pedido.telefone}</div>
                        </ul>
                        <div className='titulo-info-itens'>
                            <p>Itens</p>
                            <p>Preço</p>
                            <p>Quantidade</p>
                        </div>
                        {pedido.Itens.map((item) => (
                            <ul key={item.id} className='info-itens'>
                                <div id='pedido'>{item.pedido}</div>
                                <div id='preco'>R$ {item.preco.toFixed(2)}</div>
                                <div id='quantidade'>{item.quantidade}</div>
                            </ul>
                        ))}
                        <div className='botoes-opcionais'>
                            <button id='enviarWhatsapp'>
                                <FaWhatsapp id='icone-whatsapp' />
                            </button>
                            <button id='imprimir'>
                                <FaPrint id='icone-imprimir' />
                            </button>
                        </div>
                    </Fragment>
                    ))}
                </div>
                <div className='botoes'>
                    <button id='editar'>Editar</button>
                    <button id='entregue'>Marcar como entregue</button>
                </div>
            </div>
        </>
    )
}

export default InfoPedido;