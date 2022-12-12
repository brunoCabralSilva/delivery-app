import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Nav from '../../components/Nav';

export default function CustomerOrders() {
  const [sales, setSales] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const returnSales = async () => {
      const list = JSON.parse(localStorage.getItem('user'));

      const returnUserId = await axios.get(`http://localhost:3001/user/${list.email}`);
      console.log(returnUserId.data.id);
      const allSales = await axios.get(`http://localhost:3001/user/orders/${returnUserId.data.id}`);
      console.log('allsales', allSales);
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
      <Nav />
      <div>
        {
          sales.length > 0 && sales.map((product, index) => (
            <button
              type="button"
              key={ index }
              onClick={ () => history.push(`./orders/${product.id}`) }
            >
              <div data-testid={ `customer_orders__element-order-id-${product.id}` }>
                Pedido
                {`000${product.id}` }
              </div>
              <p data-testid={ `customer_orders__element-order-date-${index + 1}` }>
                {
                  convertDate(product.saleDate)
                }
              </p>
              <div
                data-testid={ `customer_orders__element-delivery-status-${index + 1}` }
              >
                {product.status}
              </div>
              <div data-testid={ `customer_orders__element-card-price-${index + 1}` }>
                R$
                { product.totalPrice.toString().replace('.', ',') }
              </div>
            </button>
          ))
        }
      </div>

    </div>
  );
}
