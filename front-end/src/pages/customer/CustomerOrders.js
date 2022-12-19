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
      const allSales = await axios.get(`http://localhost:3001/user/orders/${returnUserId.data.id}`);
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
      <Nav page="" valuePrice={ 0 } />
      <div className="flex flex-wrap">
        {
          sales.length > 0 && sales.map((product, index) => (
            <div
              className="w-1/3 p-3"
              key={ index }
            >
              <button
                className={
                  'w-full bg-gradient-to-r from-orange-700 to-yellow-600'
                  + ' text-white font-bold p-5 grid grid-cols-3 rounded'
                }
                type="button"
                onClick={ () => history.push(`./orders/${product.id}`) }
              >
                <div className="h-full flex flex-col items-center justify-center">
                  <div
                    className="flex flex-col"
                    data-testid={ `customer_orders__element-order-id-${product.id}` }
                  >
                    <span className="text-3xl">{`000${product.id}` }</span>
                  </div>
                  <p data-testid={ `customer_orders__element-order-date-${index + 1}` }>
                    {
                      convertDate(product.saleDate)
                    }
                  </p>
                </div>
                <div
                  className={
                    'h-full flex flex-col items-center'
                    + ' justify-center border p-10 rounded'
                  }
                  data-testid={ `customer_orders__element-delivery-status-${index + 1}` }
                >
                  {product.status}
                </div>
                <div
                  className="h-full flex flex-col items-center justify-center"
                  data-testid={ `customer_orders__element-card-price-${index + 1}` }
                >
                  R$
                  { product.totalPrice.toString().replace('.', ',') }
                </div>
              </button>
            </div>
          ))
        }
      </div>

    </div>
  );
}
