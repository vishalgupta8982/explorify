import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [confirmation, setConfirmation] = useState(null);

  return (
    <AuthContext.Provider value={{confirmation, setConfirmation}}>
      {children}
    </AuthContext.Provider>
  );
};
