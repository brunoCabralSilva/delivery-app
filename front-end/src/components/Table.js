import PropTypes from 'prop-types';

export default function Table({ list }) {
  const returnTotal = (quant, price) => {
    const mult = Number(quant) * Number(price);
    return mult.toFixed(2).toString().replace('.', ',');
  };

  const returnPrice = (price) => {
    const v = Number(price).toFixed(2).toString().replace('.', ',');
    return v;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={ 'customer_order_details__element-'
                + `order-table-item-number-${index + 1}` }
              >
                { product.id }
              </td>
              <td
                data-testid={ 'customer_order_details__eleme'
                + `nt-order-table-name-${index + 1}` }
              >
                { product.name }
              </td>
              <td
                data-testid={ 'customer_order_details__element'
                + `-order-table-quantity-${index + 1}` }
              >
                { product.quant }
              </td>
              <td
                data-testid={ 'customer_order_details__element-order'
                + `-table-unit-price-${index + 1}` }
              >
                { returnPrice(product.price) }
              </td>
              <td
                data-testid={ 'customer_order_details__el'
                + `ement-order-table-sub-total-${index + 1}` }
              >
                { returnTotal(product.quant, product.price) }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

Table.propTypes = {
  list: PropTypes.arrayOf().isRequired,
};
