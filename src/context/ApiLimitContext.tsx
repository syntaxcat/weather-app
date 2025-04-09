import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context
interface ApiLimitContextType {
  apiLimitReached: boolean;
  setApiLimitReached: (value: boolean) => void;
}

// Create the context with a default value of undefined
const ApiLimitContext = createContext<ApiLimitContextType | undefined>(undefined);

// This is the provider component, we are using ReactNode for children type
export const ApiLimitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiLimitReached, setApiLimitReached] = useState(false);

  return (
    <ApiLimitContext.Provider value={{ apiLimitReached, setApiLimitReached }}>
      {children}
    </ApiLimitContext.Provider>
  );
};

// Custom hook to use the ApiLimit context
export const useApiLimit = (): ApiLimitContextType => {
  const context = useContext(ApiLimitContext);
  if (!context) {
    throw new Error('useApiLimit must be used within an ApiLimitProvider');
  }
  return context;
};