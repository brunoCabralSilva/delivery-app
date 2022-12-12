import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const VALID_STATUS = 200;
const NUMBER = 1;

export default function Products() {
  const [listProducts, setListProducts] = useState([]);
  const [storage, setStorage] = useState({});
  const [valuePrice, setValuePrice] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setStorage(JSON.parse(localStorage.getItem('user')));

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

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const addQuant = (index) => {
    const filterOff = listProducts.filter((fil, i) => index !== i);
    const filter = listProducts.filter((fil, i) => index === i);
    filter[0].quant += 1;
    const newList = sortItems(filterOff, filter);
    let valueTotal = 0;
    for (let i = 0; i < newList.length; i += 1) {
      valueTotal += Number(newList[i].price) * Number(newList[i].quant);
    }
    setValuePrice(valueTotal);
    setListProducts(newList);
    localStorage.setItem('car-shop', JSON.stringify(listProducts));
  };

  const insertQuant = (index, value) => {
    const filterOff = listProducts.filter((fil, i) => index !== i);
    const filter = listProducts.filter((fil, i) => index === i);
    filter[0].quant = Number(value);
    const newList = sortItems(filterOff, filter);
    let valueTotal = 0;
    for (let i = 0; i < newList.length; i += 1) {
      valueTotal += newList[i].price * newList[i].quant;
    }
    setValuePrice(valueTotal);
    setListProducts(newList);
    localStorage.setItem('car-shop', JSON.stringify(listProducts));
  };

  const remQuant = (index) => {
    const filterOff = listProducts.filter((fil, i) => index !== i);
    const filter = listProducts.filter((fil, i) => index === i);
    if (filter[0].quant === 0) {
      filter[0].quant = 0;
      setValuePrice(0);
    } else {
      filter[0].quant -= 1;
      setValuePrice(0);
    }
    const newList = sortItems(filterOff, filter);
    let valueTotal = 0;
    for (let i = 0; i < newList.length; i += 1) {
      valueTotal += Number(newList[i].price) * Number(newList[i].quant);
    }
    setValuePrice(valueTotal);
    setListProducts(newList);
    localStorage.setItem('car-shop', JSON.stringify(listProducts));
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
          { Object.keys(storage).length > 0 && storage.name }
        </div>
        <button
          type="button"
          onClick={ () => history.push('/customer/checkout') }
          data-testid="customer_products__button-cart"
          disabled={ !valuePrice }
        >
          { valuePrice.toFixed(2).toString().replace('.', ',') }
        </button>
        <div
          data-testid="customer_products__checkout-bottom-value"
        >
          { valuePrice.toFixed(2).toString().replace('.', ',') }
        </div>
        <button
          type="button"
          onClick={ logout }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Logout
        </button>
      </header>
      <section>
        {
          listProducts.length > 0 && listProducts.map((list, index) => (
            <div key={ index }>
              <p data-testid={ `customer_products__element-card-title-${list.id}` }>
                { list.name }
              </p>
              <p data-testid={ `customer_products__element-card-price-${list.id}` }>
                { list.price.replace('.', ',') }
              </p>
              <img
                data-testid={ `customer_products__img-card-bg-image-${list.id}` }
                src={ list.urlImage }
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
                onChange={ (e) => insertQuant(index, e.target.value) }
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
