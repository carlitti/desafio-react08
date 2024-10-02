import React, { useContext } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { convertToCLPCurrency } from "../components/utils"; 
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext"; // Importa el UserContext

function NavbarApp() {
  const { calculateTotal } = useContext(CartContext); 
  const total = calculateTotal();
  const { token, logout } = useContext(UserContext); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Nav className="d-flex align-items-center gap-2">
          <Navbar.Brand as={Link} to="/">Pizzería Mamma Mia!</Navbar.Brand>
          <Button as={Link} className="btn-sm" variant="outline-light" to="/">🍕Home</Button>
          
          {token ? (
            <>
              <Button as={Link} className="btn-sm" variant="outline-light" to="/profile">🔓Profile</Button>
              <Button onClick={handleLogout} className="btn-sm" variant="outline-light">🔒Logout</Button>
              <Button as={Link} className="btn-sm" variant="outline-info" to="/cart">🛒Total: {convertToCLPCurrency(total)}</Button>
            </>
          ) : (
            <>
              <Button as={Link} className="btn-sm" variant="outline-light" to="/register">🔐Register</Button>
              <Button as={Link} className="btn-sm" variant="outline-light" to="/login">🔐Login</Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
