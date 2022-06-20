import { useEffect } from "react";
import { useState } from "react";
import { BillsList } from "./components/BillsList";
import { Filter } from "./components/Filter";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import newGuest from "./img/nuevo-gasto.svg";

function App() {
  const initBudget = () => JSON.parse(localStorage.getItem("budget")) || 0;
  const initGastos = () => JSON.parse(localStorage.getItem("gastos")) || [];
  const validBudget = () => JSON.parse(localStorage.getItem("validBudget")) || false;

  const [budget, setBudget] = useState(initBudget);
  const [isValidBudget, setIsValidBudget] = useState(validBudget);
  const [modal, setModal] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [gastos, setGastos] = useState(initGastos);
  const [gastoEdit, setGastoEdit] = useState({});
  const [filter, setFilter] = useState("");
  const [stateFilter, setStateFilter] = useState([]);

  const addGastos = (gasto) => {
    setGastos([...gastos, gasto]);
  };
  const deleteGasto = (id) => {
    const updateBills = gastos.filter(bill => bill.id != id);
    setGastos(updateBills);
  }

  useEffect(() => {
    if(Object.entries(gastoEdit).length > 0) 
      handleOpenModal()
    return 
  }, [gastoEdit]);
  
  useEffect(() => {
    if (filter) {
      const billsFilter = gastos.filter(bill => bill.categoria === filter);
      setStateFilter(billsFilter);
    }
  }, [filter])
  
  

  const handleOpenModal = () => {
    setModal(true);
    setTimeout(() => {
      setAnimated(true);
    }, 300);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        gastos={gastos}
      />
      {isValidBudget && (
        <>
          <main>
            <Filter
              filter={filter}
              setFilter={setFilter}
            />
            <BillsList 
              gastos={gastos}
              gastoEdit={gastoEdit}
              setGastoEdit={setGastoEdit}
              deleteGasto={deleteGasto}
              stateFilter={stateFilter}
              filter={filter}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={newGuest}
              alt="Icon nuevo gasto"
              onClick={handleOpenModal}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animated={animated}
          setAnimated={setAnimated}
          addGastos={addGastos}
          gastos={gastos}
          gastoEdit={gastoEdit}
          setGastos={setGastos}
          setGastoEdit={setGastoEdit} 
        />
      )}
    </div>
  );
}

export default App;
