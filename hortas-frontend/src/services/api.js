/* eslint-disable no-undef */
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

/// Interceptor para adicionar o token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas de erro (e.g., 401 - Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Verifique o status do código de erro
      switch (error.response.status) {
        case 401:
          // Lidar com o erro de autenticação (token inválido ou expirado)
          localStorage.removeItem('token'); // Remove o token expirado
          console.error("Sessão expirada. Faça login novamente.");
          // Navegue para a página de login ou redirecione o usuário
          window.location.href = '/login'; // Redireciona para a página de login
          break;
        case 400: // Tratamento de erro 400 (BadRequest)
          console.error("Erro 400 (BadRequest):", error.response.data);
          // Exibe notificação ao usuário (e.g., usando uma biblioteca como toast)
          toast.error('Erro ao fazer a requisição. Verifique os dados informados.');
          break;
        default:
          console.error("Erro na requisição:", error.response.data);
          toast.error('Erro ao fazer a requisição. Tente novamente mais tarde.');
          break;
      }

      return Promise.reject(error); // Rejeita a promessa, permitindo que o componente trate o erro
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (error.request) {
      // O pedido foi feito, mas não houve resposta
      console.error("Sem resposta do servidor.");
      toast.error('Sem resposta do servidor. Tente novamente mais tarde.');
    } else {
      // Houve um erro durante a configuração ou execução da solicitação
      console.error("Erro na configuração da requisição:", error.message);
      toast.error('Erro na configuração da requisição.');
    }

    return Promise.reject(error);
  }
);

export default api;
