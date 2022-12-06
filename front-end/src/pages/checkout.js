import { useState, useEffect } from 'react';

export default function Checkout() {
  const [listProducts, setProducts] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('car-shop'));
    const filteredList = list.filter((item) => item.quant > 0);
    console.log(filteredList);
    setProducts(filteredList);
  }, []);

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
                data-testid={ `customer_
              checkout__element-order-table-item-number-${index}` }
              >
                {index}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {drink.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {drink.quant}
              </td>
              <td
                data-testid={ `customer_
                checkout__element-order-table-unit-price-${index}` }
              >
                {drink.price.toString().replace('.', ',')}
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
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div data-testid="customer_checkout__element-order-total-price">Total</div>
    </div>
  );
}
