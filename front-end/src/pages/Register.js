import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input
        type="name"
        value={ name }
        onChange={ (e) => setName(e.target.value) }
        data-testid="common_register__input-name"
      />
      <input
        type="email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        data-testid="common_register__input-email"
      />
      <input
        type="password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        data-testid="common_register__input-password"
      />
      <button
        onClick={ () => console.log('Deu') }
        type="button"
        data-testid="common_register__button-register"
      >
        Login
      </button>
      <div data-testid="common_register__element-invalid_register" />
    </div>
  );
}
