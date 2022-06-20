import React, { useState } from "react";
import { Message } from "./Message";

export const NewBudget = ({ budget, setBudget,setIsValidBudget }) => {
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!budget || Number(budget) <= 0) {
      setMessage("Presupuesto NO VÁLIDO");
      return;
    }
    setMessage(null);
    setIsValidBudget(true);
    localStorage.setItem("validBudget", true);
  };

  const handleInputChange = (e) => {
    setBudget(Number(e.target.value));
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Definir presupuesto</label>

          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Añade tu presupuesto"
            value={budget}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Añadir" />
        {
          message && <Message type="error">{message}</Message>
        }
      </form>
    </div>
  );
};
