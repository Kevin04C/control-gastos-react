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
            {stateFilter.length > 0
              ? `Gastos filtrados`
              : "No hay gastos en esta categoría"}
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
          <h2>
            {gastos.length > 0
              ? `Todos los gastos agregados`
              : "No hay gastos, agregue uno"}
          </h2>
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
