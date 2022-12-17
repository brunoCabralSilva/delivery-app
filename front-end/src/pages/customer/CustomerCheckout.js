import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from '../../components/Nav';

export default function CustomerCheckout() {
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
        console.log(returnUserId.data);
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
      console.log(register);
      history.push(`/customer/orders/${register.data.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const colorCell = 'font-bold text-white rounded flex'
  + ' items-center flex justify-center bg-gradi'
  + 'ent-to-r px-5 py-2 from-orange-700 to-yellow-600';
  const colorTd = 'border px-5 py-2 my-1 flex items-center justify-center text-center';

  return (
    <div>
      <Nav />
      <table className="mt-10">
        <thead>
          <tr className="grid grid-cols-6 gap-2 p-3">
            <th className={ colorCell }>Item</th>
            <th className={ colorCell }>Descrição</th>
            <th className={ colorCell }>Quantidade</th>
            <th className={ colorCell }>Valor Unitário</th>
            <th className={ colorCell }>Sub-total</th>
            <th className={ colorCell }>Remoção de Item</th>
          </tr>
        </thead>
        <tbody>
          {listProducts.map((drink, index) => (
            <tr key={ index } className="grid grid-cols-6 gap-2 px-3">
              <td
                className={ colorTd }
                data-testid={ 'customer_checkout__element-order'
                + `-table-item-number-${index}` }
              >
                { index + 1 }
              </td>
              <td
                className={ colorTd }
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { drink.name }
              </td>
              <td
                className={ colorTd }
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { drink.quant }
              </td>
              <td
                className={ colorTd }
                data-testid={ 'customer_checkout__element-order'
                + `-table-unit-price-${index}` }
              >
                { drink.price.toString().replace('.', ',') }
              </td>
              <td
                className={ colorTd }
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {(Number(drink.price) * Number(drink.quant))
                  .toFixed(2).toString().replace('.', ',')}
              </td>
              <td className="border my-1 flex items-center justify-center text-center">
                <button
                  type="button"
                  className={
                    'h-full w-full'
                    + ' flex items-center justify-center'
                    + ' text-center bg-white hover:bg-red-600'
                    + ' transition-all duration-1000 text-black hover:text-white'
                  }
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
      <div className="grid grid-cols-5 mt-5 p-3">
        <select
          type="select"
          className="border"
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
          className="border py-2 px-2 mx-1 text-center"
          placeholder="Endereço"
          onChange={ (e) => setAdress(e.target.value) }
          type="text"
          data-testid="customer_checkout__input-address"
        />
        <input
          type="number"
          className="border py-2 px-2 text-center"
          placeholder="Número"
          value={ numberAdress }
          onChange={ (e) => setNumberAdress(e.target.value) }
          data-testid="customer_checkout__input-address-number"
        />
        <div
          data0-testid="customer_checkout__element-order-total-price"
          className="flex justify-center items-center border mx-1"
        >
          <span className="font-bold pr-3">Total:</span>
          <span className="pr-2">R$</span>
          { totalValor().toFixed(2).toString().replace('.', ',') }
        </div>
        <button
          type="button"
          className={
            'border font-bold text-white rounded flex'
            + ' flex items-center justify-center bg-gradi'
            + 'ent-to-r px-5 py-2 from-orange-700 to-yellow-600'
            + ' hover:from-yellow-600 hover:to-orange-700 transition-colors duration-500'
          }
          onClick={ registerSale }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
