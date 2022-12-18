import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav';
import Table from '../../components/Table';

export default function CustomerDetails() {
  const [data, setData] = useState({});
  const [seller, setSeller] = useState('');
  const [saleStatus, setSaleStatus] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const returnSales = async () => {
      const listProducts = await axios.get(`http://localhost:3001/sale/${id}`);
      const sellerName = await axios.get('http://localhost:3001/user/sellers');
      setSaleStatus(listProducts.data.status);
      const filterSeller = sellerName.data
        .find((pessoa) => listProducts.data.sellerId === pessoa.id);
      setSeller(filterSeller.name);
      setData(listProducts.data);
    };
    returnSales();
  }, []);

  const buttonControl = () => {
    const verify = saleStatus === 'Em Trânsito';
    return !verify;
  };

  const updateStatus = async (status) => {
    try {
      await axios.post('http://localhost:3001/sale/', { newStatus: status, saleId: id });
      setSaleStatus(status);
    } catch (error) {
      window.alert(`Erro: ${error.message}`);
    }
  };

  const convertDate = (dataBase) => {
    const newDate = new Date(dataBase);
    const date = `${newDate.getDate()}/${newDate
      .getMonth() + 1}/${newDate.getFullYear()}`;
    return date;
  };

  const colorCell = 'font-bold text-white rounded flex'
  + ' items-center flex justify-center bg-gradi'
  + 'ent-to-r px-5 py-2 from-orange-700 to-yellow-600';

  return (
    <div>
      <Nav />
      <div>
        <div className="w-screen grid grid-cols-5 gap-2 p-3">
          <div
            className={ colorCell }
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            <span>Id do Pedido: 000</span>
            { data.id }
          </div>
          <div
            className={ colorCell }
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            <span className="pr-2">Vendedor(a):</span>
            { seller }
          </div>
          <div
            className={ colorCell }
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            <span className="pr-2">Data da compra:</span>
            { convertDate(data.saleDate) }
          </div>
          <div
            className={ colorCell }
            data-testid={ 'customer_order_details__element-order'
            + '-details-label-delivery-status' }
          >
            <span className="pr-2">Status:</span>
            { saleStatus }
          </div>
          <button
            type="button"
            onClick={ () => updateStatus('Entregue') }
            data-testid="customer_order_details__button-delivery-check"
            disabled={ buttonControl() }
            className={ colorCell }
          >
            Marcar como entregue
          </button>
        </div>
        <div className="flex justify-center w-full">
          { data.list && <Table list={ data.list } type="customer" /> }
        </div>
        <div
          className="p-3 text-center"
          data-testid={ 'customer_order_details__elemen'
          + 't-order-total-price' }
        >
          <p
            className={
              'p-1 py-2 w-full text-white z-30 font-bold'
            + ' bg-gradient-to-r from-orange-700 to-yellow-600 text-xl'
            }
          >
            <span>Total: R$</span>
            { data.totalPrice && data.totalPrice.replace('.', ',') }
          </p>
        </div>
      </div>
    </div>
  );
}
