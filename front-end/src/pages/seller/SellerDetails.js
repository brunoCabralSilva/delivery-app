import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav';
import Table from '../../components/Table';

export default function SellerDetails() {
  const [data, setData] = useState({});
  const [saleStatus, setSaleStatus] = useState('');
  const { id } = useParams();
  const TRANSIT = 'Em Trânsito';
  const PREPARE = 'Preparando';

  useEffect(() => {
    try {
      const returnSales = async () => {
        const listProducts = await axios.get(`http://localhost:3001/sale/${id}`);
        setSaleStatus(listProducts.data.status);
        setData(listProducts.data);
      };
      returnSales();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const updateStatus = async (status) => {
    try {
      await axios.post('http://localhost:3001/sale/', { newStatus: status, saleId: id });
      setSaleStatus(status);
    } catch (error) {
      console.log(error.message);
    }
  };

  const disablePrepare = () => {
    const verify = saleStatus === 'Pendente';
    return !verify;
  };

  const disableDelivery = () => {
    const verify = saleStatus === 'Preparando';
    return !verify;
  };

  const convertDate = (oldDate) => {
    const newDate = new Date(oldDate);
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
      <div className="">
        <div className="w-screen grid grid-cols-5 gap-2 p-3">
          <div
            className={ colorCell }
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            Id do Pedido: 000
            { data.id }
          </div>
          <div
            className={ colorCell }
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            <span className="pr-2">Data da venda:</span>
            { convertDate(data.saleDate) }
          </div>
          <div
            className={ colorCell }
            data-testid={ 'seller_order_details__element-order'
            + '-details-label-delivery-status' }
          >
            { saleStatus }
          </div>
          <button
            className={ colorCell }
            type="button"
            disabled={ disablePrepare() }
            onClick={ () => updateStatus(PREPARE) }
            data-testid="seller_order_details__button-preparing-check"
          >
            PREPARAR PEDIDO
          </button>
          <button
            className={ colorCell }
            type="button"
            disabled={ disableDelivery() }
            onClick={ () => updateStatus(TRANSIT) }
            data-testid="seller_order_details__button-dispatch-check"
          >
            SAIU PARA A ENTREGA
          </button>
        </div>
        { data.list && <Table list={ data.list } type="seller" /> }
        <div
          className="p-3 text-center"
          data-testid={ 'seller_order_details__elemen'
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
