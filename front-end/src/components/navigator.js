import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Navigator() {
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
        Produtos
      </h3>
      <h3 data-testid="customer_products__element-navbar-link-orders">
        Meus Pedidos
      </h3>
      <div data-testid="customer_products__element-navbar-user-full-name">
        {Object.keys(storage).length > 0 && storage.name}
      </div>
      <div data-testid="customer_products__element-navbar-link-logout">
        <button onClick={ logout } type="button">Sair</button>
      </div>
    </nav>
  );
}
