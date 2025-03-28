import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      
      {/* 🔹 Header Responsivo */}
      <header className="bg-recifeBlue bg-opacity-100 p-4 sm:p-4 shadow-lg">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 items-center justify-between">
          
          {/* 🔹 Logo Prefeitura */}
          <div className="flex justify-center sm:justify-start w-full sm:w-auto mb-2 sm:mb-0">
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo-seau.png`} 
              alt="Prefeitura do Recife" 
              className="w-30 sm:w-40"
              loading="lazy" 
            />
          </div>

          {/* 🔹 Título Centralizado */}
          <div className="w-full flex justify-center mb-4 sm:mb-0">
            <a
              href={process.env.REACT_APP_API_URL || 'http://localhost:3000/'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-recifeWhite font-bold text-3xl sm:text-4xl hover:underline"
            >
              Flor da Cidade
            </a>
          </div>
        </div>
      </header>

      {/* 🔹 Conteúdo Principal */}
      <main 
        className="flex-grow flex flex-col items-center justify-center bg-white bg-opacity-80 p-4 sm:p-8 rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/backimage.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 sm:mb-6 text-recifeBlue">Bem-vindo as Hortas Urbanas</h1>
        
        <div className="space-y-4 w-full sm:w-3/4 max-w-md text-center">
          {[
            { path: "/login", label: "Acesso para Todos" },
            { path: "/inscricao", label: "Inscrição de Novas Hortas" },
            { path: "/mapa-hortas", label: "Mapa das Hortas" },
            { path: "/dicas", label: "Dicas Sobre Cultivo de Hortas" },
            { path: "/sobre", label: "Sobre o Projeto das Hortas" }
          ].map((item, index) => (
            <Link 
              key={index}
              to={item.path} 
              className="bg-recifeBlue text-recifeWhite px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </main>

      {/* 🔹 Rodapé Responsivo */}
      <footer className="bg-recifeBlue bg-opacity-100 p-3 sm:p-4 shadow-lg w-full mt-auto">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          
          {/* 🔹 Texto e Logo */}
          <div className="flex items-center justify-center space-x-4 mx-auto">
            <p className="text-recifeWhite text-base md:text-lg">&copy; 2025 Prefeitura do Recife</p>
            <img 
              src={`${process.env.PUBLIC_URL}/images/transferir7.png`}  
              alt="Prefeitura do Recife" 
              className="w-10 sm:w-16 h-auto" 
            />
          </div>

          {/* 🔹 Redes Sociais */}
          <div className="flex items-center space-x-2 md:space-x-2">
            {[
              { url: "https://www.facebook.com/prefeituradorecife", img: "Facebook_logo.png", alt: "Facebook" },
              { url: "https://x.com/prefrecife", img: "x.png", alt: "X" },
              { url: "https://www.instagram.com/prefeiturarecife/", img: "instagram.jpeg", alt: "Instagram" },
              { url: "https://www.youtube.com/channel/UCxMRq-Mv3UimnqOl6aRrM6Q", img: "youtube.png", alt: "YouTube" },
              { url: "https://www.flickr.com/photos/prefeituradorecife/", img: "flickr.png", alt: "Flickr" }
            ].map((social, index) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/${social.img}`} 
                  alt={social.alt} 
                  className="w-5 h-5 sm:w-5 sm:h-5"
                  loading="lazy" 
                />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
