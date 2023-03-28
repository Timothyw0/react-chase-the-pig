import { useState } from 'react';
import validate from 'validate.js';

export const useForm = (initialState: any = {}, constraints: any = {}) => {
  const response = validate(initialState, constraints, { fullMessages: false });
  const [values, setValues] = useState<any>(initialState);
  const [errors, setErrors] = useState<any>(response || {});
  const [isValid, setIsValid] = useState<Boolean>(validate.isEmpty(response));
  const [touched, setTouched] = useState<Object>({});

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    const newValidation = validate(newValues, constraints, {
      fullMessages: false,
    });

    setValues(newValues);
    setErrors(newValidation);
    setIsValid(validate.isEmpty(newValidation));
    setTouched({ ...touched, [event.target.name]: true });
  };

  const validateForm = () => {
    const newValidation = validate(values, constraints, {
      fullMessages: false,
    });

    setErrors(newValidation);
    setIsValid(validate.isEmpty(newValidation));
  };

  return { values, errors, isValid, touched, changeHandler, validateForm };
};
