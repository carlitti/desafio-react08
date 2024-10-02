import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { UserContext } from "../context/UserContext"; // Importa el contexto
import { Button, Col, Row, Modal } from "react-bootstrap";
import { FaExclamationTriangle, FaCheckCircle, FaPizzaSlice } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { register } = useContext(UserContext); 
  const navigate = useNavigate(); 
  const validarFormulario = async (event) => {
    event.preventDefault();
    if (email === "" || password === "" || confirmPassword === "") {
      setModalMessage("Faltan campos");
      setIsError(true);
      setShowModal(true);
      return;
    }

    if (password.length < 6) {
      setModalMessage("El tamaño de la contraseña debe ser 6 caracteres o más");
      setIsError(true);
      setShowModal(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas deben ser iguales");
      setIsError(true);
      setShowModal(true);
      return;
    }

    try {
      await register(email, password); 

      navigate("/profile");

      setModalMessage("Registro exitoso");
      setIsError(false);
      setShowModal(true);
    } catch (error) {
      setModalMessage("Error en el registro");
      setIsError(true);
      setShowModal(true);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>
          Registro Mamma Mia! <FaPizzaSlice style={{ color: "orange", fontSize: "1em", filter: "drop-shadow(2px 2px 2px #ff0000)" }} />
        </h1>
        <form onSubmit={validarFormulario}>
          <Row>
            <Col>Email</Col>
            <Col>
              <input
                type="email"
                value={email}
                placeholder="Introduce tu email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>Contraseña</Col>
            <Col>
              <input
                type="password"
                value={password}
                placeholder="Crea una contraseña"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>Confirmación de contraseña</Col>
            <Col>
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirma tu contraseña"
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </Col>
          </Row>
          <Button type="submit">Enviar</Button>
        </form>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        animation={true}
        className={isError ? "error-modal" : "success-modal"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isError ? (
              <FaExclamationTriangle style={{ color: "#dc3545" }} />
            ) : (
              <FaCheckCircle style={{ color: "#28a745" }} />
            )}
            {isError ? " Error" : " Éxito"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant={isError ? "danger" : "success"}
            onClick={() => setShowModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
