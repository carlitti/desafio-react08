import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext"; 
import { useNavigate } from "react-router-dom"; 

const Profile = () => {
  const { email, fetchProfile, logout } = useContext(UserContext); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile(); 
  }, [fetchProfile]);

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      {email ? ( 
        <div>
          <p>Email: {email}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Profile;
