import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
// import pizzas from '../pizzas';
import '../App.css';
import { CartContext } from "../context/CartContext";

const Home= () => {
  const [pizzas, setPizzas] = useState([])
  const {addToCart} = useContext(CartContext);

  const getPizzas = async () => {
    const respuesta = await fetch ('http://localhost:5000/api/pizzas')
    const pizzas= await respuesta.json()
    console.log(pizzas);
    setPizzas(pizzas);
  }

  useEffect(() => {
    getPizzas()
  },[])

  
  return(
    <div className="pizza-list">
      {pizzas.map((pizza) =>(
        <CardPizza key={pizza.id} pizza={pizza} onAddToCart={() => addToCart(pizza)}/>
      ))}
    </div>
  );
};
export default Home;