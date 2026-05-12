import './infoPedido.css';
import { Fragment } from 'react';
import { FaWhatsapp, FaPrint } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

function InfoPedido() {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    const location = useLocation();
    const pedido = location.state;

    const Navigate = useNavigate();
    const homepage = () => { Navigate('/home'); }
    const editPedido = () => {
        Navigate('/addEdit', { state: pedido }); 
    }

    const gerarTextoPedido = () => {
        const itens = pedido.itens || [];
        const totalPedido = itens.reduce((acc, item) => acc + (item.total || 0), 0);
        const itensTexto = itens.map(item => `- ${item.nome || item.produto} (x${item.quantidade})`).join('\n');
        
        return `
====𝐍𝐄𝐈𝐃𝐄 𝐂𝐎𝐍𝐒𝐓𝐑𝐔ÇÕ𝐄𝐒 & 𝐑𝐀ÇÕ𝐄𝐒====

*𝐎𝐑Ç𝐀𝐌𝐄𝐍𝐓𝐎:*

*𝐂𝐋𝐈𝐄𝐍𝐓𝐄:* ${pedido.cliente}

*𝐄𝐍𝐃𝐄𝐑𝐄Ç𝐎:* ${pedido.endereco}

*𝐈𝐓𝐄𝐍𝐒:*
${itensTexto}

*𝐓𝐎𝐓𝐀𝐋:* R$ ${totalPedido.toFixed(2)}

*𝐎𝐁𝐒: 𝐄𝐍𝐓𝐑𝐄𝐆𝐀𝐒 𝐀 𝐏𝐀𝐑𝐓𝐈𝐑 𝐃𝐄 𝐑$ 𝟑𝟎,𝟎𝟎*

*𝐅𝐑𝐄𝐓𝐄 𝐆𝐑Á𝐓𝐈𝐒 𝐏𝐀𝐑𝐀 𝐂𝐎𝐌𝐏𝐑𝐀𝐒 𝐀𝐂𝐈𝐌𝐀 𝐃𝐄 𝐑$ 𝟓𝟎,𝟎𝟎*

======================================`;
    }

    const enviarWhatsapp = () => {
        const telefone = pedido.telefone;
        const texto = gerarTextoPedido();
        
        const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank');
    }

    const imprimirPedido = () => {
        const texto = gerarTextoPedido();
        const novaJanela = window.open('', '_blank');
        novaJanela.document.write(`
            <html>
            <head>
                <title>Pedido</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <pre>${texto}</pre>
            </body>
            </html>
        `);
        novaJanela.document.close();
        novaJanela.print();
    }

    const marcarComoEntregue = () => {
        const token = localStorage.getItem('token');
        const pedidoId = pedido.id;

        fetch(`${API_URL}/pedidos/atualizarStatus?id=${pedidoId}&novoStatus=entregue`, {
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
        .catch(error => {
            console.error("Erro ao marcar o pedido como entregue:", error);
            alert("Erro de rede: Não foi possível conectar ao servidor. Verifique sua conexão e se a API está online.");
        });
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
                            <button id='enviarWhatsapp' onClick={enviarWhatsapp}>
                                <FaWhatsapp id='icone-whatsapp' />
                            </button>
                            <button id='imprimir' onClick={imprimirPedido}>
                                <FaPrint id='icone-print' />
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