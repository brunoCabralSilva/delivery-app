import { useState, useEffect } from 'react';

export default function Login() {
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    setValidation(false);
  }, []);

  return (
    <div>
      <input
        type="email"
        data-testid="common_login__input-email"
      />
      <input
        type="password"
        data-testid="common_login__input-password"
      />
      <button
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
