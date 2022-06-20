import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { formatedFecha } from "./helpers";
import { dicionary } from "./helpers/icons.js";

export const Bill = ({
  cantidad,
  categoria,
  id,
  nombre,
  fecha,
  setGastoEdit,
  deleteGasto
}) => {
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => setGastoEdit({ cantidad, categoria, id, nombre, fecha })}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => {
    return (
      <TrailingActions>
        <SwipeAction
          destructive={true} 
          onClick={() => deleteGasto(id)}
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    );
  };

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={dicionary[categoria]} alt="Icon categoria" />
            <div className="descripcion-gasto">
              <p className="categoria">Categoria {categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el
                <span> {formatedFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
