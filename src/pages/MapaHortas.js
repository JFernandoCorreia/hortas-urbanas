/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapaHortas() {
  const [hortas, setHortas] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [filtro, setFiltro] = useState(''); // Filtro para o tipo de cultivo

  // Função para obter a localização do usuário
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Erro ao obter a localização: ", error);
        }
      );
    } else {
      alert("Geolocalização não é suportada neste navegador.");
    }
  };

  // Chama a função de localização do usuário uma vez quando o componente carrega
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    getUserLocation();
  }, []);

  // Função para buscar dados das hortas
  const fetchHortas = async () => {
    try {
      const response = await fetch('/api/hortas'); // Substitua pela sua URL da API
      const data = await response.json();
      setHortas(data);
    } catch (error) {
      console.error("Erro ao buscar hortas:", error);
    }
  };

  // Carrega as hortas ao iniciar o componente e atualiza a cada 15 segundos
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    fetchHortas();
    const intervalId = setInterval(() => {
      fetchHortas();
    }, 15000);

    return () => clearInterval(intervalId); // Limpeza do intervalo ao desmontar
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <input
        type="text"
        placeholder="Filtrar por tipo"
        onChange={(e) => setFiltro(e.target.value)}
        className="border p-2 mb-4 w-full max-w-sm"
      />
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">Mapa das Hortas</h2>
        <MapContainer 
          center={userLocation || [37.7749, -122.4194]}
          zoom={userLocation ? 13 : 10}
          style={{ height: '80vh', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Exibe a localização do usuário se disponível */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Você está aqui!</Popup>
            </Marker>
          )}

          {/* Exibe as hortas no mapa, aplicando filtro se necessário */}
          {hortas
            .filter((horta) => horta.tipo.toLowerCase().includes(filtro.toLowerCase()))
            .map((horta, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Marker key={index} position={horta.localizacao}>
                <Popup>{horta.nome} - {horta.tipo}</Popup>
              </Marker>
            ))
          }
        </MapContainer>
      </div>
    </div>
  );
}

export default MapaHortas;
