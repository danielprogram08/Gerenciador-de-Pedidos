import './home.css'
import { useState } from "react"
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Home() {

    const Navigate = useNavigate();

    const pedidos = [
        {
            id: 1,
            cliente: "Daniel",
            endereco: "Av. Maciel Bezerra 1490",
            dataPedido: "24/03/2026-17:31",
            Item: [
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

    const [atrasado, setAtrasado] = useState(false);
    const [pendente, setPendente] = useState(false);
    const [entregue, setEntregue] = useState(false);

    const PedidoAtrasado = () => {
        setAtrasado(!atrasado);
        setPendente(false);
        setEntregue(false);
    }

    const PedidoPendente = () => {
        setPendente(!pendente);
        setAtrasado(false);
        setEntregue(false);
    }

    const PedidoEntregue = () => {
        setEntregue(!entregue);
        setAtrasado(false);
        setPendente(false);
    }

    const sair = () => { Navigate('/'); }
    const addPedido = () => { Navigate('/addEdit'); }
    const infoPedido = () => { Navigate('/infoPedido'); }

    /*const infoPedido = async () => {
        const dataPedido = await api.get('/infoPedido'); 
        Navigate('/infoPedido', { state: dataPedido }); 
    }*/

    return (
        <>
            <div className="container-fluido">
                <div className="titulo">
                    <img id="logo-hm" src="/Neide.jpg" alt="Logo Neide" />
                    <h1 id="titulo-h1">Gerenciador de Pedidos</h1>
                </div>
                <div className="status">
                <button className={atrasado ? "atrasado" : "atrasado-transparente"} onClick={PedidoAtrasado}>Atrasado</button>
                    <button className={pendente ? "pendente" : "pendente-transparente"} onClick={PedidoPendente}>Pendente</button>
                    <button className={entregue ? "entregue" : "entregue-transparente"} onClick={PedidoEntregue}>Entregue</button>
                </div>
                <div className="pedidos">
                    <ul className="titulo-lista">
                        <div>ID</div>
                        <div>Cliente</div>
                        <div>Data do Pedido</div>
                    </ul>
                    {pedidos.map((pedido) => (
                        <ul key={pedido.id} className="lista" onClick={infoPedido}>
                            <div id="pedido-id">{pedido.id}</div>
                            <div id="pedido-cliente">{pedido.cliente}</div>
                            <div id="pedido-data">Data do Pedido: {pedido.dataPedido}</div>
                            <FaTrashAlt id='trash-icon'></FaTrashAlt>
                        </ul>
                    ))}
                </div>
                <div className="botoes">
                    <button className="sair" onClick={sair}>Sair</button>
                    <button className="addPedido" onClick={addPedido}>Adicionar Pedido</button>
                </div>
            </div>
        </>
    ) 
}

export default Home;