import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VALID_STATUS = 200;
const NUMBER = 1;

export default function Products() {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const returnAllItems = async () => {
      try {
        const data = await axios.get('http://localhost:3001/customer/products');
        if (data.status === VALID_STATUS) {
          const valor = data.data.map((v) => {
            const obj = {
              ...v,
              quant: 0,
            };
            return obj;
          });
          console.log(valor);
          setListProducts(valor);
        }
      } catch (error) {
        console.log(error.message);
        setListProducts([]);
      }
    };
    returnAllItems();
  }, []);

  const sortItems = (filterOff, filter) => {
    const newList = [...filterOff, ...filter].sort((a, b) => {
      if (a.id > b.id) {
        return NUMBER;
      }
      return -NUMBER;
    });
    return newList;
  };

  const addQuant = (index) => {
    const filterOff = listProducts.filter((fil, i) => index !== i);
    const filter = listProducts.filter((fil, i) => index === i);
    filter[0].quant += 1;
    const newList = sortItems(filterOff, filter);
    setListProducts(newList);
  };

  const remQuant = (index) => {
    const filterOff = listProducts.filter((fil, i) => index !== i);
    const filter = listProducts.filter((fil, i) => index === i);
    filter[0].quant -= 1;
    if (filter[0].quant < 1) {
      filter[0].quant = 0;
    }
    const newList = sortItems(filterOff, filter);
    setListProducts(newList);
  };

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
              <p data-testid={ `customer_products__element-card-title-${list.id}` }>
                { list.name }
              </p>
              <p data-testid={ `customer_products__element-card-price-${list.id}` }>
                { list.price }
              </p>
              <img
                data-testid={ `customer_products__img-card-bg-image-${list.id}` }
                src={ list.url_image }
                alt={ `Imagem do produto ${list.id}` }
              />
              <button
                data-testid={ `customer_products__button-card-rm-item-${list.id}` }
                type="button"
                onClick={ () => remQuant(index) }
              >
                -
              </button>
              <input
                type="text"
                data-testid={ `customer_products__input-card-quantity-${list.id}` }
                value={ listProducts[index].quant }
              />
              <button
                data-testid={ `customer_products__button-card-add-item-${list.id}` }
                onClick={ () => addQuant(index) }
                type="button"
              >
                +
              </button>
            </div>
          ))
        }
      </section>
    </div>
  );
}
