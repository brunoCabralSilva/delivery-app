import { useEffect, useState } from 'react';
import axios from 'axios';

const VALID_STATUS = 200;

export default function Products() {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const returnAllItems = async () => {
      try {
        const data = await axios.get('http://localhost:3001/customer/products');
        setValidation(false);
        if (data.status === VALID_STATUS) {
          console.log(data.data);
          setListProducts([data.data]);
        }
      } catch (error) {
        console.log(error.message);
        setListProducts([]);
      }
    };
    returnAllItems();
  }, []);

  return (
    <div>
      <header>
        <div data-testid="customer_products__element-navbar-link-products">
          Produtos
        </div>
        <div data-testid="customer_products__element-navbar-link-orders">
          Pedidos
        </div>
        <div data-testid="customer_products__element-navbar-user-full-name">
          Nome
        </div>
        <div data-testid="customer_products__element-navbar-link-logout">
          Logout
        </div>
      </header>
      <section>
        {
          listProducts.length > 0 && listProducts.map((list, index) => (
            <div key={ index }>
              <p data-testid={ `customer_products__element-card-title-${index + 1}` }>
                { list.name }
              </p>
              <p data-testid={ `customer_products__element-card-price-${index + 1}` }>
                { list.title }
              </p>
              <img
                data-testid={ `customer_products__img-card-bg-image-${index + 1}` }
                src={ list.url_image }
                alt={ `Imagem do produto ${index + 1}` }
              />
            </div>
          ))
        }
      </section>
    </div>
  );
}
