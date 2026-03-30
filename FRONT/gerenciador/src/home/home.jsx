import img from "../../public/Neide.jpg"
import './home.css'

function Home() {
    
    const pedidos = [
        {
            id: 1,
            cliente: "Daniel",
            endereco: "Av. Maciel Bezerra 1490",
            dataPedido: "24/03/2026-17:31",
            Pedido: [
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
            <div className="container">
                <div className="titulo">
                    <img id="logo-hm" src={img} alt="alt" />
                    <h1>Gerenciador de Pedidos</h1>
                </div>
                <div className="status">
                    <div>atrasado</div>
                    <div>pendente</div>
                    <div>entregue</div>
                </div>
                <div className="pedidos">
                    {pedidos.map((pedido) => (
                        <ul key={pedido.id}>
                            <li>ID: {pedido.id}</li>
                            <li>Cliente: {pedido.cliente}</li>
                            <li>Data do Pedido: {pedido.dataPedido}</li>
                        </ul>
                    ))}
                </div>
                <div className="botoes">
                    <button className="addPedido">Adicionar Pedido</button>
                    <button className="entrergue">Marcar como Entregue</button>
                </div>
            </div>
        </>
    ) 
}

export default Home;