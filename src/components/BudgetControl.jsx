import { useEffect } from "react";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const BudgetControl = ({
  budget,
  gastos,
  setIsValidBudget,
  setGastos,
  setBudget,
}) => {
  const [stateGastos, setStateGastos] = useState({ total: 0, disponible: 0 });
  const { total, disponible } = stateGastos;
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const gastado = gastos.reduce(
      (acu, curr) => acu + Number(curr.cantidad),
      0
    );

    setStateGastos({ total: gastado, disponible: budget - gastado });

    setTimeout(() => {
      setPercentage(((gastado * 100) / budget).toFixed(2));
    }, 900);
  }, [gastos]);

  const handleReset = () => {
    const responseReset = confirm("¿Estas seguro que deseas restear la APP?");

    if (responseReset) {
      setIsValidBudget(false);
      setGastos([]);
      setBudget(0);
      localStorage.setItem("budget", JSON.stringify(0));
      localStorage.setItem("validBudget", JSON.stringify(false));
      localStorage.setItem("gastos", JSON.stringify([]));
    }
  };

  const amoutFormat = (amout) => {
    return amout.toLocaleString("es-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: `${disponible < 0 ? "#DC2626" : "#3B82F6"}`,
            trailColor: "#F5F5F5",
            textColor: `${disponible < 0 ? "#DC2626" : "#3B82F6"}`,
          })}
          value={percentage}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleReset}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {amoutFormat(budget)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {amoutFormat(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {amoutFormat(total)}
        </p>
      </div>
    </div>
  );
};
