import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SimContext = createContext();

export const useSim = () => useContext(SimContext);

export const SimProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('passenger'); // 'passenger' or 'driver'
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Bangalore default
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [demands, setDemands] = useState([]);
  const [autos, setAutos] = useState([]);
  const [isLocating, setIsLocating] = useState(false);
  
  // Booking States: null, 'searching', 'accepted', 'enroute', 'completed'
  const [bookingStatus, setBookingStatus] = useState(null);
  const [activeRide, setActiveRide] = useState(null);

  // Initialize simulated autos
  useEffect(() => {
    const initialAutos = Array.from({ length: 15 }).map((_, i) => ({
      id: `auto-${i}`,
      position: {
        lat: userLocation.lat + (Math.random() - 0.5) * 0.02,
        lng: userLocation.lng + (Math.random() - 0.5) * 0.02,
      },
      heading: Math.random() * 360,
      name: `Ramesh ${i+1}`,
      rating: (4 + Math.random()).toFixed(1)
    }));
    setAutos(initialAutos);
  }, [userLocation]);

  // Simulate auto movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAutos(prevAutos => prevAutos.map(auto => {
        // If this auto is part of an active ride, move it towards the user or destination
        if (activeRide && activeRide.autoId === auto.id) {
          const target = bookingStatus === 'accepted' ? userLocation : activeRide.destination;
          const latDiff = target.lat - auto.position.lat;
          const lngDiff = target.lng - auto.position.lng;
          const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
          
          if (distance < 0.0001) {
             if (bookingStatus === 'accepted') setBookingStatus('enroute');
             if (bookingStatus === 'enroute') setBookingStatus('completed');
          }

          return {
            ...auto,
            position: {
              lat: auto.position.lat + (latDiff * 0.1),
              lng: auto.position.lng + (lngDiff * 0.1),
            },
            heading: Math.atan2(lngDiff, latDiff) * (180 / Math.PI)
          };
        }

        return {
          ...auto,
          position: {
            lat: auto.position.lat + (Math.random() - 0.5) * 0.0002,
            lng: auto.position.lng + (Math.random() - 0.5) * 0.0002,
          },
          heading: auto.heading + (Math.random() - 0.5) * 20,
        };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [activeRide, bookingStatus, userLocation]);

  const startBooking = (destinationName, rideType) => {
    setBookingStatus('searching');
    
    // Simulate finding a driver
    setTimeout(() => {
      const nearestAuto = autos[Math.floor(Math.random() * autos.length)];
      setActiveRide({
        autoId: nearestAuto.id,
        autoName: nearestAuto.name,
        rating: nearestAuto.rating,
        destinationName,
        destination: { 
          lat: userLocation.lat + (Math.random() - 0.5) * 0.01, 
          lng: userLocation.lng + (Math.random() - 0.5) * 0.01 
        },
        rideType
      });
      setBookingStatus('accepted');
    }, 3000);
  };

  const cancelBooking = () => {
    setBookingStatus(null);
    setActiveRide(null);
  };

  const login = (phone) => {
    setIsLoggedIn(true);
    setUser({ phone });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const addDemand = useCallback(() => {
    const newDemand = {
      id: `demand-${Date.now()}`,
      position: {
        lat: userLocation.lat + (Math.random() - 0.5) * 0.001,
        lng: userLocation.lng + (Math.random() - 0.5) * 0.001,
      },
      timestamp: Date.now(),
    };
    setDemands(prev => [...prev, newDemand]);
  }, [userLocation]);

  const locateUser = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserLocation(coords);
        setIsLocating(false);
      }, () => {
        setIsLocating(false);
      });
    } else {
      setIsLocating(false);
    }
  };

  return (
    <SimContext.Provider value={{
      viewMode,
      setViewMode,
      userLocation,
      setUserLocation,
      demands,
      autos,
      addDemand,
      locateUser,
      isLocating,
      isLoggedIn,
      login,
      logout,
      user,
      bookingStatus,
      activeRide,
      startBooking,
      cancelBooking
    }}>
      {children}
    </SimContext.Provider>
  );
};
