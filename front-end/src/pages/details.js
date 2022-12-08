import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigator from '../components/navigator';
import Table from '../components/Table';

export default function Details() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const returnSales = async () => {
      const listProducts = await axios.get(`http://localhost:3001/sale/${id}`);
      setData(listProducts.data);
    };
    returnSales();
  }, []);

  return (
    <div>
      <Navigator />
      <div>
        <div
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { data.id }
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { data.sellerId }
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { data.saleDate }
        </div>
        <div
          data-testid={ 'customer_order_details__element-order'
          + '-details-label-delivery-status' }
        >
          { data.status }
        </div>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
        >
          Marcar como entregue
        </button>
        { data.list && <Table list={ data.list } /> }
        <div
          data-testid={ 'customer_order_details__elemen'
          + 't-order-total-price' }
        >
          { data.totalPrice && data.totalPrice.replace('.', ',') }
        </div>
      </div>
    </div>
  );
}
