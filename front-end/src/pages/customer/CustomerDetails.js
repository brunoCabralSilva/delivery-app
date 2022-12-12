import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav';
import Table from '../../components/Table';

export default function CustomerDetails() {
  const [data, setData] = useState({});
  const [seller, setSeller] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const returnSales = async () => {
      const listProducts = await axios.get(`http://localhost:3001/sale/${id}`);
      const sellerName = await axios.get('http://localhost:3001/user/sellers');
      const filterSeller = sellerName.data
        .find((pessoa) => listProducts.data.sellerId === pessoa.id);
      setSeller(filterSeller.name);
      setData(listProducts.data);
      console.log('filter', filterSeller);
      console.log('seller', seller);
      console.log('name', sellerName.data);
    };
    returnSales();
  }, []);

  const convertDate = (dataBase) => {
    const newDate = new Date(dataBase);
    const date = `${newDate.getDate()}/${newDate
      .getMonth() + 1}/${newDate.getFullYear()}`;
    return date;
  };

  return (
    <div>
      <Nav />
      <div>
        <div
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { data.id }
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { seller }
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { convertDate(data.saleDate) }
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
          disabled
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
