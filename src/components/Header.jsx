import { useEffect } from "react";
import { BudgetControl } from "./BudgetControl";
import { NewBudget } from "./NewBudget";

export const Header = ({
  gastos,
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
  setGastos
}) => {
  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget])
  
  return (
    <header>
      <h1>Planificador de gastos</h1>

      {isValidBudget ? (
        <BudgetControl 
          budget={budget} 
          gastos={gastos} 
          setIsValidBudget={setIsValidBudget}
          setGastos={setGastos}
          setBudget={setBudget}
        />
      ) : (
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
};
