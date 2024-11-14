import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapaHortas() {
  const [hortas, setHortas] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [filtro, setFiltro] = useState('');

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

  const fetchHortas = async () => {
    try {
      const response = await fetch('/api/hortas');
      const data = await response.json();
      setHortas(data);
    } catch (error) {
      console.error("Erro ao buscar hortas:", error);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getUserLocation();
    fetchHortas();
    const intervalId = setInterval(fetchHortas, 15000);
    return () => clearInterval(intervalId);
  }, []);

  function CentralizarBotao() {
    const map = useMap();
    return (
      // biome-ignore lint/a11y/useButtonType: <explanation>
      <button
        onClick={() => {
          if (userLocation) map.setView(userLocation, 13);
        }}
        className="bg-recifeBlue text-recifeWhite p-2 rounded shadow-lg"
      >
        Centralizar
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      <input
        type="text"
        placeholder="Filtrar por tipo"
        onChange={(e) => setFiltro(e.target.value)}
        className="border p-2 mb-4 w-full max-w-sm"
      />
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">Mapa das Hortas</h2>
        <div className="relative">
          <MapContainer 
            center={userLocation || [37.7749, -122.4194]}
            zoom={userLocation ? 13 : 10}
            style={{ height: '80vh', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>Você está aqui!</Popup>
              </Marker>
            )}
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
          {/* Botão centralizar fixo no mapa */}
          <div className="absolute top-4 right-4 z-10">
            <CentralizarBotao />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapaHortas;
