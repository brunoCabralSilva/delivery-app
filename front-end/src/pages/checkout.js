import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Checkout() {
  const [listProducts, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('car-shop'));
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const filteredList = list.filter((item) => item.quant > 0);
    setProducts(filteredList);
    setUser(userStorage.name);
  }, []);

  const totalValor = () => {
    let valor = 0;
    listProducts.forEach((item) => {
      valor += Number(item.quant) * Number(item.price);
    });
    return valor;
  };

  const removeItem = (index) => {
    const remove = listProducts.filter((item, i) => i !== index);
    setProducts(remove);
    localStorage.setItem('car-shop', JSON.stringify(remove));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {listProducts.map((drink, index) => (
            <tr key={ index }>
              <td
                data-testid={ 'customer_checkout__element-order'
                + `-table-item-number-${index}` }
              >
                { index + 1 }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { drink.name }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { drink.quant }
              </td>
              <td
                data-testid={ 'customer_checkout__element-order'
                + `-table-unit-price-${index}` }
              >
                { drink.price.toString().replace('.', ',') }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {(Number(drink.price) * Number(drink.quant))
                  .toFixed(2).toString().replace('.', ',')}
              </td>
              <td>
                <button
                  type="button"
                  onClick={ () => removeItem(index) }
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        data-testid="customer_checkout__element-order-total-price"
      >
        { totalValor().toFixed(2).toString().replace('.', ',') }
      </div>
      <div>
        <select
          type="select"
          data-testid="customer_checkout__select-seller"
        >
          <option>{ user }</option>
        </select>
        <input
          type="text"
          data-testid="customer_checkout__input-address"
        />
        <input
          type="number"
          data-testid="customer_checkout__input-address-number"
        />
        <button
          type="button"
          onClick={ () => history.push('/orders') }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
