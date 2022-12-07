import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Checkout() {
  const [listProducts, setProducts] = useState([]);
  const [numberAdress, setNumberAdress] = useState('');
  const [adress, setAdress] = useState('');
  const [seller, setSeller] = useState('');
  const [userId, setUserId] = useState('');
  const [allSellers, setAllSellers] = useState([]);
  const [user, setUser] = useState({});
  const history = useHistory();
  const VALID_STATUS = 200;
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('car-shop'));
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const filteredList = list.filter((item) => item.quant > 0);
    setProducts(filteredList);
    setUser(userStorage);
    const returnSellers = async () => {
      try {
        const sellers = await axios.get('http://localhost:3001/user/sellers');
        const returnUserId = await axios.get(`http://localhost:3001/user/${userStorage.email}`);
        if (sellers.status === VALID_STATUS) {
          setAllSellers(sellers.data);
          setSeller(sellers.data[0].id);
          setUserId(returnUserId.data.id);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    returnSellers();
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
  const registerSale = async () => {
    try {
      const register = await axios.post('http://localhost:3001/customer/order', {
        userId,
        sellerId: seller,
        totalPrice: totalValor().toFixed(2),
        deliveryAddress: adress,
        deliveryNumber: numberAdress,
        list: listProducts,
      }, { headers: { authorization: user.token,
      } });
      history.push(`/orders/${register.data.id}`);
    } catch (error) {
      console.log(error.message);
    }
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
          onChange={ (e) => setSeller(e.target.value) }
          data-testid="customer_checkout__select-seller"
        >
          {
            allSellers.map((s, index) => (
              <option value={ s.id } key={ index }>{ s.name }</option>
            ))
          }
        </select>
        <input
          value={ adress }
          onChange={ (e) => setAdress(e.target.value) }
          type="text"
          data-testid="customer_checkout__input-address"
        />
        <input
          type="number"
          value={ numberAdress }
          onChange={ (e) => setNumberAdress(e.target.value) }
          data-testid="customer_checkout__input-address-number"
        />
        <button
          type="button"
          onClick={ registerSale }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
