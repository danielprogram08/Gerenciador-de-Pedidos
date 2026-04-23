import './AddEdit.css';
import { useForm } from 'react-hook-form';
import { CgAdd } from "react-icons/cg";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEdit() {

    const { register, handleSubmit, reset, resetField, getValues } = useForm();
    const [Pedido, setPedido] = useState([]);
    const [itens, setItens] = useState([]);
    const navigate = useNavigate();

    const addItem = () => {
        const novoItem = {
            nome: getValues('inputProduto'),
            preco: parseFloat(getValues('inputValor')),
            quantidade: parseInt(getValues('inputQuantidade'), 10),
            taxa: parseFloat(getValues('inputTaxa')) || 0
        }

        if (!novoItem.nome || isNaN(novoItem.quantidade) || isNaN(novoItem.preco)) { alert("Preencha todos os campos do item!"); return; }

        setItens([...itens, novoItem]);
        resetField('inputProduto');
        resetField('inputQuantidade');
        resetField('inputValor');
        resetField('inputTaxa');
    }

    const cadastrarPedido = (pedido) => {
        const now = new Date();
        const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().substring(0, 19);

        const novoPedido = {
            cliente: pedido.inputNome,
            endereco: pedido.inputEndereco,
            telefone: pedido.inputTelefone,
            itens: itens,
            dataPedido: localDateTime,
            status: "pendente"
        }
        
        if (novoPedido.itens.length === 0 || novoPedido.cliente === '' || novoPedido.endereco === '' || novoPedido.telefone === '') { 
            alert("Preencha todos os campos!"); 
            return;
        }

        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/pedidos/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(novoPedido)
        })
        .then(response => {
            if (response.ok) {
                alert("Pedido cadastrado com sucesso!");
                setPedido([...Pedido, novoPedido]);
                reset();
                setItens([]);
            } else {
                alert("Sessão expirada ou sem permissão. Faça login novamente.");
            }
        })
        .catch(error => console.error("Erro ao salvar pedido:", error));
    }
    
    return (
        <>
            <div className='addEdit-container'>
                <h1 className='addEdit-titulo'>Adicionar/Editar Pedido</h1>
                <div className='container-divisor'>
                    <form className='addEdit-formulario' onSubmit={handleSubmit(cadastrarPedido)}>
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
                            <input type="number" id="inputValor" placeholder='Valor do item:' {...register('inputValor')} />
                            <label htmlFor="inputTaxa">Taxa:</label>
                            <input type="number" id="inputTaxa" placeholder='Valor da taxa:' {...register('inputTaxa')} />
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
                            </ul>
                        ))}
                    </div>
                </div>
                <div className='botoes-editaveis'>
                    <button type="button" id='btn-cancelar' onClick={() => navigate('/home')}>Cancelar</button>
                    <button type="submit" id='btn-salvar' onClick={handleSubmit(cadastrarPedido)}>Salvar Pedido</button>
                </div>
            </div>
        </>
    );
}

export default AddEdit;