/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', matricula: '', setor: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Para navegação
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  // Validação do formulário
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(credentials.email);
    const isMatriculaValid = /^[0-9]*$/.test(credentials.matricula);

    if (!isEmailValid) {
      setErrorMessage('E-mail inválido.');
      return false;
    }
    if (!isMatriculaValid) {
      setErrorMessage('Matrícula deve conter apenas números.');
      return false;
    }
    return true;
  };

  // Exibir funcionalidades específicas para funcionários
  if (isAuthenticated) {
    if (user?.role === 'funcionario') {
      return <div>Bem-vindo, {user.name}</div>;
    }
    return <div>Bem-vindo, {user.name}</div>;
  }

  // Manipulador do envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) return;

    try {
      const response = await api.post('/login', credentials);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setErrorMessage('Falha ao realizar login. Verifique suas credenciais.');
    }
  };

  // Manipulador de mudanças nos campos do formulário
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Funções de login externo
  const handleConectaRecifeClick = () => {
    window.open('https://conectarecife.recife.pe.gov.br/', '_blank');
  };

  const handleGovBrClick = () => {
    window.open('https://sso.acesso.gov.br/login?client_id=portal-logado.estaleiro.serpro.gov.br&authorization_id=1928af70229', '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4" style={{ backgroundImage: "url('/images/backimage.png')" }}>
      <form onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-4 z-10"
      >
        <h2 className="text-2xl font-bold text-recifeBlue mb-4">Login</h2>
        
        <label htmlFor="email" className="block mb-2 font-bold text-recifeBlue">E-mail</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-3 w-full rounded-md border-2"
        />
        <label htmlFor="password" className="block mb-2  font-bold text-recifeBlue">Senha</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Senha"
          className="p-3 w-full rounded-md border-2"
        />
        <label htmlFor="matricula" className="block mb-2 font-bold text-recifeBlue">Matricula</label>
        <input
          type="text"
          name="matricula"
          value={credentials.matricula}
          onChange={handleChange}
          placeholder="Matricula"
          className="p-3 w-full rounded-md border-2"
        />

        <button
          type="submit"
          className="w-full bg-recifeBlue text-recifeWhite px-6 py-3 rounded-lg shadow-md hover:bg-recifeGold hover:text-recifeBlue transition duration-300"
        >
          Login
        </button>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Botões de login externo */}
        <div className="text-center mt-6">
          <p className="text-2xl font-bold text-recifeWhite mb-2">Logar com:</p>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={handleConectaRecifeClick} className="bg-recifeBlue text-recifeWhite px-4 py-2 m-2 rounded-lg hover:bg-recifeGold hover:text-recifeBlue">Conecta Recife</button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={handleGovBrClick} className="bg-recifeBlue text-recifeWhite px-4 py-2 m-2 rounded-lg hover:bg-recifeGold hover:text-recifeBlue">Gov.br</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
