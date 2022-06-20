import { useEffect } from "react";
import { Bill } from "./Bill";

export const BillsList = ({
  gastos,
  setGastoEdit,
  deleteGasto,
  stateFilter,
  filter,
}) => {
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  return (
    <div className="listado-gastos contenedor">
      {filter ? (
        <>
          <h2>
            {stateFilter.length > 0 ? `Gastos filtrados` : "No hay gastos en esta categoría"}
          </h2>
          {stateFilter.map((gasto) => (
            <Bill
              key={gasto.id}
              {...gasto}
              setGastoEdit={setGastoEdit}
              deleteGasto={deleteGasto}
            />
          ))}
        </>
      ) : (
        <>
          {gastos.length > 0 ? "Gastos" : "Agregue gastos"}
          {gastos.map((gasto) => (
            <Bill
              key={gasto.id}
              {...gasto}
              setGastoEdit={setGastoEdit}
              deleteGasto={deleteGasto}
            />
          ))}
        </>
      )}
    </div>
  );
};
