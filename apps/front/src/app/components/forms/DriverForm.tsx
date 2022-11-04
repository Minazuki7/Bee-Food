import { useEffect, useRef, useState } from "react";
import { useForm } from "@hooks/useForm";
import Input from "@components/inputs/Input";
import { CreateDriverVariables, Driver } from "@requests/driver";
import {
  isStringEmpty,
  validateEmail,
  validatePassword,
} from "@utils/validation";
import hiddenPassword from "@assets/svg/password.svg";
import home from "@assets/svg/homeOrange.svg";
import address from "@assets/svg/addressOrange.svg";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useLocation } from "react-router-dom";
import React from "react";
import ReactGA from "react-ga";
import { useCompanies } from "@requests/company";
import { useZones } from "@requests/zone";
import Select from "@components/inputs/Select";

export interface DriverFormProps {
  onSubmit: (values: CreateDriverVariables) => void;
  item?: Driver;
  onClose: () => void;
}

interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
  zone: string;
  phone: string;
  company: string;
  password: string;
  id?: string;
}
const DriverForm = ({ onSubmit, item, onClose }: DriverFormProps) => {
  const formikRef = useRef<FormikProps<FormProps> | null>(null);
  const { data: compnayData } = useCompanies();
  const { data: zoneData } = useZones();
  const Companies = compnayData?.findAllCompanys.data;
  const zones = zoneData?.findAllZones.data;
  const CompaniesOptions = Companies
    ? Companies?.map((company) => ({
        name: company.name,
        value: company.id,
      }))
    : [];

  const zonesOptions = zones
    ? zones?.map((zone) => ({
        name: zone.name,
        value: zone.id,
      }))
    : [];

  const AddDriverValdationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    zone: Yup.string().required("Required"),
    company: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const UpdateDriverValdationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    zone: Yup.string().required("Required"),
    company: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
  });

  // const validate = (values: FormProps) => {
  //   const errors = {} as FormProps;
  //   if (isStringEmpty(values.firstName))
  //     errors.firstName = "First Name is required";
  //   if (isStringEmpty(values.lastName))
  //     errors.lastName = "lastName is required";
  //   if (isStringEmpty(values.email)) errors.email = "email is required";
  //   if (isStringEmpty(values.zone)) errors.zone = "zone is required";
  //   if (isStringEmpty(values.phone)) errors.phone = "phone is required";
  //   if (isStringEmpty(values.company)) errors.company = "company is required";
  //   if (isStringEmpty(values.password))
  //     errors.password = "password is required";
  //   return errors;
  // };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      zone: "",
      phone: "",
      company: "",
      password: "",
    },

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   if (validateForm()) {
    //      (values);
    validationSchema: item
      ? UpdateDriverValdationSchema
      : AddDriverValdationSchema,
    onSubmit: (values: FormProps) => {
      onSubmit({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        zone: values.zone,
        company: values.company,
        password: values.password,
      });
    },
  });

  //   } else {
  //     setAllTouched(true);
  //   }
  // };
  function usePageViews() {
    let location = useLocation();
    React.useEffect(() => {
      ReactGA.send(["pageview", location.pathname]);
    }, [location]);
  }
  usePageViews();

  useEffect(() => {
    if (item) {
      // TO BE CHANGED REVIEWD//
      if (formik) {
        formik.setValues({
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          phone: item.phone,
          zone: item.zone.id,
          company: item.company.id,
          password: item.password,
          id: item.id,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  // if (item) {
  //   return (
  //     <form
  //       className="flex flex-col gap-5 item-center m-8 bg-white"
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //          ("string sub", e);
  //         formik.handleSubmit(e);
  //       }}
  //     >
  //       <button
  //         onClick={onClose}
  //         className="self-start bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  //       >
  //         Back
  //       </button>

  //       <Input
  //         value={formik.values.firstName}
  //         label="firstName"
  //         name="firstName"
  //         placeholder="firstName"
  //         icon={hiddenPassword}
  //         onChange={formik.handleChange}
  //         errorText={formik.errors.firstName}
  //         required
  //       />

  //       <Input
  //         value={formik.values.lastName}
  //         label="lastName"
  //         name="lastName"
  //         placeholder="lastName"
  //         onChange={formik.handleChange}
  //         errorText={formik.errors.lastName}
  //         required
  //       />
  //       <Input
  //         value={formik.values.email}
  //         label="Email"
  //         placeholder="Email"
  //         name="email"
  //         onChange={formik.handleChange}
  //         errorText={formik.errors.email}
  //         icon={address}
  //         required
  //       />
  //       {/* <Input
  //       value={formik.values.zone}
  //       label="Zone"
  //       placeholder="Zone"
  //       onChange={formik.handleChange}
  //       name="zone"
  //       errorText={formik.errors.zone}
  //       icon={home}
  //       required
  //     /> */}

  //       <Input
  //         value={formik.values.phone}
  //         label="Phone"
  //         placeholder="phone"
  //         onChange={formik.handleChange}
  //         name="phone"
  //         type="string"
  //         errorText={formik.errors.phone}
  //         required
  //       />
  //       {/* <Input
  //       value={formik.values.company}
  //       label="company"
  //       placeholder="company"
  //       onChange={formik.handleChange}
  //       name="company"
  //       errorText={formik.errors.company}
  //       required
  //     /> */}

  //       <button
  //         type="submit"
  //         className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  //       >
  //         update
  //       </button>
  //     </form>
  //   );
  // }

  const [page, setpage] = useState(false);
  const locations = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.8465142788395!2d10.31320295056048!3d36.72624727946101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1952dba5ec458440!2zMzbCsDQzJzM0LjUiTiAxMMKwMTgnNTUuNCJF!5e0!3m2!1sen!2stn!4v1666639583783!5m2!1sen!2stn",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.7960440947436!2d10.296937950560517!3d36.72745927939291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xeb5048d4d0afeaf5!2zMzbCsDQzJzM4LjgiTiAxMMKwMTcnNTYuOSJF!5e0!3m2!1sen!2stn!4v1666639520086!5m2!1sen!2stn",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.6714449067476!2d10.29616595056062!3d36.730451279224646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7a8fa876bf734a0b!2zMzbCsDQzJzQ5LjYiTiAxMMKwMTcnNTQuMSJF!5e0!3m2!1sen!2stn!4v1666639412728!5m2!1sen!2stn",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.4888197139226!2d10.291970950560774!3d36.73483627897833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x92c4479ce032d4d4!2zMzbCsDQ0JzA1LjQiTiAxMMKwMTcnMzkuMCJF!5e0!3m2!1sen!2stn!4v1666637741293!5m2!1sen!2stn",
  ];
  const randomElement = locations[Math.floor(Math.random() * locations.length)];
  return (
    <div>
      {page && item && (
        <div>
          <button
            onClick={() => setpage(false)}
            className="self-start bg-blue hover:bg-indigo-700 text-white font-bold ml-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </button>

          <div className=" flex justify-center mt-10rounded-xl ">
            <iframe
              src={randomElement}
              width="1400"
              height="850"
              loading="lazy"
              className=" rounded-3xl"
            ></iframe>
          </div>
        </div>
      )}
      {!page && (
        <form
          className=" flex flex-col gap-5 item-center m-8 bg-white"
          onSubmit={formik.handleSubmit}
        >
          <button
            onClick={onClose}
            className="self-start bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </button>
          {item && (
            <button
              onClick={() => setpage(true)}
              className="bg-blue self-end text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Check Postion
            </button>
          )}

          <Input
            value={formik.values.firstName}
            label="First Name"
            name="firstName"
            placeholder="First Name"
            onChange={formik.handleChange}
            errorText={formik.errors.firstName}
            required
          />

          <Input
            value={formik.values.lastName}
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            onChange={formik.handleChange}
            errorText={formik.errors.lastName}
            required
          />
          <Input
            value={formik.values.email}
            label="Email"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            errorText={formik.errors.email}
            required
          />

          <Input
            value={formik.values.phone}
            label="Phone"
            placeholder="phone"
            onChange={formik.handleChange}
            name="phone"
            type="string"
            errorText={formik.errors.phone}
            required
          />

          <Select
            className="Company"
            label="Company"
            options={CompaniesOptions}
            value={formik.values.company}
            onChange={(value) =>
              formik.setValues((values) => ({ ...values, company: value }))
            }
          />
          <Select
            label="Zone"
            className="Zone"
            options={zonesOptions}
            value={formik.values.zone}
            onChange={(value) =>
              formik.setValues((values) => ({ ...values, zone: value }))
            }
          />

          {!item && (
            <Input
              type="Password"
              value={formik.values.password}
              label="Password"
              placeholder="Password"
              onChange={formik.handleChange}
              name="password"
              errorText={formik.errors.password}
              required
            />
          )}

          {!item && (
            <button
              type="submit"
              className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          )}
          {item && (
            <button
              type="submit"
              className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          )}
        </form>
      )}
    </div>
  );
};
export default DriverForm;
