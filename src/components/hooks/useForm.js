import { useState } from "react";

export const useForm = (initalState) => {
  const [formValues, setFormValues] = useState(initalState);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormValues(initalState);
  };

  return { handleInputChange, handleReset, formValues, setFormValues };
};
