import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
        }
      }
    } catch (error) {
      console.log(error.message);
      setValidation(true);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        data-testid="common_login__input-email"
      />
      <input
        type="password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        data-testid="common_login__input-password"
      />
      <button
        disabled={ enableButton() }
        onClick={ validadeEmail }
        type="button"
        data-testid="common_login__button-login"
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        Register
      </button>
      {
        validation
          ? <p data-testid="common_login__element-invalid-email">Invalid E-mail</p>
          : null
      }
    </div>
  );
}
