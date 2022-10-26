import { useEffect, useRef, useState } from "react";
import { useForm } from "@hooks/useForm";
import Input from "@components/inputs/Input";
import { CreateZoneVariables, Zone } from "@requests/zone";
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
import { useCities } from "@requests/city";

export interface ZoneFormProps {
  onSubmit: (values: CreateZoneVariables) => void;
  item?: Zone;
  onClose: () => void;
}

interface FormProps {
  name: string;
  city: string;
  id?: string;
  raduis: number;
}

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ReactGA.send(["pageview", location.pathname]);
  }, [location]);
}

const ZoneForm = ({ onSubmit, item, onClose }: ZoneFormProps) => {
  const formikRef = useRef<FormikProps<FormProps> | null>(null);
  const { data } = useCities();

  const cities = data?.findAllCitys.data;
  const citiessOptions = cities
    ? cities?.map((city) => ({
        name: city.name,
        value: city.id,
      }))
    : [];

  const AddZoneValdationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      city: "",
      raduis: 0,
    },

    validationSchema: AddZoneValdationSchema,
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   if (validateForm()) {
    //     console.log(values);
    onSubmit: (values: FormProps) => {
      onSubmit({
        name: values.name,
        city: values.city,
        raduis: values.raduis,
      });
    },
  });
  //   } else {
  //     setAllTouched(true);
  //   }
  // };

  useEffect(() => {
    if (item) {
      if (formik) {
        formik.setValues({
          name: item.name,
          city: item.city.id,
          raduis: item.raduis,
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
        name="Name"
        placeholder="Name"
        required
        onChange={formik.handleChange}
        errorText={formik.errors.name /*&& touched.name*/}
      />
      <Input
        type="number"
        value={formik.values.raduis}
        label="Raduis"
        name="Raduis"
        placeholder="Raduis In KM"
        required
        onChange={formik.handleChange}
        errorText={formik.errors.raduis /*&& touched.name*/}
      />

      {/* <Input
        value={formik.values.city}
        label="city"
        name="city"
        placeholder="city"
        required
        
        onChange={formik.handleChange}
        errorText={formik.errors.city 
      /> */}
      <Select
        className="city"
        options={citiessOptions}
        value={formik.values.city}
        onChange={(value) =>
          formik.setValues((values) => ({ ...values, city: value }))
        }
      />

      <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </form>
  );
};

export default ZoneForm;
