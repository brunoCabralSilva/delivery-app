import PropTypes from 'prop-types';

export default function Table({ list }) {
  console.log(list);
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
                Item
              </td>
              <td
                data-testid={ 'customer_order_details__eleme'
                + `nt-order-table-name-${index + 1}` }
              >
                Name
              </td>
              <td
                data-testid={ 'customer_order_details__element'
                + `-order-table-quantity-${index + 1}` }
              >
                Quantidade
              </td>
              <td
                data-testid={ 'customer_order_details__element-order'
                + `-table-unit-price-${index + 1}` }
              >
                Valor Unitário
              </td>
              <td
                data-testid={ 'customer_order_details__el'
                + `ement-order-table-sub-total-${index + 1}` }
              >
                Sub-total
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
