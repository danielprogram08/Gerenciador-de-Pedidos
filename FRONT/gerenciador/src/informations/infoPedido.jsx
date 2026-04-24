import './infoPedido.css';
import { Fragment } from 'react';
import { FaWhatsapp, FaPrint } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function InfoPedido() {

    const location = useLocation();
    const pedido = location.state;

    const Navigate = useNavigate();
    const homepage = () => { Navigate('/home'); }
    const editPedido = () => {
        Navigate('/addEdit', { state: pedido }); 
    }

    const marcarComoEntregue = () => {
        const token = localStorage.getItem('token');
        const pedidoId = pedido.id;

        fetch(`http://localhost:8080/pedidos/atualizarStatus?id=${pedidoId}&novoStatus=entregue`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (response.ok) {
                alert("Pedido marcado como entregue com sucesso!");
                Navigate('/home');
            } else {
                alert("Falha ao marcar o pedido como entregue. Verifique sua sessão.");
            }
        })
        .catch(error => console.error("Erro ao marcar o pedido como entregue:", error));
    }
    
    if (!pedido) {
        return <div className="container-info-pedido"><h2>Pedido não encontrado.</h2><button onClick={homepage}>Voltar</button></div>;
    }

    return (
        <>
            <div className='container-info-pedido'>
                <div className='titulo-pd'>
                    <img id='logo-pd' src='/Neide.jpg' alt='Logo Neide' onClick={homepage} />
                    <h1 id='titulo-pd-h1'>Informações do Pedido</h1>
                </div>
                <div className='titulo-pedido-container'>
                    <ul className='titulo-info-pedido'>
                        <p>Cliente</p>
                        <p>Endereço</p>
                        <p>Data do Pedido</p>
                        <p>Telefone</p>
                    </ul>
                    <Fragment>
                        <ul className='info-pedido'>
                            <div id='cliente'>{pedido.cliente}</div>
                            <div id='endereco'>{pedido.endereco}</div>
                            <div id='data'>{pedido.dataPedido}</div>
                            <div id='telefone'>{pedido.telefone}</div>
                        </ul>
                        <div className='titulo-info-itens'>
                            <p>Itens</p>
                            <p>Quantidade</p>
                            <p>Preço</p>
                            <p>Taxa</p>
                            <p>Valor Total</p>
                        </div>
                        {pedido.itens && pedido.itens.map((item, index) => (
                            <ul key={item.id || index} className='info-itens'>
                                <div id='pedido'>{item.nome || item.produto}</div>
                                <div id='quantidade'>{item.quantidade}</div>
                                <div id='preco'>R$ {item.preco ? item.preco.toFixed(2) : '0.00'}</div>
                                <div id='taxa'>R$ {item.taxa ? item.taxa.toFixed(2) : '0.00'}</div>
                                <div id='total'>R$ {item.total ? item.total.toFixed(2) : '0.00'}</div>
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
                </div>
                <div className='botoes'>
                    <button id='editar' onClick={editPedido}>Editar</button>
                    <button id='entregue' onClick={marcarComoEntregue}>Marcar como entregue</button>
                </div>
            </div>
        </>
    )
}

export default InfoPedido;