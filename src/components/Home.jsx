import React, { useState, useEffect } from 'react';
import { useSim } from '../context/SimContext';
import GoogleMap from './GoogleMap';
import Header from './Header';
import { Search, Clock, Home as HomeIcon, Briefcase, MapPin, ChevronRight, ArrowLeft, Info, Calendar, CreditCard, ChevronDown, User, Shield, Star, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const { viewMode, userLocation, bookingStatus, activeRide, startBooking, cancelBooking } = useSim();
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRide, setSelectedRide] = useState('auto');
  const [destination, setDestination] = useState('');

  const rideTypes = [
    { id: 'auto', name: 'QuickRick', price: '₹45', time: '2 min', icon: '🛺', desc: 'Affordable rickshaw rides' },
    { id: 'premier', name: 'RickPremier', price: '₹75', time: '4 min', icon: '✨', desc: 'Top-rated drivers & newer vehicles' },
    { id: 'intercity', name: 'Intercity', price: '₹450', time: '10 min', icon: '🏙️', desc: 'Travel between cities' }
  ];

  // Auto-close search when booking starts
  useEffect(() => {
    if (bookingStatus === 'searching') {
      setIsSearching(false);
    }
  }, [bookingStatus]);

  const handleConfirm = () => {
    startBooking(destination || 'Indiranagar Metro', selectedRide);
  };

  return (
    <div className="relative h-full w-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <Header />

      <main className="flex-1 flex flex-col md:flex-row relative mt-[73px]">
        {/* Sidebar - Desktop / Bottom Sheet - Mobile */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-white z-20 flex flex-col shadow-2xl relative">
          <AnimatePresence mode="wait">
            {bookingStatus === 'searching' ? (
              <motion.div
                key="searching-ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6"
              >
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">🛺</div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Connecting you to a ride</h2>
                  <p className="text-gray-500 mt-2">Finding the best Rickshaw near you...</p>
                </div>
                <button 
                  onClick={cancelBooking}
                  className="uber-btn-secondary w-full max-w-xs"
                >
                  Cancel Request
                </button>
              </motion.div>
            ) : bookingStatus === 'accepted' || bookingStatus === 'enroute' ? (
              <motion.div
                key="ride-active-ui"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col"
              >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-black text-white">
                  <div>
                    <h2 className="text-sm font-bold opacity-70 uppercase tracking-widest">
                      {bookingStatus === 'accepted' ? 'Driver is arriving' : 'On your way'}
                    </h2>
                    <p className="text-xl font-bold">{bookingStatus === 'accepted' ? '2 min away' : '12 min to destination'}</p>
                  </div>
                  <Shield size={24} className="text-blue-400" />
                </div>

                <div className="p-6 flex-1 space-y-8 overflow-y-auto">
                  {/* Driver Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl relative">
                        👤
                        <div className="absolute -bottom-1 -right-1 bg-white shadow-md rounded-full px-1.5 py-0.5 flex items-center gap-1 text-[10px] font-bold">
                          <Star size={10} className="fill-yellow-400 text-yellow-400" />
                          {activeRide?.rating}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{activeRide?.autoName}</h3>
                        <p className="text-gray-500 font-medium">KA 01 AB 1234 • White Bajaj</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><Phone size={20} /></button>
                       <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><MessageSquare size={20} /></button>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="space-y-4 pt-6 border-t border-gray-100">
                     <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <p className="text-sm font-medium text-gray-600 truncate">Current Location</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-black"></div>
                        <p className="text-sm font-bold truncate">{activeRide?.destinationName}</p>
                     </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-white space-y-4">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 font-bold">
                         <CreditCard size={18} />
                         <span>₹45.00</span>
                      </div>
                      <button onClick={cancelBooking} className="text-sm font-bold text-red-500">Cancel Ride</button>
                   </div>
                   <button className="w-full uber-btn-primary bg-blue-600 hover:bg-blue-700">
                      Share Trip Status
                   </button>
                </div>
              </motion.div>
            ) : bookingStatus === 'completed' ? (
              <motion.div
                key="ride-completed-ui"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">✓</div>
                <h2 className="text-3xl font-bold">You've arrived!</h2>
                <p className="text-gray-500 mt-2 mb-8">Hope you enjoyed your ride with {activeRide?.autoName}.</p>
                <button 
                  onClick={cancelBooking}
                  className="uber-btn-primary w-full"
                >
                  Done
                </button>
              </motion.div>
            ) : !isSearching ? (
              <motion.div
                key="default-home"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col"
              >
                <div className="p-6 space-y-8 overflow-y-auto flex-1">
                  <h1 className="text-4xl font-bold tracking-tight">Go anywhere with QuickRick</h1>
                  
                  {/* Search Interaction */}
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                      </div>
                      <input 
                        className="w-full bg-gray-100 h-14 rounded-lg pl-12 pr-4 font-medium text-lg focus:bg-white border-2 border-transparent focus:border-black transition-all outline-none"
                        placeholder="Enter pickup location"
                        defaultValue="Current Location"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <div className="w-2.5 h-2.5 bg-black"></div>
                      </div>
                      <input 
                        onFocus={() => setIsSearching(true)}
                        className="w-full bg-gray-100 h-14 rounded-lg pl-12 pr-4 font-medium text-lg focus:bg-white border-2 border-transparent focus:border-black transition-all outline-none"
                        placeholder="Where to?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Quick Shortcuts */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                      <div className="bg-white p-2 rounded-full shadow-sm"><HomeIcon size={20} /></div>
                      <div>
                        <div className="font-bold text-sm">Home</div>
                        <div className="text-xs text-gray-500">Add home</div>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                      <div className="bg-white p-2 rounded-full shadow-sm"><Briefcase size={20} /></div>
                      <div>
                        <div className="font-bold text-sm">Work</div>
                        <div className="text-xs text-gray-500">Add work</div>
                      </div>
                    </button>
                  </div>

                  {/* Ride Suggestions */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Suggestions</h2>
                    <div className="grid grid-cols-3 gap-3">
                      {rideTypes.map(ride => (
                        <button 
                          key={ride.id}
                          onClick={() => {
                            setSelectedRide(ride.id);
                            setIsSearching(true);
                          }}
                          className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all border-2 border-transparent hover:border-gray-200"
                        >
                          <span className="text-3xl">{ride.icon}</span>
                          <span className="text-xs font-bold">{ride.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-white">
                   <button className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all">
                     See all rides
                   </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="search-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 flex flex-col h-full"
              >
                {/* Search Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => setIsSearching(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ArrowLeft size={24} />
                    </button>
                    <h2 className="text-2xl font-bold">Choose a ride</h2>
                  </div>

                  <div className="space-y-3 relative">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200"></div>
                    <div className="flex items-center gap-4 pl-4 pr-2 py-3 bg-gray-50 rounded-lg">
                      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full shrink-0"></div>
                      <span className="font-medium text-gray-600 truncate">Current Location</span>
                    </div>
                    <div className="flex items-center gap-4 pl-4 pr-2 py-3 bg-white border-2 border-black rounded-lg">
                      <div className="w-2.5 h-2.5 bg-black shrink-0"></div>
                      <input 
                        className="font-medium outline-none w-full" 
                        placeholder="Where to?" 
                        autoFocus
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Ride Selection List */}
                <div className="flex-1 overflow-y-auto p-2">
                  <div className="px-4 py-3 flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-widest">
                    <span>Available Rides</span>
                    <Info size={16} />
                  </div>
                  
                  {rideTypes.map(ride => (
                    <button 
                      key={ride.id}
                      onClick={() => setSelectedRide(ride.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all mb-2 ${selectedRide === ride.id ? 'bg-gray-100 ring-2 ring-black' : 'hover:bg-gray-50'}`}
                    >
                      <div className="text-4xl w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm">
                        {ride.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{ride.name}</span>
                          <User size={14} className="text-gray-400" />
                          <span className="text-xs text-gray-400 font-bold">1-3</span>
                        </div>
                        <div className="text-sm text-gray-500">{ride.time} dropoff</div>
                        <div className="text-xs text-gray-400">{ride.desc}</div>
                      </div>
                      <div className="text-xl font-bold">{ride.price}</div>
                    </button>
                  ))}
                </div>

                {/* Payment & Action */}
                <div className="p-6 bg-white border-t border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-sm font-bold hover:bg-gray-100 px-3 py-2 rounded-full transition-colors">
                      <CreditCard size={18} />
                      <span>Personal •••• 4242</span>
                      <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center gap-2 text-sm font-bold hover:bg-gray-100 px-3 py-2 rounded-full transition-colors">
                      <span>Schedule</span>
                      <Calendar size={18} />
                    </button>
                  </div>
                  
                  <button 
                    className="w-full bg-black text-white py-4 rounded-xl text-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
                    onClick={handleConfirm}
                  >
                    Confirm {rideTypes.find(r => r.id === selectedRide)?.name}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Map Container */}
        <div className="flex-1 h-full relative">
          <GoogleMap />
          
          {/* Floating UI Elements on Map */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            <button className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <MapPin size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
