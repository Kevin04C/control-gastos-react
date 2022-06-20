import { useEffect } from "react";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgetControl = ({ budget, gastos }) => {

  const [stateGastos, setStateGastos] = useState({total:0, disponible:0});
  const { total, disponible} = stateGastos;
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const gastado = gastos.reduce((acu, curr) => acu + Number(curr.cantidad),0);
    setStateGastos({...stateGastos, total: gastado});
    setStateGastos({...stateGastos, disponible: budget - gastado})
    setTimeout(() => {
      setPercentage(((gastado*100) / budget).toFixed(2))
    }, 900);
  }, [gastos])
  

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
            pathColor: '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: '#3B82F6'
          })} 
          value={percentage} 
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span> {amoutFormat(budget)}
        </p>
        <p>
          <span>Disponible: </span> {amoutFormat(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {amoutFormat(total)}
        </p>
      </div>
    </div>
  );
};
