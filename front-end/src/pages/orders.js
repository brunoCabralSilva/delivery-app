import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigator from '../components/navigator';

export default function Orders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const returnSales = async () => {
      const list = JSON.parse(localStorage.getItem('user'));
      const returnUserId = await axios.get(`http://localhost:3001/user/${list.email}`);
      console.log(returnUserId.data.id);
      const allSales = await axios.get(`http://localhost:3001/user/orders/${returnUserId.data.id}`);
      console.log(allSales);
      setSales(allSales.data);
    };
    returnSales();
  }, []);

  const convertDate = (data) => {
    const newDate = new Date(data);
    const date = `${newDate.getDate()}/${newDate
      .getMonth() + 1}/${newDate.getFullYear()}`;
    console.log(date);
    return date;
  };

  return (
    <div>
      <Navigator />
      <div>
        {
          sales.length > 0 && sales.map((product, index) => (
            <div key={ index }>
              <div data-testid={ `customer_orders__element-order-id-${product.id}` }>
                Pedido
                {`000${product.id}` }
              </div>
              <p data-testid={ `customer_orders__element-order-date-${index}` }>
                {
                  convertDate(product.saleDate)
                }
              </p>
              <div data-testid={ `customer_orders__element-delivery-status-${index}` }>
                {product.status}
              </div>
              <div data-testid={ `customer_orders__element-card-price-${index}` }>
                R$
                { product.totalPrice.toString().replace('.', ',') }
              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
}
