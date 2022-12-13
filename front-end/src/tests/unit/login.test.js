import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../renderWithRouter';
import App from '../../App';
import Nav from '../../components/Nav';

describe('Testando a tela login', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => [{ name: 'Jessica' }]),
      },
      writable: true,
    });
  });
  it('Deverá ter todos os inputs na tela de login;', () => {
    renderWithRouter(<App />);
    const login1 = screen.getByTestId('common_login__input-email');
    const login2 = screen.getByTestId('common_login__input-password');
    const login3 = screen.getByTestId('common_login__button-login');
    const login4 = screen.getByTestId('common_login__button-register');
    expect(login1).toBeInTheDocument();
    expect(login2).toBeInTheDocument();
    expect(login3).toBeInTheDocument();
    expect(login4).toBeInTheDocument();
  });
  it('Deverá ser possível ser redirecionado para a tela de register', () => {
    renderWithRouter(<App />);
    const register = screen.getByTestId('common_login__button-register');
    userEvent.click(register);
    const login1 = screen.getByTestId('common_register__input-name');
    const login2 = screen.getByTestId('common_register__input-email');
    const login3 = screen.getByTestId('common_register__input-password');
    const login4 = screen.getByTestId('common_register__button-register');
    // const login5 = screen.getByTestId('common_register__element-invalid_register');
    expect(login1).toBeInTheDocument();
    expect(login2).toBeInTheDocument();
    expect(login3).toBeInTheDocument();
    expect(login4).toBeInTheDocument();
    // expect(login5).toBeInTheDocument();
  });
  it('Testa o componente Nav', () => {
    renderWithRouter(
      <Nav />,
    );
    // const storage = [{ name: 'Jessica' }];
    // window.localStorage.setItem('storage', JSON.stringify(storage));
    const nav1 = screen.getByTestId('customer_products__element-navbar-link-products');
    const nav2 = screen.getByTestId('customer_products__element-navbar-link-orders');
    const nav3 = screen.getByTestId('customer_products__element-navbar-user-full-name');
    const nav4 = screen.getByTestId('customer_products__element-navbar-link-logout');
    expect(nav1).toBeInTheDocument();
    expect(nav2).toBeInTheDocument();
    expect(nav3).toBeInTheDocument();
    expect(nav4).toBeInTheDocument();
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });
});
