import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Orders({ id, status, saleDate, totalPrice }) {
  const [products, setProducts] = useState([]);

  const [storage, setStorage] = useState({});

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('car-shop'));
    const filteredList = list.filter((item) => item.quant > 0);
    setProducts(filteredList);
  }, []);

  useEffect(() => {
    setStorage(JSON.parse(localStorage.getItem('user')));
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
      {console.log(products)}

      <div>
        {Object.keys(storage).length > 0 && storage.name}
      </div>

      <div>
        <button onClick={ logout } type="button">Sair</button>
      </div>

      <span data-testid={ `customer_orders__element-order-date-${id}` }>
        {
          convertDate(saleDate)
        }

        <span data-testid={ `customer_orders__element-delivery-status-${id}` }>
          {status}
        </span>

        <span data-testid={ `customer_orders__element-card-price-${id}` }>
          totalPrice
        </span>

      </span>
    </div>
  );
}

Orders.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
};
