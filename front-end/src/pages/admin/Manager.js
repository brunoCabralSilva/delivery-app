import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const regex = /\S+@\S+\.\S+/;
const linkUser = 'http://localhost:3001/user';

export default function CustomerCheckout() {
  const [userStorage, setUserStorage] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [message, setMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserStorage(user);
    const returnAllUsers = async () => {
      try {
        const rAllUsers = await axios.get(
          linkUser,
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
        setAllUsers(rAllUsers.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    returnAllUsers();
  }, []);

  const updateUser = async () => {
    try {
      const allUsersReturn = await axios.get(
        linkUser,
        { name, email, password, role },
        { headers: { authorization: userStorage.token } },
      );
      setAllUsers(allUsersReturn.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const registerUser = async () => {
    try {
      await axios.post(
        linkUser,
        { name, email, password, role },
        { headers: { authorization: userStorage.token } },
      );
      updateUser();
      setName('');
      setEmail('');
      setPassword('');
      setRole('seller');
      const selectRole = document.getElementById('select-role');
      selectRole.selectedIndex = 'seller';
      setMessage('Usuário cadastrado com sucesso!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/user/${id}`,
        {
          headers: { authorization: userStorage.token },
        },
      );
      updateUser();
      console.log('Usuário apagado com sucesso!');
    } catch (error) {
      console.log(error.message);
    }
  };

  const enableButton = () => {
    const n1 = 12;
    const n2 = 6;
    const condition = name.length >= n1 && password.length >= n2 && regex.test(email);
    return !condition;
  };

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const returnMessageError = () => {
    const errorMessage = (
      <div
        data-testid="admin_manage__element-invalid-register"
      >
        { message }
      </div>
    );
    return errorMessage;
  };

  return (
    <div>
      <nav>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Gerenciar Usuários
        </button>
        <div
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userStorage.name }
        </div>
        <button
          onClick={ logout }
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
        >
          Logout
        </button>
      </nav>
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
        id="select-role"
        onChange={ (e) => setRole(e.target.value) }
        defaultValue="Vendedor"
      >
        <option
          value="seller"
        >
          Vendedor
        </option>
        <option
          value="customer"
        >
          Comprador
        </option>
        <option
          value="administrator"
        >
          Administrador
        </option>
      </select>
      <button
        onClick={ registerUser }
        disabled={ enableButton() }
        type="button"
        data-testid="admin_manage__button-register"
      >
        Cadastrar
      </button>
      {
        message !== 'Usuário cadastrado com sucesso!'
          ? returnMessageError()
          : null
      }
      <p>Lista de Usuários</p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((user, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    'admin_manage__element-user-'
                    + `table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  { user.name }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  { user.email }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  { user.role }
                </td>
                <td>
                  <button
                    type="button"
                    onClick={ () => deleteUser(user.id) }
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
