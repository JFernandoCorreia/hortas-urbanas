import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

const DicasPage = () => {
  const [dicas, setDicas] = useState([]);

  useEffect(() => {
    const fetchDicas = async () => {
      try {
        const response = await axios.get('/api/dicas');
        setDicas(response.data);
      } catch (error) {
        console.error("Erro ao buscar dicas:", error);
      }
    };
    fetchDicas();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2>Dicas de Plantio e Cultivo</h2>
      <ul>
        {dicas.map((dica) => (
          <li key={dica.id} className="mb-4">
            <p>{dica.conteudo}</p>
            <div className="flex space-x-2 mt-2">
              <FacebookShareButton url={window.location.href}>
                Compartilhar no Facebook
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href}>
                Compartilhar no Twitter
              </TwitterShareButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DicasPage;
