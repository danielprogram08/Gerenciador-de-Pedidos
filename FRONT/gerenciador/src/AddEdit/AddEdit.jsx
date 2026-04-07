import './AddEdit.css';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

function AddEdit() {

    const { register, handleSubmit, reset } = useForm();

    const cadastrarPedido = (pedido) => {
        console.log(pedido);
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
                        </div>
                        <div className='dados-pedido'>
                            <label htmlFor="inputProduto">Produto:</label>
                            <input type="text" id="inputProduto" placeholder='Item:' {...register('inputProduto')} />
                            <label htmlFor="inputQuantidade">Quantidade:</label>
                            <input type="number" id="inputQuantidade" placeholder='Quantidade do item:' {...register('inputQuantidade')} />
                        </div>
                        <button type="button" className='btn-adicionar'>
                            <FaPlus />
                            Adicionar Item
                        </button>
                    </form>
                    <div className='lista-itens'>
                    <h2>Lista de Itens</h2>
                        <ul>
                            
                        </ul>
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