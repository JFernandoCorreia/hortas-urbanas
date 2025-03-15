/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Configuração do ícone personalizado
const userLocationIcon = L.icon({
  iconUrl: '/images/local.jpeg', // Caminho da imagem estática
  iconSize: [50, 50], // Tamanho do ícone
  iconAnchor: [25, 25], // Ponto de ancoragem (centro)
  popupAnchor: [0, -25], // Posição do popup em relação ao ícone
});

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
      className="fixed bottom-10 right-10 bg-recifeBlue text-white px-4 py-2 rounded shadow hover:bg-recifeGold z-50"
    >
      Centralizar no Usuário
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
        <h2 className="text-2xl font-bold mb-4 text-center">Mapa das Hortas</h2>
        <MapContainer
          center={userLocation || [37.7749, -122.4194]} // Localização do usuário ou posição padrão
          zoom={userLocation ? 13 : 10}
          style={{ height: '80vh', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Exibe a localização do usuário com a imagem personalizada */}
          {userLocation && (
            <Marker position={userLocation} icon={userLocationIcon}>
              <Popup>Você está aqui!</Popup>
            </Marker>
          )}

          {/* Exibe o botão de centralizar no usuário */}
          {userLocation && <CentralizarBotao center={userLocation} />}

          {/* Exibe a localização do usuário se disponível */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Você está aqui!</Popup>
            </Marker>
          )}

          {/* Exibe as hortas no mapa com filtro */}
          {hortas
            .filter((horta) => horta.tipo.toLowerCase().includes(filtro.toLowerCase()))
            .map((horta, index) => (
              <Marker key={horta.id || index} position={[horta.latitude, horta.longitude]}>
                <Popup>
                  <strong>{horta.nome}</strong>
                  <br />
                  {horta.tipo}
                </Popup>
              </Marker>
            ))
          }
        </MapContainer>
      </div>
    </div>
  );
}

export default MapaHortas;
