import React from 'react';
import { SimProvider, useSim } from './context/SimContext';
import Login from './components/Login';
import Home from './components/Home';
import { motion, AnimatePresence } from 'framer-motion';

const AppContent = () => {
  const { isLoggedIn } = useSim();

  return (
    <AnimatePresence mode="wait">
      {!isLoggedIn ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Login />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-screen w-screen overflow-hidden bg-white text-black"
        >
          {/* Main Content Area */}
          <Home />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <SimProvider>
      <AppContent />
    </SimProvider>
  );
}

export default App;
