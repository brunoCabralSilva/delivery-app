import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav';

export default function SellerOrders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const returnSales = async () => {
      const list = JSON.parse(localStorage.getItem('user'));
      if (!list.token) {
        history.push('/login');
      }
      try {
        const returnUserId = await axios.get(`http://localhost:3001/user/${list.email}`);
        const allSales = await axios.post('http://localhost:3001/seller/sales', {
          id: returnUserId.data.id,
        },
        { headers: { authorization: list.token }});
      } catch(error) {
        if (error.message === 'Token invalid') {
          history.push('/login');
        }
      }
      console.log(allSales.data);
      setSales(allSales.data);
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
            <div key={ index }>
              <div data-testid={ `seller_orders__element-order-id-${product.id}` }>
                Pedido
                {`000${product.id}` }
              </div>
              <p data-testid={ `seller_orders__element-order-date-${index}` }>
                {
                  convertDate(product.saleDate)
                }
              </p>
              <div data-testid={ `seller_orders__element-delivery-status-${index}` }>
                {product.status}
              </div>
              <div data-testid={ `seller_orders__element-card-price-${index}` }>
                R$
                {` `}
                { product.totalPrice.replace('.', ',') }
              </div>
              <div data-testid={ `seller_orders__element-card-address-${index}` }>
                { `${product.deliveryAddress}, ${product.deliveryNumber}` }
              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
}
