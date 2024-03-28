import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FaBorderNone } from "react-icons/fa";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("")

  async function login(username, password) {
    try {
      const response = await fetch('https://fitness-gym-genius.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: username,
          userPassword: password
        })
      });

      const data = await response.json();
      const jwtToken = data.jwtToken;
      localStorage.setItem('jwtToken', jwtToken);
      
      if (response.status === 200) {
        setAuthenticated (true);
        setUserEmail (username)
        setJwtToken (jwtToken)
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        userEmail,
        jwtToken,
        setJwtToken,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
