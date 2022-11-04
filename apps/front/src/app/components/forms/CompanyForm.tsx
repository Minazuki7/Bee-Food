import { useEffect, useRef } from "react";
import { useForm } from "@hooks/useForm";
import Input from "@components/inputs/Input";
import { CreateCompanyVariables, Company } from "@requests/company";
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

export interface CompanyFormProps {
  onSubmit: (values: CreateCompanyVariables) => void;
  item?: Company;
  onClose: () => void;
}

interface FormProps {
  name: string;
  email: string;
  description: string;
  deliveryFee: number;
  id?: string;
}
function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ReactGA.send(["pageview", location.pathname]);
  }, [location]);
}
const CompanyForm = ({ onSubmit, item, onClose }: CompanyFormProps) => {
  const formikRef = useRef<FormikProps<FormProps> | null>(null);

  const AddCompanyValdationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
      deliveryFee: 0,
    },

    validationSchema: AddCompanyValdationSchema,

    onSubmit: (values: FormProps) => {
      onSubmit({
        name: values.name,
        description: values.description,
        email: values.email,
        deliveryFee: values.deliveryFee,
      });
    },
  });

  useEffect(() => {
    if (item) {
      if (formik) {
        formik.setValues({
          name: item.name,
          description: item.description,
          email: item.email,
          deliveryFee: item.deliveryFee,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  item;
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
      <Input
        value={formik.values.description}
        label="Description"
        name="description"
        placeholder="Description"
        onChange={formik.handleChange}
        required
        errorText={formik.errors.description /*&& touched.description*/}
      />
      <Input
        value={formik.values.email}
        label="Email"
        placeholder="Email"
        name="email"
        onChange={formik.handleChange}
        errorText={formik.errors.email}
        icon={address}
        required
      />
      <Input
        type="number"
        value={formik.values.deliveryFee}
        label="Delivery Fee in DT"
        name="deliveryFee"
        placeholder="Delivery Fee in DT"
        required
        onChange={formik.handleChange}
        errorText={formik.errors.deliveryFee /*&& touched.name*/}
      />
      <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </form>
  );
};

export default CompanyForm;
