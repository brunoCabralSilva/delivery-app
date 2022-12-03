import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(false);
  const CREATED_STATUS = 201;
  // const history = useHistory();

  const enableButton = () => {
    const number = 6;
    const validateEmail = /\S+@\S+\.\S+/;
    const vEmail = !email || !validateEmail.test(email) || email === '';
    const vPassword = !password || password.length < number;
    const vName = !name || name === '' || name.length < 2 * number;
    return vEmail || vPassword || vName;
  };

  const validadeUser = async () => {
    try {
      const vUser = await axios.post('http://localhost:3001/register', { name, email, password });
      if (vUser.status === CREATED_STATUS) {
        setValidation(false);
      }
    } catch (error) {
      console.log(error.message);
      setValidation(true);
    }
  };

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
        disabled={ enableButton() }
        onClick={ validadeUser }
        type="button"
        data-testid="common_register__button-register"
      >
        Cadastrar
      </button>
      {
        validation
          ? (
            <p data-testid="common_register__element-invalid_register">
              Usuário Inválido
            </p>)
          : null
      }
    </div>
  );
}
