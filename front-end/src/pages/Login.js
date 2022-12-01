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
      console.log(vEmail);
      setValidation(false);
      if (vEmail.status === VALID_STATUS) {
        history.push('/customer/products');
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
