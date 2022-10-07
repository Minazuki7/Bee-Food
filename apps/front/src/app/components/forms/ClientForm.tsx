import { useEffect, useRef, useState } from "react";
import { useForm } from "@hooks/useForm";
import Input from "@components/inputs/Input";
import { CreateItemVariables, Item } from "@requests/item";
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
import { useBranches } from "@requests/branch";
import { useCreateItem } from "@requests/item";
import { FOOD_TYPE } from "@fd-wereact/nest-common";
import { useNavigate } from "react-router-dom";
import {
  Client,
  CreateClientVariables,
  useClient,
  useCreateClient,
  useUpdateClient,
} from "@requests/client";
import useUser from "@hooks/useUser";
import { useLazyUser } from "@requests/user";
import ModalSuccess from "@components/modals/ModalSucess";
import ModalSuccessCreate from "@components/modals/SuccessfulAccount";

export interface ClientFormProps {
  onSubmit: (values: CreateClientVariables) => void;
  item?: Client;
  onClose: () => void;
}

interface FormProps {
  firstName: string;
  lastName: string;
  email: string;

  phone: string;

  password: string;
  id?: string;
}
function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ReactGA.send(["pageview", location.pathname]);
  }, [location]);
}
const ClientForm = ({ onSubmit, item, onClose }: ClientFormProps) => {
  const formikRef = useRef<FormikProps<FormProps> | null>(null);
  const currentUser = useUser();
  const userId = currentUser?.id;
  let userID = "";
  let clinetID = " ";
  if (userId) {
    userID = userId;
  }

  const currentClient = userId
    ? useClient({ variables: { id: userID } })
    : ("" as any);
  const clientId = currentClient.data?.findClientByUserID.id;
  if (clientId) {
    clinetID = clientId;
  }

  const user = useLazyUser({ variables: { id: userID } });
  let navigate = useNavigate();
  let [addClient, responseAddClient]: any = [];
  if (userID === "") {
    [addClient, responseAddClient] = useCreateClient();
  }
  if (userID !== "") {
    [addClient, responseAddClient] = useUpdateClient({
      variables: { id: clinetID },
    });
  }
  const [openModal, setModal] = useState(false);

  const AddItemValdationSchema = Yup.object({
    slug: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",

      phone: "",

      password: "",
    },

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   if (validateForm()) {
    //     console.log(values);

    onSubmit: (values: FormProps) => {
      // onSubmit({
      //   slug: values.slug,
      //   title: values.title,
      //   price: values.price,
      //   foodType: values.foodType,
      //   description: values.description,
      //   status: values.status,
      //   branch: values.branch,
      // });
      addClient({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,

          password: values.password,
        },
      });
      setModal(true);
    },
  });
  //   } else {
  //     setAllTouched(true);
  //   }
  // };

  useEffect(() => {
    if (user.data && userID != "" && currentClient) {
      if (formik) {
        formik.setValues({
          firstName: user.data?.findUser.firstName,
          lastName: user.data?.findUser.lastName,
          email: user.data?.findUser.email,
          phone: user.data?.findUser.phone,

          password: user.data?.findUser.password,
          id: clinetID,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, user.data, currentClient]);

  return (
    <div>
      <form
        className="flex flex-col gap-5 item-center m-8 bg-white"
        onSubmit={formik.handleSubmit}
      >
        <button
          onClick={() => navigate("../")}
          className="self-start bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back
        </button>

        <Input
          value={formik.values.firstName}
          label="firstName"
          name="firstName"
          placeholder="firstName"
          required
          icon={hiddenPassword}
          onChange={formik.handleChange}
          errorText={formik.errors.firstName /*&& touched.name*/}
        />
        <Input
          value={formik.values.lastName}
          label="lastName"
          name="lastName"
          placeholder="lastName"
          required
          icon={hiddenPassword}
          onChange={formik.handleChange}
          errorText={formik.errors.lastName /*&& touched.name*/}
        />

        <Input
          value={formik.values.email}
          label="email"
          name="email"
          placeholder="email"
          required
          icon={hiddenPassword}
          onChange={formik.handleChange}
          errorText={formik.errors.email /*&& touched.name*/}
        />
        <Input
          value={formik.values.phone}
          label="phone"
          name="phone"
          placeholder="phone"
          required
          icon={hiddenPassword}
          onChange={formik.handleChange}
          errorText={formik.errors.phone /*&& touched.name*/}
        />
        {userID === "" && (
          <Input
            type="password"
            value={formik.values.password}
            label="password"
            placeholder="password"
            onChange={formik.handleChange}
            name="password"
            errorText={formik.errors.password}
            required
          />
        )}
        {userID != "" && (
          <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        )}
        {userID === "" && (
          <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            CreateAccount
          </button>
        )}
      </form>
      {userID != "" && (
        <ModalSuccess open={openModal} onClose={() => undefined} />
      )}
      {userID === "" && (
        <ModalSuccessCreate open={openModal} onClose={() => undefined} />
      )}
    </div>
  );
};

export default ClientForm;
