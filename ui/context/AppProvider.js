import React, { createContext, useState, useMemo } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("0");
  
  const totalPeople = people.length;

  const value = useMemo(() => ({
    selectedEvent,
    setSelectedEvent,
    people,
    setPeople,
    totalPeople,
    isLoading,
    setIsLoading,
  }), [selectedEvent, people, totalPeople]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
