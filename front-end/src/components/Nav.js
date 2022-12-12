import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Nav() {
  const [storage, setStorage] = useState({});
  const history = useHistory();

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('user'));
    setStorage(list);
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <nav>
      <h3 data-testid="customer_products__element-navbar-link-products">
        <button onClick={ () => history.push('/customer/products') } type="button">
          Produtos
        </button>
      </h3>
      <h3 data-testid="customer_products__element-navbar-link-orders">
        <button onClick={ () => history.push('/customer/orders') } type="button">
          Meus Pedidos
        </button>
      </h3>
      <div data-testid="customer_products__element-navbar-user-full-name">
        {Object.keys(storage).length > 0 && storage.name}
      </div>
      <button
        onClick={ logout }
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
      >
        Logout
      </button>
    </nav>
  );
}
