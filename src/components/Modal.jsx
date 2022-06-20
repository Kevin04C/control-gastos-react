import { useState, useEffect } from "react";
import { useForm } from "./hooks/useForm";
import { Message } from "./Message";
import { generateId } from "./helpers";
import CerrarModal from "../img/cerrar.svg";

export const Modal = ({
  setModal,
  animated,
  setAnimated,
  gastos,
  addGastos,
  gastoEdit,
  setGastos,
  setGastoEdit
}) => {
  const initialState = {
    nombre: "",
    cantidad: "",
    categoria: "",
  };
  const { formValues, handleInputChange, handleReset, setFormValues } =
    useForm(initialState);
  const { nombre, cantidad, categoria } = formValues;
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (gastoEdit.id) {
      setFormValues(gastoEdit);
    }
  }, [gastoEdit]);

  const handleCloseModal = () => {
    setGastoEdit({})
    setModal(false);
    setTimeout(() => {
      setAnimated(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !cantidad.trim() || !categoria.trim()) {
      setIsEmpty(true);
      setTimeout(() => {
        setIsEmpty(false);
        handleReset();
      }, 3000);
      return;
    }
    if (gastoEdit.id ) {
      const updateBills = gastos.map(bill => bill.id === gastoEdit.id ? formValues: bill);
      setGastos(updateBills);
      setGastoEdit({})
      handleCloseModal();

      return;
    }
    addGastos({
      ...formValues,
      id: generateId(),
      fecha: Date.now(),
    });
    handleCloseModal();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal" onClick={handleCloseModal}>
        <img src={CerrarModal} alt="Icon cerrar modal" />
      </div>
      <form className={`formulario ${animated ? "animar" : "cerrar"}`}>
        <legend>{formValues.id ? 'Actualizar Gasto' : 'Agregar Gasto'}</legend>
        {isEmpty && (
          <Message type="error">Todos los campos son obligatorios</Message>
        )}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            placeholder="Añade el nombre del gasto"
            id="nombre"
            name="nombre"
            onChange={handleInputChange}
            value={nombre}
            autoComplete="off"
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder="Añade la cantidad para el gasto ej. 300"
            id="cantidad"
            name="cantidad"
            onChange={handleInputChange}
            value={cantidad}
            autoComplete="off"
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Cantidad</label>
          <select
            id="categoria"
            name="categoria"
            onChange={handleInputChange}
            value={categoria}
          >
            <option value="">--Selecione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={formValues.id ? 'Actualizar Gasto' : 'Agregar Gasto'}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};
