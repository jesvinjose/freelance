import React, { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxComponent = ({ onLocationSelect }) => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
  });

  const handleClick = (event) => {
    const latitude = event.lngLat[1];
    const longitude = event.lngLat[0];
    
    setMarkerPosition({ latitude, longitude });

    // Pass the selected location to the parent component
    if (onLocationSelect) {
      onLocationSelect({ latitude, longitude });
    }
  };

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="400px"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(newViewport) => setViewport(newViewport)}
      mapboxApiAccessToken="pk.eyJ1IjoiamVzdmluam9zZSIsImEiOiJjbTB6bGwxZ2QwODFhMm1zZjYzaTA3OG5iIn0.IBA5dzpAwEgF8v0OFhjq1A"
      onClick={handleClick}
    >
      <Marker latitude={markerPosition.latitude} longitude={markerPosition.longitude}>
        <div>📍</div>
      </Marker>
    </MapGL>
  );
};

export default MapboxComponent;
