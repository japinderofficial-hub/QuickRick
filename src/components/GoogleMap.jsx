import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { useSim } from '../context/SimContext';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const mapStyles = [
  { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
  { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
  { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] },
  { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
  { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
  { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }
];

const MyGoogleMap = () => {
  const { userLocation, autos, demands, viewMode, bookingStatus, activeRide } = useSim();
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" // IMPORTANT: Insert your real Google Maps API Key here
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Update map bounds when ride is active
  useEffect(() => {
    if (map && activeRide && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(userLocation);
      bounds.extend(activeRide.destination);
      map.fitBounds(bounds, { top: 100, bottom: 100, left: 100, right: 100 });
    }
  }, [map, activeRide, userLocation]);

  if (!isLoaded) return <div className="w-full h-full bg-gray-50 animate-pulse flex items-center justify-center text-gray-400 font-medium italic">Enter Google Maps API Key to view map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: false,
        clickableIcons: false,
      }}
    >
      {/* User Location Marker */}
      <Marker
        position={userLocation}
        zIndex={10}
        icon={{
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
          fillColor: bookingStatus === 'enroute' ? "#276EF1" : "#000000",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
          scale: 1.5,
          anchor: new window.google.maps.Point(12, 24),
        }}
      />

      {/* Destination Marker */}
      {activeRide && (
        <Marker 
          position={activeRide.destination}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#000000",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
            scale: 1.2,
            anchor: new window.google.maps.Point(12, 24),
          }}
        />
      )}

      {/* Ride Path Polyline */}
      {activeRide && (
        <Polyline 
          path={[userLocation, activeRide.destination]}
          options={{
            strokeColor: "#000000",
            strokeOpacity: 0.5,
            strokeWeight: 3,
            icons: [{
              icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 4 },
              offset: '0',
              repeat: '20px'
            }],
          }}
        />
      )}

      {/* Show Autos for Passengers */}
      {viewMode === 'passenger' && autos.map(auto => {
        const isAssigned = activeRide && activeRide.autoId === auto.id;
        const shouldShow = !bookingStatus || isAssigned;
        
        if (!shouldShow) return null;

        return (
          <Marker
            key={auto.id}
            position={auto.position}
            zIndex={isAssigned ? 20 : 5}
            icon={{
              url: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
              scaledSize: new window.google.maps.Size(isAssigned ? 48 : 32, isAssigned ? 48 : 32),
              anchor: new window.google.maps.Point(isAssigned ? 24 : 16, isAssigned ? 24 : 16),
              rotation: auto.heading
            }}
          />
        );
      })}

      {/* Show Demands for Drivers */}
      {viewMode === 'driver' && demands.map(demand => (
        <Marker
          key={demand.id}
          position={demand.position}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#276EF1",
            fillOpacity: 0.9,
            strokeWeight: 3,
            strokeColor: "#ffffff",
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default React.memo(MyGoogleMap);
