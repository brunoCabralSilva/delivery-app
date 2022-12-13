import axios from 'axios';
import { useState, useEffect } from 'react';

const regex = /\S+@\S+\.\S+/;

export default function CustomerCheckout() {
  const [userStorage, setUserStorage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserStorage(user);
  }, []);

  registerUser = async () => {
    try {
      await axios.post(
        'http://localhost:3001/user',
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: { authorization: userStorage.token },
        },
      );
      window.alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      window.alert(error.message);
    }
  };

  deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/user/delete/${id}`,
        {
          headers: { authorization: userStorage.token },
        },
      );
      window.alert('Usuário apagado com sucesso!');
    } catch (error) {
      window.alert(error.message);
    }
  };

  enableButton = () => {
    const number1 = 12;
    const number2 = 6;
    const nameLength = name.length >= number1;
    const passwordLength = password.length >= number2;
    const regexEmail = regex.test(email);
    return (nameLength && passwordLength && regexEmail);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          data-testid="admin_manage__input-name"
        />
        <input
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          data-testid="admin_manage__input-email"
        />
        <input
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          data-testid="admin_manage__input-password"
        />
        <select
          data-testid="admin_manage__select-role"
          onChange={ (e) => setRole(e.target.value) }
          defaultValue="Vendedor"
        >
          <option value={ 0 }>{ 0 }</option>
        </select>
        <button
          onClick={ registerUser }
          disabled={ enableButton }
          type="button"
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
        <p>Lista de Usuários</p>
        <table>
          <thead>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Excluir</th>
          </thead>
          <tbody>
            {
              list.map((user, index) => (
                <tr key={ index }>
                  <div
                    data-testid={
                      'admin_manage__element-user-'
                      + `table-item-number-${index}`
                    }
                  >
                    { index + 1 }
                  </div>
                  <div
                    data-testid={ `admin_manage__element-user-table-name-${index}` }
                  >
                    { user.name }
                  </div>
                  <div
                    data-testid={ `admin_manage__element-user-table-email-${index}` }
                  >
                    { user.email }
                  </div>
                  <div
                    data-testid={ `admin_manage__element-user-table-role-${index}` }
                  >
                    { user.role }
                  </div>
                  <button
                    type="button"
                    onClick={ () => deleteUser(user.id) }
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  >
                    { user.role }
                  </button>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
