import './AddEdit.css';
import { useForm } from 'react-hook-form';
import { CgAdd } from "react-icons/cg";
import { useState } from 'react';

function AddEdit() {

    const { register, handleSubmit, reset } = useForm();
    const [Pedido, setPedido] = useState([]);
    const [itens, setItens] = useState([]);

    const cadastrarPedido = (pedido) => {
        const novoPedido = {
            nome: pedido.inputNome,
            endereco: pedido.inputEndereco,
            telefone: pedido.inputTelefone,
            item: [
                {
                    produto: pedido.inputProduto,
                    quantidade: pedido.inputQuantidade,
                    preco: pedido.inputValor
                }
            ],
            quantidade: pedido.inputQuantidade,
            valor: pedido.inputValor
        }
        setItens([...itens, novoPedido]);
        setPedido([...Pedido, novoPedido]);

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
                        <button type="button" className='btn-adicionar'>
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