import { useEffect, useRef, useState } from "react";
import { useForm } from "@hooks/useForm";
import Input from "@components/inputs/Input";
import {
  CreateCountryVariables,
  Country,
  useCreateCountry,
} from "@requests/country";
import {
  isStringEmpty,
  validateEmail,
  validatePassword,
} from "@utils/validation";
import hiddenPassword from "@assets/svg/password.svg";
import home from "@assets/svg/homeOrange.svg";
import address from "@assets/svg/addressOrange.svg";
import { FormikProps, Formik, Form, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import ReactGA from "react-ga";
import * as Yup from "yup";
import AutoComplete from "@components/inputs/AutoComplete";
import Countries from "@fd-wereact/nest-common/lib/enums/countries";

import { Map } from "@components/map";
import Select from "react-select";

export interface CountryFormProps {
  onSubmit: (values: CreateCountryVariables) => void;
  item?: Country;
  onClose: () => void;
}

interface FormProps {
  name: string;
  id?: string;
  long: number;
  lat: number;
}
function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ReactGA.send(["pageview", location.pathname]);
  }, [location]);
}
const CountryForm = ({ onSubmit, item, onClose }: CountryFormProps) => {
  const formikRef = useRef<FormikProps<FormProps> | null>(null);
  const countiesOptions = Countries.countries.map((i) => ({
    value: {
      name: i.country,
      value: i.country,
      latitude: i.latitude,
      longitude: i.longitude,
    },
    label: i.country,
  }));
  const [addCountry, responseCountry] = useCreateCountry();
  let navigate = useNavigate();
  const AddCountryValdationSchema = Yup.object({});
  const formik = useFormik({
    initialValues: {
      name: "",
      long: 0,
      lat: 0,
    },

    validationSchema: AddCountryValdationSchema,
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   if (validateForm()) {
    //     console.log(values);

    onSubmit: (values: FormProps) => {
      if (CountryName != "") {
        addCountry({
          variables: {
            name: values.name,
          },
        });

        navigate("../Countries ");
        location.reload();
      }
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
          long: item.long,
          lat: item.lat,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  const [long, setCountrylong] = useState<any>(0);
  const [lat, setCountrylat] = useState<any>(0);
  const [CountryName, setCountryName] = useState<any>("");
  formik.values.name = CountryName;

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
      {/* <Input
        value={formik.values.name}
        label="name"
        name="name"
        placeholder="name"
        required
        icon={hiddenPassword}
        onChange={formik.handleChange}
        errorText={formik.errors.name /*&& touched.name*/}
      <div className="h-[50%]">
        <Map selected={[long, lat]} />
      </div>

      <Select
        className="Country"
        options={countiesOptions}
        onChange={(value) => {
          setCountryName(value?.value.name);
          setCountrylat(value?.value.latitude);
          setCountrylong(value?.value.longitude);
        }}
      />
      <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </form>
  );
};

export default CountryForm;
