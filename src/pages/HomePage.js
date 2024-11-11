import React from 'react';
import { Link } from 'react-router-dom';
import AccessibilityMenu from '../components/AccessibilityMenu';

const HomePage = () => {
  // Função para redirecionar para a URL configurada no .env
  const handleFlorDaCidadeClick = () => {
    const url = process.env.REACT_APP_API_URL || 'http://localhost:3000/';
    window.location.href = url;  // Redireciona para a URL configurada
  };

  return (
    <div className="relative h-screen flex flex-col">
      <header className="bg-recifeBlue  bg-opacity-100 p-4 shadow-lg">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          {/* Texto da Secretaria */}
          <div className="w-full sm:w-1/3 text-center sm:text-left mb-4 sm:mb-auto">
            <img src={`${process.env.PUBLIC_URL}/images/logo-seau.png`} alt="Prefeitura do Recife" className="logo-seau" />
          </div>

          {/* Centralizar Flor da Cidade */}
          <div className="w-full sm:w-1/3 flex justify-center mb-4 sm:mb-0">
            {/* Link agora chama a função de redirecionamento */}
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={handleFlorDaCidadeClick} className="text-recifeWhite font-bold text-2xl sm:text-4xl hover:underline">
              Flor da Cidade
            </button>
          </div>

          <div className="w-full sm:w-1/3 flex justify-center sm:justify-end">
            <AccessibilityMenu />
          </div>
        </div>
      </header>

      {/* Corpo principal */}
      <main className="flex-grow flex flex-col items-center justify-center bg-white bg-opacity-80 p-4 sm:p-8 rounded-lg shadow-lg mb-20" 
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/flores.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-recifeWhite">Bem-vindo as Hortas Urbanas</h1>
        <div className="space-y-4 w-full sm:w-3/4 max-w-md text-center">
          <Link to="/mapa-hortas" className="bg-recifeBlue text-recifeWhite px-4 sm:px-6 py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block">
            Mapa das Hortas
          </Link>
          <Link to="/login" className="bg-recifeBlue text-recifeWhite px-4 sm:px-6 py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block">
            Acesso para Todos
          </Link>
          <Link to="/inscricao" className="bg-recifeBlue text-recifeWhite px-4 sm:px-6 py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block">
            Inscrição de Novas Hortas
          </Link>
          <Link to="/dicas" className="bg-recifeBlue text-recifeWhite px-4 sm:px-6 py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block">
            Dicas Sobre Cultivo
          </Link>
          <Link to="/sobre" className="bg-recifeBlue text-recifeWhite px-4 sm:px-6 py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block">
            Sobre
          </Link>
        </div>
      </main>

      {/* Rodapé fixo ao fundo da página com opacidade ajustada */}
      <footer className="bg-recifeBlue bg-opacity-100 p-4 shadow-lg fixed bottom-0 w-full">
        {/* Texto centralizado */}
        <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex items-center justify-center space-x-1 mx-auto">
          <p className="text-recifeWhite text-base md:text-lg">&copy; 2024 Prefeitura do Recife</p>
          <img src={`${process.env.PUBLIC_URL}/images/transferir7.png`} alt="Prefeitura do Recife" className="w-16 h-auto" />
        </div>

        {/* Links para redes sociais no canto direito com ícones uniformes */}
        <div className="flex items-center space-x-2 md:space-x-2">
          <a href="https://www.facebook.com/prefeituradorecife" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src={`${process.env.PUBLIC_URL}/images/Facebook_logo.png`} alt="Facebook" className="w-5 h-5" />
          </a>
          <a href="https://x.com/prefrecife" target="_blank" rel="noopener noreferrer" aria-label="X">
            <img src={`${process.env.PUBLIC_URL}/images/x.png`} alt="X" className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/prefeiturarecife/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src={`${process.env.PUBLIC_URL}/images/instagram.jpeg`} alt="Instagram" className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/channel/UCxMRq-Mv3UimnqOl6aRrM6Q" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img src={`${process.env.PUBLIC_URL}/images/youtube.png`} alt="YouTube" className="w-5 h-5" />
          </a>
          <a href="https://www.flickr.com/photos/prefeituradorecife/" target="_blank" rel="noopener noreferrer" aria-label="Flickr">
            <img src={`${process.env.PUBLIC_URL}/images/flickr.png`} alt="Flickr" className="w-5 h-5" />
          </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
