import './home.css';
import { useState, useEffect } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Home() {

    const Navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`${API_URL}/pedidos/projection`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(async response => {
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    alert("Sessão expirada. Faça login novamente.");
                    Navigate('/');
                }
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return await response.json();
        })
        .then(data => {
            const agora = new Date();
            const pedidosAtualizados = data.map(pedido => {
                const dataDoPedido = new Date(pedido.dataPedido);
                const horasPassadas = (agora - dataDoPedido) / (1000 * 60 * 60);

                if (horasPassadas > 1 && pedido.status?.toLowerCase() === 'pendente') {
                    fetch(`${API_URL}/pedidos/atualizarStatus?id=${pedido.id}&novoStatus=atrasado`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).catch(error => console.error("Erro ao atualizar status para atrasado:", error));
                    
                    return { ...pedido, status: 'atrasado' };
                }
                return pedido;
            });

            setPedidos(pedidosAtualizados);
        })
        .catch(error => {
            console.error("Erro ao carregar dados:", error);
        });
    }, [Navigate]);

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
    
    const infoPedido = async (id) => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${API_URL}/pedidos/listar?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

            const dataPedido = await response.json();
            Navigate('/infoPedido', { state: dataPedido }); 

        } catch (error) {
            console.error("Erro ao buscar os detalhes do pedido:", error);
            alert("Não foi possível carregar os dados deste pedido.");
        }
    }

    const deletePedido = async (id) => {
        if (!window.confirm("Deseja realmente excluir este pedido?")) return;

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${API_URL}/pedidos/excluir?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

            setPedidos(pedidos.filter(pedido => pedido.id !== id));

        } catch (error) {
            console.error("Erro ao excluir o pedido:", error);
            alert("Não foi possível excluir o pedido.");
        }
    }

    const pedidosFiltrados = pedidos.filter(pedido => {
        if (atrasado) return pedido.status?.toLowerCase() === 'atrasado';
        if (pendente) return pedido.status?.toLowerCase() === 'pendente';
        if (entregue) return pedido.status?.toLowerCase() === 'entregue';
        return true;
    });

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
                    {pedidosFiltrados.map((pedido) => (
                        <ul key={pedido.id} className="lista" onClick={() => infoPedido(pedido.id)}>
                            <div id="pedido-id">{pedido.id}</div>
                            <div id="pedido-cliente">{pedido.cliente}</div>
                            <div id="pedido-data">Data do Pedido: {new Date(pedido.dataPedido).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                            <FaTrashAlt id='trash-icon' onClick={(e) => {
                                e.stopPropagation();
                                deletePedido(pedido.id);
                            }}></FaTrashAlt>
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