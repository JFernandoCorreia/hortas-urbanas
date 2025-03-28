import React from 'react';

const SobrePage = () => (
  <div className="container mx-auto p-8 text-recifeBlue text-center bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/images/fundo.jpg')" }}>
    {/* Caixa branca para melhorar a legibilidade do texto */}
    <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">Sobre o Projeto Hortas Urbanas</h2>

      <p className="text-lg leading-relaxed max-w-3xl mx-auto">
        O <strong>Projeto Hortas Urbanas Recife</strong> tem como objetivo transformar espaços urbanos em áreas verdes produtivas, promovendo o cultivo sustentável de alimentos e incentivando hábitos mais saudáveis.  
        Através da agricultura urbana, buscamos fortalecer o vínculo entre a população e o meio ambiente, utilizando terrenos subutilizados para a criação de hortas comunitárias que beneficiam a cidade como um todo.
      </p>

      <p className="text-lg leading-relaxed max-w-3xl mx-auto mt-4">
        Além de fornecer alimentos frescos e livres de agrotóxicos, o projeto também atua na <strong>educação ambiental</strong>, conscientizando a população sobre a importância da sustentabilidade, da redução do desperdício e da valorização dos alimentos orgânicos.  
        Oficinas, palestras e atividades interativas são realizadas para envolver a comunidade no processo de cultivo e manutenção das hortas.
      </p>

      <p className="text-lg leading-relaxed max-w-3xl mx-auto mt-4">
        O impacto positivo do projeto não se restringe apenas ao meio ambiente e à alimentação saudável. Ele também contribui para a <strong>inclusão social</strong>, oferecendo oportunidades de capacitação para moradores da região, além de incentivar o comércio local através da venda dos produtos cultivados.
      </p>

      <h3 className="text-2xl font-semibold mt-6">Nossos Parceiros</h3>
      <p className="text-lg leading-relaxed max-w-3xl mx-auto mt-2">
        O projeto conta com o apoio da <strong>Prefeitura do Recife</strong>, ONGs locais e voluntários da comunidade, que atuam diretamente na implementação e manutenção das hortas.  
        Empresas e instituições também podem contribuir com recursos, materiais e conhecimento técnico para fortalecer a iniciativa e expandir o impacto positivo na cidade.
      </p>

      <p className="text-lg font-bold mt-6 text-recifeGold">
        🌱 Junte-se a nós e ajude a construir um Recife mais verde e sustentável! 🌿  
      </p>
    </div>
  </div>
);

export default SobrePage;
