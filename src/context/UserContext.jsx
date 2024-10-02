import React, { createContext, useState } from 'react';

// Crea el UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null); 
  const [email, setEmail] = useState("");

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
      } else {
        console.error("Login error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const register = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
      } else {
        console.error("Register error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEmail(data.email);
      } else {
        console.error("Profile fetch error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const logout = () => {
    setToken(null); 
    setEmail(""); 
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, fetchProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};
