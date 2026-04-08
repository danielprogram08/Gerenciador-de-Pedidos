import './AddEdit.css';
import { useForm } from 'react-hook-form';
import { CgAdd } from "react-icons/cg";
import { useState } from 'react';

function AddEdit() {

    const { register, handleSubmit, reset, resetField, getValues } = useForm();
    const [Pedido, setPedido] = useState([]);
    const [itens, setItens] = useState([]);

    const addItem = () => {
        const novoItem = {
            produto: getValues('inputProduto'),
            quantidade: getValues('inputQuantidade'),
            valor: getValues('inputValor'),
            total: getValues('inputQuantidade') * getValues('inputValor')
        }

        if (novoItem.produto === '' || novoItem.quantidade === '' || novoItem.valor === '') { alert("Preencha todos os campos!"); return; }

        setItens([...itens, novoItem]);
        resetField('inputProduto');
        resetField('inputQuantidade');
        resetField('inputValor');
    }

    const cadastrarPedido = (pedido) => {
        const novoPedido = {
            nome: pedido.inputNome,
            endereco: pedido.inputEndereco,
            telefone: pedido.inputTelefone,
            itens: itens,
            total: itens.reduce((total, item) => total + item.total, 0)
        }
        setPedido([...Pedido, novoPedido]);
        
        if (novoPedido.itens.length === 0 || novoPedido.nome === '' || novoPedido.endereco === '' || novoPedido.telefone === '') { alert("Preencha todos os campos!"); }

        console.log(Pedido);
        reset();
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
                                <li>Produto: {item.produto}</li>
                                <li>Quantidade: {item.quantidade}</li>
                                <li>Valor: R$ {item.valor}</li>
                                <li>Total: R$ {item.total}</li>
                            </ul>
                        ))}
                    </div>
                </div>
                <div className='botoes-editaveis'>
                    <button type="button" id='btn-cancelar' onClick={() => window.location.href = '/home'}>Cancelar</button>
                    <button type="submit" id='btn-salvar' onClick={handleSubmit(cadastrarPedido)}>Salvar Pedido</button>
                </div>
            </div>
        </>
    );
}

export default AddEdit;