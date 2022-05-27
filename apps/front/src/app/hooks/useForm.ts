import { useState, ChangeEvent, useCallback, useMemo } from 'react';

import { isNaN, isArray } from 'lodash';
import { isNumberEmpty, isStringEmpty } from '@utils/validation';

function isInput(element: any): element is HTMLInputElement {
  const htmlInputElements = [
    HTMLInputElement,
    HTMLSelectElement,
    HTMLTextAreaElement,
  ];

  return htmlInputElements.some((input) => element instanceof input);
}

type Touched<Values> = Partial<Record<keyof Values, boolean>>;
type Errors<Values> = Partial<Record<keyof Values, any>>;

function changeObject<T extends object>(obj: T, newObject: Partial<T>): T {
  return { ...obj, ...newObject };
}

export interface FormState<Values extends { [key: string]: any }> {
  values: Values;
  errors: Partial<{ [K in keyof Values]: any }>;
  touched: Partial<{ [K in keyof Values]: boolean }>;
}

export interface FormActions<Values extends { [key: string]: any }> {
  handleChange: <Field extends keyof Values>(
    field: Field
  ) => (e: Values[Field] | ChangeEvent<any>) => void;
  validateForm: () => boolean;
  setFieldValue: <Field extends keyof Values>(
    field: Field,
    value: Values[Field]
  ) => void;
  setFieldTouched: <Field extends keyof Values>(
    field: Field,
    touched: boolean
  ) => void;
  setFieldError: <Field extends keyof Values>(field: Field, error: any) => void;
  setValues: (values: Partial<Values>) => void;
  setErrors: (errors: Partial<{ [K in keyof Values]: any }>) => void;
  setTouched: (touched: Partial<{ [K in keyof Values]: boolean }>) => void;
  setAllTouched: (value: boolean) => void;
}

// Use form assume options are static and always the same every render
export interface FormOptions<Values extends { [key: string]: any }> {
  initialValues: Values;
  validation?: Partial<{
    [K in keyof Values]: (value: Values[K], values: Values) => any;
  }>;
  required?: (keyof Values)[];
}

export function useForm<Values extends { [key: string]: any }>({
  initialValues,
  validation = {},
  required = [],
}: FormOptions<Values>): FormState<Values> & FormActions<Values> {
  const validationFns = useMemo(() => {
    let fns = {} as Partial<{
      [K in keyof Values]: (value: Values[K], values: Values) => any;
    }>;
    if (validation) {
      fns = { ...validation };
    }
    required.forEach((key) => {
      if (!fns[key]) {
        if (isArray(initialValues[key])) {
          (fns as any)[key] = (value: any[]) =>
            value.length ? '' : 'Champ vide';
        } else {
          (fns as any)[key] =
            typeof initialValues[key] === 'string'
              ? isStringEmpty
              : isNumberEmpty;
        }
      }
    });
    return fns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [values, valuesChange] = useState(initialValues);

  const [touched, touchedChange] = useState(
    () =>
      Object.fromEntries(
        Object.entries(initialValues).map(([key]) => [key, false])
      ) as Touched<Values>
  );

  const [errors, errorsChange] = useState(
    () =>
      Object.fromEntries(
        Object.entries(initialValues).map(([key, value]) => {
          const errorFn = validationFns[key];
          let error = undefined;
          if (errorFn) {
            error = errorFn(value, initialValues);
          }
          return [key, error];
        })
      ) as Errors<Values>
  );

  const validateForm = useCallback(() => {
    const valuesFind: (keyof Values)[] = Object.keys(values) as any;
    return !valuesFind.find((key) => errors[key]);
  }, [values, errors]);

  const setTouched = useCallback(
    (nextTouched: Partial<{ [K in keyof Values]: boolean }>) => {
      touchedChange((touched) => changeObject(touched, nextTouched));
    },
    []
  );

  const setAllTouched = useCallback((value: boolean) => {
    touchedChange(
      (prevTouched) =>
        Object.fromEntries(
          Object.entries(prevTouched).map(([key]) => [key, value])
        ) as Touched<Values>
    );
  }, []);

  const setErrors = useCallback(
    (nextErrors: Partial<{ [K in keyof Values]: any }>) => {
      errorsChange((errors) => changeObject(errors, nextErrors));
    },
    []
  );

  const setFieldError = useCallback(
    <Field extends keyof Values>(field: Field, error: any) => {
      errorsChange((errors) => ({ ...errors, [field]: error }));
    },
    []
  );

  const setFieldValue = useCallback(
    <Field extends keyof Values>(field: Field, value: Values[Field]) => {
      valuesChange((values) => {
        const nextValues = { ...values, [field]: value };
        errorsChange((errors) => {
          const validationFn = validationFns[field];
          if (!validationFn) return errors;
          const error = validationFn(value, nextValues);
          return { ...error, [field]: error };
        });
        return nextValues;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const setFieldTouched = useCallback(
    <Field extends keyof Values>(field: Field, value: boolean) => {
      touchedChange((touched) => ({ ...touched, [field]: value }));
    },
    []
  );

  const setValues = useCallback(
    (nextValues: Partial<Values>) => {
      const valuesKeys: (keyof Values)[] = (Object.keys as any)(nextValues);
      const nextErrors: Partial<{ [K in keyof Values]: any }> = {};
      const v: Values = {} as any;

      valuesKeys.forEach((key) => {
        v[key] = (isNaN(nextValues[key]) ? '' : nextValues[key]) as any;
      });

      const nextState = changeObject(values, v);

      valuesKeys.forEach((key) => {
        const validationFn = validationFns[key];
        if (validationFn) {
          nextErrors[key] = validationFn(
            nextValues[key] as Values[keyof Values],
            nextState
          );
        }
      });
      setErrors(nextErrors);
      valuesChange(nextState);
    },
    // eslint-disable-next-line
    [setErrors, values]
  );

  const handleChange = useCallback(
    <Field extends keyof Values>(name: Field) =>
      (e: any) => {
        let value;
        const target = e?.target;
        if (isInput(target)) {
          if (target.type === 'checkbox') {
            value = target.checked;
          } else if (target.type === 'file' && target.files) {
            value = target.files[0];
          } else {
            value = target.value;
          }
        } else {
          value = e;
        }

        setFieldTouched(name, true);
        setFieldValue(name, value);
      },
    [setFieldValue, setFieldTouched]
  );
  return {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateForm,
    setValues,
    setErrors,
    setTouched,
    setAllTouched,
  };
}
