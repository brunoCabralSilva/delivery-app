import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../components/Carousel';

const background = require('../images/background.png');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(false);
  const VALID_STATUS = 200;
  const history = useHistory();

  useEffect(() => {
    setValidation(false);
    const urlValidation = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const { id } = user;
        const vOrders = await axios.get(`http://localhost:3001/user/orders/${id}`);
        const { role } = user;
        if (role === 'customer') {
          if (vOrders && vOrders.data.length > 0) {
            history.push(`/${role}/orders`);
          } else {
            history.push(`/${role}/products`);
          }
        }
        if (role === 'seller') {
          history.push(`/${role}/orders`);
        }
      }
    };
    urlValidation();
  }, []);

  const enableButton = () => {
    const number = 6;
    const validateEmail = /\S+@\S+\.\S+/;
    const vEmail = !email || !validateEmail.test(email) || email === '';
    const vPassword = !password || password.length < number;
    return vEmail || vPassword;
  };

  const validadeEmail = async () => {
    try {
      const vEmail = await axios.post('http://localhost:3001/login', { email, password });
      setValidation(false);
      if (vEmail.status === VALID_STATUS) {
        localStorage.setItem('user', JSON.stringify(vEmail.data));
        if (vEmail.data.role === 'customer') {
          history.push('/customer/products');
        } else if (vEmail.data.role === 'seller') {
          history.push('/seller/orders');
        } else if (vEmail.data.role === 'administrator') {
          history.push('/admin/manage');
        }
      }
    } catch (error) {
      console.log(error.message);
      setValidation(true);
    }
  };

  return (
    <div className="flex w-full h-screen relative">
      <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-2 bg-white p-2">
        <div className="row-span-2 col-span-1 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['1', '2', '3', '4', '5'] }
            data={ { time: '3500', direction: 'vertical', reverse: 'true' } }
          />
        </div>
        <div className="row-span-1 col-span-2 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['6', '9', '8', '7', '10'] }
            data={ { time: '6000', direction: 'horizontal', reverse: 'true' } }
          />
        </div>
        <div className="row-span-1 col-span-1 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['15', '14', '13', '12', '11'] }
            data={ { time: '7000', direction: 'vertical', reverse: 'false' } }
          />
        </div>
        <div className="row-span-1 col-span-1 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['16', '17', '18', '19', '20'] }
            data={ { time: '4500', direction: 'horizontal', reverse: 'false' } }
          />
        </div>
        <div className="row-span-1 col-span-2 gap-2 h-full w-full">
          <Carousel
            className="h-full w-full"
            list={ ['21', '22', '23', '24'] }
            data={ { time: '4000', direction: 'horizontal', reverse: 'false' } }
          />
        </div>
      </div>
      <div className="absolute flex items-center justify-center z-30 w-full h-screen">
        <div
          className={
            'p-8 py-12 relative'
            + ' flex flex-col items-center justify-center'
            + ' glasmorphism absolute z-3'
          }
        >
          <img
            src={ background }
            alt="degradê de fundo"
            className={
              'absolute h-full w-full object-cover'
              + 'opacity-90 border-white border-8'
            }
          />
          <label
            htmlFor="email"
            className="m-1 w-full mb-3 z-30"
          >
            <input
              type="email"
              id="email"
              className="border text-center p-2 w-full"
              placeholder="E-mail"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              data-testid="common_login__input-email"
            />
          </label>
          <label
            htmlFor="email"
            className="m-1 w-full mb-6 z-30"
          >
            <input
              type="password"
              className="border text-center p-2 w-full"
              placeholder="Password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              data-testid="common_login__input-password"
            />
          </label>
          <button
            className={ 'p-1 py-2 m-1 text-white w-full z-30'
            + ' bg-gradient-to-r from-zinc-700 to-black' }
            disabled={ enableButton() }
            onClick={ validadeEmail }
            type="button"
            data-testid="common_login__button-login"
          >
            Login
          </button>
          <button
            type="button"
            className="p-1 m-1 w-full z-30 hover:bg-gray-100 transition"
            data-testid="common_login__button-register"
            onClick={ () => history.push('/register') }
          >
            Register
          </button>
          {
            validation
              ? <p data-testid="common_login__element-invalid-email" className="z-30 p-3">Invalid E-mail</p>
              : null
          }
        </div>
      </div>
    </div>
  );
}
