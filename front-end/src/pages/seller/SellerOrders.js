import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Nav from '../../components/Nav';

export default function SellerOrders() {
  const [sales, setSales] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const returnSales = async () => {
      const list = JSON.parse(localStorage.getItem('user'));
      if (!list || !list.token) {
        history.push('/login');
      }
      try {
        const returnUserId = await axios.get(`http://localhost:3001/user/${list.email}`);
        const allSales = await axios.post(
          'http://localhost:3001/seller/sales',
          {
            id: returnUserId.data.id,
          },
          { headers: { authorization: list.token } },
        );
        setSales(allSales.data);
      } catch (error) {
        if (error.message === 'Token invalid') {
          history.push('/login');
        }
      }
    };
    returnSales();
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
        {
          sales.length > 0 && sales.map((product, index) => (
            <button
              type="button"
              key={ index }
              onClick={
                () => history.push(`/seller/orders/${product.id}`)
              }
            >
              <div data-testid={ `seller_orders__element-order-id-${product.id}` }>
                Pedido
                {`000${product.id}` }
              </div>
              <p data-testid={ `seller_orders__element-order-date-${index + 1}` }>
                {
                  convertDate(product.saleDate)
                }
              </p>
              <div data-testid={ `seller_orders__element-delivery-status-${index + 1}` }>
                {product.status}
              </div>
              <div data-testid={ `seller_orders__element-card-price-${index + 1}` }>
                R$
                {' '}
                { product.totalPrice.replace('.', ',') }
              </div>
              <div data-testid={ `seller_orders__element-card-address-${index + 1}` }>
                { `${product.deliveryAddress}, ${product.deliveryNumber}` }
              </div>
            </button>
          ))
        }
      </div>

    </div>
  );
}
