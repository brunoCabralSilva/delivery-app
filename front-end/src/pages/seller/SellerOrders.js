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
                  + ' text-white font-bold p-5 rounded'
                }
                type="button"
                onClick={
                  () => history.push(`/seller/orders/${product.id}`)
                }
              >
                <div className="grid grid-cols-3">
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className="flex flex-col text-3xl"
                      data-testid={ `seller_orders__element-order-id-${product.id}` }
                    >
                      {`000${product.id}` }
                    </div>
                    <p data-testid={ `seller_orders__element-order-date-${index + 1}` }>
                      {
                        convertDate(product.saleDate)
                      }
                    </p>
                  </div>
                  <div
                    className="h-full flex flex-col items-center justify-center"
                    data-testid={
                      'seller_orders__element-delivery-'
                    + `status-${index + 1}`
                    }
                  >
                    {product.status}
                  </div>
                  <div
                    className="h-full flex flex-col items-center justify-center"
                    data-testid={ `seller_orders__element-card-price-${index + 1}` }
                  >
                    R$
                    {' '}
                    { product.totalPrice.replace('.', ',') }
                  </div>
                </div>
                <hr className="my-5" />
                <div
                  data-testid={ `seller_orders__element-card-address-${index + 1}` }
                >
                  { `${product.deliveryAddress}, ${product.deliveryNumber}` }
                </div>
              </button>
            </div>
          ))
        }
      </div>

    </div>
  );
}
