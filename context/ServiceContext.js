import { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [selectedService, setSelectedService] = useState('');

  const selectService = (serviceId) => {
    setSelectedService(serviceId);
  };

  return (
    <ServiceContext.Provider value={{ selectedService, selectService }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
} 