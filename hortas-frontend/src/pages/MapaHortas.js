/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Botão de Centralização
function CentralizarBotao({ center }) {
  const map = useMap();

  const handleClick = () => {
    if (center) {
      map.setView(center, 13); // Define a visão central e o zoom
    } else {
      alert('Localização do usuário não disponível.');
    }
  };

  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 md:bottom-10 md:right-10 bg-recifeBlue text-white px-3 py-2 text-sm md:text-base rounded shadow hover:bg-recifeGold z-50"
    >
      📍 Centralizar
    </button>
  );
}

function MapaHortas() {
  const [hortas, setHortas] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [filtro, setFiltro] = useState(''); // Filtro por tipo de cultivo

  // Função para acompanhar a localização do usuário em tempo real
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Erro ao acompanhar a localização: ", error);
      },
      {
        enableHighAccuracy: true, // Maior precisão possível
        maximumAge: 0,
        timeout: 5000,
      }
    );

    // Limpa o watchPosition ao desmontar
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Função para buscar hortas do banco de dados
  const fetchHortas = async () => {
    try {
      const response = await axios.get('/api/hortas'); // Substituir pela URL da API
      setHortas(response.data);
    } catch (error) {
      console.error("Erro ao buscar hortas:", error);
    }
  };

  // Atualiza hortas periodicamente
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    fetchHortas();
    const intervalId = setInterval(() => {
      fetchHortas();
    }, 15000);

    return () => clearInterval(intervalId); // Limpeza do intervalo ao desmontar o componente
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <input
        type="text"
        placeholder="Filtrar por tipo"
        onChange={(e) => setFiltro(e.target.value)}
        className="border p-2 mb-4 w-full max-w-sm"
      />

      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 relative">
      
        {/* Caixa branca contendo o mapa */}
        <div className="bg-white p-4 rounded-md shadow-md relative z-10">
          <h2 className="text-recifeBlue text-3xl font-bold mb-4 text-center">Mapa das Hortas</h2>
        
           <MapContainer
            center={userLocation || [37.7749, -122.4194]}
            zoom={userLocation ? 13 : 10}
            style={{
                height: '60vh', // Mantém altura ajustada dentro da caixa
                width: '100%',
                 minHeight: '300px',
                 marginTop: '10px', // Pequeno espaçamento do título
                  }}
             className="relative"
            >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
             {userLocation && <CentralizarBotao center={userLocation} />}
      
             {userLocation && (
            <Marker position={userLocation}>
              <Popup>Você está aqui!</Popup>
            </Marker>
                )}

              {hortas
                .filter((hortas) => hortas.tipo.toLowerCase().includes(filtro.toLowerCase()))
                .map((hortas, index) => (
                <Marker key={hortas.id || index} position={[hortas.latitude, hortas.longitude]}>
                 <Popup>
                   <strong>{hortas.nome}</strong>
                   <br />
                   {hortas.tipo}
                  </Popup>
                </Marker>
              ))
            }
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapaHortas;
