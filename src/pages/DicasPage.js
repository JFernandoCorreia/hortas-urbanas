import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

const DicasPage = () => {
  const [dicas, setDicas] = useState([]);

  useEffect(() => {
    const fetchDicas = async () => {
      const response = await axios.get('/api/dicas');
      setDicas(response.data);
    };
    fetchDicas();
  }, []);

  return (
    <div className="container">
      <h2>Dicas de Plantio e Cultivo</h2>
      <ul>
        {dicas.map((dica) => (
          <li key={dica.id}>{dica.conteudo}
          <FacebookShareButton url={window.location.href}>
          Compartilhar no Facebook
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href}>
          Compartilhar no Twitter
          </TwitterShareButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DicasPage;