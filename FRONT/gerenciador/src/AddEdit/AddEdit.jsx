import './AddEdit.css';
import { useForm } from 'react-hook-form';
import { CgAdd } from "react-icons/cg";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddEdit() {

    const location = useLocation();
    const pedidoParaEditar = location.state;
    const isEditMode = !!pedidoParaEditar;

    const { register, handleSubmit, reset, resetField, getValues, setValue } = useForm();
    const [itens, setItens] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode && pedidoParaEditar) {
            setValue('inputNome', pedidoParaEditar.cliente);
            setValue('inputEndereco', pedidoParaEditar.endereco);
            setValue('inputTelefone', pedidoParaEditar.telefone);
            setItens(pedidoParaEditar.itens || []);
        }
    }, [isEditMode, pedidoParaEditar, setValue]);

    const addItem = () => {
        const novoItem = {
            nome: getValues('inputProduto'),
            preco: parseFloat(getValues('inputValor')),
            quantidade: parseInt(getValues('inputQuantidade'), 10),
            taxa: parseFloat(getValues('inputTaxa')) || 0,
        }
        if (!novoItem.nome || isNaN(novoItem.quantidade) || isNaN(novoItem.preco)) { alert("Preencha todos os campos do item!"); return; }
        
        novoItem.total = (novoItem.preco * novoItem.quantidade) + novoItem.taxa;
        setItens([...itens, novoItem]);
        resetField('inputProduto');
        resetField('inputQuantidade');
        resetField('inputValor');
        resetField('inputTaxa');
    }

    const removerItem = (indexParaRemover) => {
        setItens(itens.filter((_, index) => index !== indexParaRemover));
    }

    const handleEdit = (data) => {
        const now = new Date();
        const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().substring(0, 19);

        const pedidoAtualizado = {
            cliente: data.inputNome,
            endereco: data.inputEndereco,
            dataPedido: localDateTime,
            itens: itens,
            telefone: data.inputTelefone,
            status: pedidoParaEditar.status,
        };

        if (pedidoAtualizado.itens.length === 0 || pedidoAtualizado.cliente === ""|| pedidoAtualizado.endereco === "" || pedidoAtualizado.telefone === "") {
            alert("Preencha todos os campos do pedido!");
            return;
        }

        const token = localStorage.getItem('token');

        fetch(`http://localhost:8080/pedidos/atualizar?id=${pedidoParaEditar.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(pedidoAtualizado)
        })
        .then(response => {
            if (response.ok) {
                alert("Pedido editado com sucesso!");
                reset();
                navigate("/home");
            } else {
                alert("Falha ao editar o pedido. Verifique sua sessão.");
            }
        })
        .catch(error => console.error("Erro ao editar pedido:", error));
    }

    const cadastrarPedido = (data) => {
        const now = new Date();
        const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().substring(0, 19);

        const novoPedido = {
            cliente: data.inputNome,
            endereco: data.inputEndereco,
            telefone: data.inputTelefone,
            itens: itens,
            dataPedido: localDateTime,
            status: "pendente"
        }
        
        if (novoPedido.itens.length === 0 || !novoPedido.cliente || !novoPedido.endereco || !novoPedido.telefone) { 
            alert("Preencha todos os campos e adicione pelo menos um item!"); 
            return;
        }

        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/pedidos/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(novoPedido)
        })
        .then(response => {
            if (response.ok) {
                alert("Pedido cadastrado com sucesso!");
                reset();
                setItens([]);
                navigate('/home');
            } else {
                alert("Sessão expirada ou sem permissão. Faça login novamente.");
                navigate('/');
            }
        })
        .catch(error => console.error("Erro ao salvar pedido:", error));
    }
    
    const onSubmit = (data) => {
        if (isEditMode) {
            handleEdit(data);
        } else {
            cadastrarPedido(data);
        }
    };

    return (
        <>
            <div className='addEdit-container'>
                <h1 className='addEdit-titulo'>{isEditMode ? 'Editar Pedido' : 'Adicionar Pedido'}</h1>
                <div className='container-divisor'>
                    <form className='addEdit-formulario' onSubmit={handleSubmit(onSubmit)}>
                        <div className='dados-cliente'>
                            <label htmlFor="inputNome">Nome do Cliente:</label>
                            <input type="text" id="inputNome" placeholder='Nome do Cliente:' {...register('inputNome')} />
                            <label htmlFor="inputEndereco">Endereço de Entrega:</label>
                            <input type="text" id="inputEndereco" placeholder='Endereço de Entrega:' {...register('inputEndereco')} />
                            <label htmlFor="inputTelefone">Telefone:</label>
                            <input type="text" id="inputTelefone" placeholder='Telefone:' {...register('inputTelefone')} />
                        </div>
                        <div className='dados-pedido'>
                            <label htmlFor="inputProduto">Produto:</label>
                            <input type="text" id="inputProduto" placeholder='Item:' {...register('inputProduto')} />
                            <label htmlFor="inputQuantidade">Quantidade:</label>
                            <input type="number" id="inputQuantidade" placeholder='Quantidade do item:' {...register('inputQuantidade')} />
                            <label htmlFor="inputValor">Valor:</label>
                            <input type="number" id="inputValor" placeholder='Valor do item:' {...register('inputValor')} step="0.01" />
                            <label htmlFor="inputTaxa">Taxa:</label>
                            <input type="number" id="inputTaxa" placeholder='Valor da taxa:' {...register('inputTaxa')} step="0.01" />
                        </div>
                        <button type="button" className='btn-adicionar' onClick={addItem}>
                            <CgAdd/>
                            Adicionar Item
                        </button>
                    </form>
                    <div className='lista-itens'>
                    <h2>Lista de Itens</h2>
                        {itens.map((item, index) => (
                            <ul key={index}>
                                <li>Produto: {item.nome}</li>
                                <li>Quantidade: {item.quantidade}</li>
                                <li>Valor: R$ {item.preco ? item.preco.toFixed(2) : '0.00'}</li>
                                <li>Taxa: R$ {item.taxa ? item.taxa.toFixed(2) : '0.00'}</li>
                                <li>Total: R$ {item.total ? item.total.toFixed(2) : '0.00'}</li>
                                <button className='btn-remover-item' type="button" onClick={() => removerItem(index)}>Remover</button>
                            </ul>
                        ))}
                    </div>
                </div>
                <div className='botoes-editaveis'>
                    <button type="button" id='btn-cancelar' onClick={() => navigate('/home')}>Cancelar</button>
                    <button type="submit" id='btn-salvar' onClick={handleSubmit(onSubmit)}>Salvar Pedido</button>
                </div>
            </div>
        </>
    );
}

export default AddEdit;