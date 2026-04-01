import './infoPedido.css';

function infoPedido() {

     const pedidos = [
        {
            id: 1,
            cliente: "Daniel",
            endereco: "Av. Maciel Bezerra 1490",
            dataPedido: "24/03/2026-17:31",
            Itens: [
                {
                    pedido: "Vara de Cano", 
                    preco: 25.00,
                    quantidade: 1
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
                <div className='titulo-itens'>
                    <ul className='titulo-info-pedido'>
                        <div>ID</div>
                        <div>Cliente</div>
                        <div>Endereço</div>
                        <div>Itens</div>
                        <div>Data do Pedido</div>
                        <div>Telefone</div>
                    </ul>
                    {pedidos.map((pedido) => (
                        <ul key={pedido.id} className='info-pedido'>
                            <div id='id'>{pedido.id}</div>
                            <div id='cliente'>{pedido.cliente}</div>
                            <div id='endereco'>{pedido.endereco}</div>
                            {pedido.Itens.map((item) => (
                                <div key={item.pedido} id='itens'>
                                    <div id='item'>Item: {item.pedido}</div>
                                    <div id='preco'>Preço: {item.preco}</div>
                                    <div id='quantidade'>Quantidade: {item.quantidade}</div>
                                </div>
                            ))}
                            <div id='data'>{pedido.dataPedido}</div>
                            <div id='telefone'>{pedido.telefone}</div>
                        </ul>
                    ))}
                </div>
            </div>
        </>
    )
}

export default infoPedido;