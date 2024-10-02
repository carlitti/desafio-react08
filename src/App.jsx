import "./App.css";
import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Pizza from "./Pages/Pizza";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; 
import Profile from "./Pages/Profile";
import Notfound from "./Pages/Notfound";
import { CartProvider } from "./context/CartContext";
import { UserProvider, UserContext } from "./context/UserContext"; 

// Componente de Ruta Protegida
const ProtectedRoute = ({ element }) => {
  const { token } = useContext(UserContext);
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<Pizza />} /> 
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/404" element={<Notfound />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;


