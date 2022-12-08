import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Orders() {
  const [storage, setStorage] = useState({});
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const returnSales = async () => {
      const list = JSON.parse(localStorage.getItem('user'));
      setStorage('user');
      console.log(list);
      const returnUserId = await axios.get(`http://localhost:3001/user/${list.email}`);
      const allSales = await axios.get(`http://localhost:3001/user/orders/${returnUserId}`);
      setSales(allSales);
    };
    returnSales();
  }, []);

  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const convertDate = (data) => {
    const newDate = new Date(data);
    const date = `${newDate.getDate()}/${newDate
      .getMonth() + 1}/${newDate.getFullYear()}`;
    console.log(date);
    return date;
  };

  return (
    <div>
      <nav>
        <h3 data-testid="customer_products__element-navbar-link-products">
          Produtos
        </h3>
        <h3>
          Meus Pedidos
        </h3>
      </nav>

      <div>
        {Object.keys(storage).length > 0 && storage.name}
      </div>

      <div>
        <button onClick={ logout } type="button">Sair</button>
      </div>
      <div>
        {sales.length > 0 && sales.map((product, index) => (
          <div
            data-testid={ `customer_orders__element-order-date-${index}` }
            key={ index }
          >
            {
              convertDate(product.saleDate)
            }

            <div data-testid={ `customer_orders__element-delivery-status-${index}` }>
              {product.status}
            </div>

            <div data-testid={ `customer_orders__element-card-price-${index}` }>
              {product.totalPrice}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
