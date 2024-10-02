import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"; // Asegúrate de importar el botón de Bootstrap
import "./CardPizza.css";

const CardPizza = ({ pizza, onAddToCart }) => {
  return (
    <Card className="card-pizza mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={pizza.img}
        alt={pizza.name}
        className="img-pizza"
      />
      <Card.Body className="text-center">
        <Card.Title className="pizza-title">{pizza.name}</Card.Title>
        <Card.Text className="pizza-price">{pizza.price} CLP</Card.Text>
        <ul className="list-group list-group-flush">
          {pizza.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="list-group-item text-center pizza-ingredient"
            >
              {ingredient}
            </li>
          ))}
        </ul>

        <Button variant="primary" className="mt-3" onClick={onAddToCart}>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;
