import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav';
import Table from '../../components/Table';

export default function SellerDetails() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      const returnSales = async () => {
        const listProducts = await axios.get(`http://localhost:3001/sale/${id}`);
        setData(listProducts.data);
      };
      returnSales();
    } catch(error) {
      console.log(error.message);
    }
  }, []);

  const convertDate = (data) => {
    const newDate = new Date(data);
    const date = `${newDate.getDate()}/${newDate
      .getMonth() + 1}/${newDate.getFullYear()}`;
    return date;
  };

  return (
    <div>
      <Nav />
      <div>
        <div
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          PEDIDO 000
          { data.id }
        </div>
        <div
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { convertDate(data.saleDate) }
        </div>
        <div
          data-testid={ 'seller_order_details__element-order'
          + '-details-label-delivery-status' }
        >
          { data.status }
        </div>
        <button
          type="button"
          data-testid='seller_order_details__button-preparing-check'
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
        >
          SAIU PARA A ENTREGA
        </button>
        { data.list && <Table list={ data.list } type="seller" /> }
        <div
          data-testid={ 'seller_order_details__elemen'
          + 't-order-total-price' }
        >
          Total
          {` `}
          { data.totalPrice && data.totalPrice.replace('.', ',') }
        </div>
      </div>
    </div>
  );
}
