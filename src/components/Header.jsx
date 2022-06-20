import { useEffect } from "react";
import { BudgetControl } from "./BudgetControl";
import { NewBudget } from "./NewBudget";

export const Header = ({
  gastos,
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
}) => {
  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget])
  
  return (
    <header>
      <h1>Planificador de gastos</h1>

      {isValidBudget ? (
        <BudgetControl budget={budget} gastos={gastos}/>
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
