import { useEffect, useRef, useState } from "react";
import { useForm } from "@hooks/useForm";
import Input from "@components/inputs/Input";
import { CreateCityVariables, City } from "@requests/city";
import {
  isStringEmpty,
  validateEmail,
  validatePassword,
} from "@utils/validation";
import hiddenPassword from "@assets/svg/password.svg";
import home from "@assets/svg/homeOrange.svg";
import address from "@assets/svg/addressOrange.svg";
import { FormikProps, Formik, Form, useFormik } from "formik";
import { useLocation } from "react-router-dom";
import React from "react";
import ReactGA from "react-ga";
import * as Yup from "yup";
import Select from "@components/inputs/Select";
import { useCountries } from "@requests/country";

export interface CityFormProps {
  onSubmit: (values: CreateCityVariables) => void;
  item?: City;
  onClose: () => void;
}

interface FormProps {
  name: string;
  country: string;
  id?: string;
}

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ReactGA.send(["pageview", location.pathname]);
  }, [location]);
}

const CityForm = ({ onSubmit, item, onClose }: CityFormProps) => {
  const formikRef = useRef<FormikProps<FormProps> | null>(null);
  const { data } = useCountries();

  const countries = data?.findAllCountrys.data;
  const countriesOptions = countries
    ? countries?.map((country) => ({
        name: country.name,
        value: country.id,
      }))
    : [];

  const AddCityValdationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
    },

    validationSchema: AddCityValdationSchema,

    onSubmit: (values: FormProps) => {
      onSubmit({
        name: values.name,
        country: values.country,
      });
    },
  });

  useEffect(() => {
    if (item) {
      if (formik) {
        formik.setValues({
          name: item.name,
          country: item.country.id,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <form
      className="flex flex-col gap-5 item-center m-8 bg-white"
      onSubmit={formik.handleSubmit}
    >
      <button
        onClick={onClose}
        className="self-start bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>

      <Input
        value={formik.values.name}
        label="Name"
        name="name"
        placeholder="Name"
        required
        onChange={formik.handleChange}
        errorText={formik.errors.name /*&& touched.name*/}
      />

      {/* <Input
        value={formik.values.country}
        label="country"
        name="country"
        placeholder="country"
        required
        icon={hiddenPassword}
        onChange={formik.handleChange}
        errorText={formik.errors.country 
      /> */}
      <Select
        className="country"
        label="Country"
        options={countriesOptions}
        value={formik.values.country}
        onChange={(value) =>
          formik.setValues((values) => ({ ...values, country: value }))
        }
      />

      <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </form>
  );
};

export default CityForm;
