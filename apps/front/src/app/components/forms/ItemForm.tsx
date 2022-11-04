import { useEffect, useRef } from "react";
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

import { useNavigate } from "react-router-dom";

export interface ItemFormProps {
  onSubmit: (values: CreateItemVariables) => void;
  item?: Item;
  onClose: () => void;
}

interface FormProps {
  slug: string;
  id?: string;
  stock: number;
  title: string;
  price: number;
  foodType: string;
  description: string;
  status: boolean;
  branch: string;
}
function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ReactGA.send(["pageview", location.pathname]);
  }, [location]);
}
const ItemForm = ({ onSubmit, item, onClose }: ItemFormProps) => {
  const formikRef = useRef<FormikProps<FormProps> | null>(null);
  const { data: branchData } = useBranches();
  const branches = branchData?.findAllBranchs.data;
  let navigate = useNavigate();

  const [addItem, responseItem] = useCreateItem();
  const foodTypeOptions = ["food", "addon"];
  const branchesOptions = branches
    ? branches?.map((branches) => ({
        name: branches.name,
        value: branches.id,
      }))
    : [];
  const AddItemValdationSchema = Yup.object({
    slug: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      slug: "",
      title: "",
      price: 0,
      foodType: "",
      description: "",
      status: true,
      branch: "",
      stock: 0,
    },

    validationSchema: AddItemValdationSchema,
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   if (validateForm()) {
    //      (values);

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
      addItem({
        variables: {
          slug: values.slug,
          title: values.title,
          price: values.price,
          foodType: values.foodType,
          description: values.description,
          status: values.status,
          branch: values.branch,
          stock: values.stock,
        },
      });
      navigate("../items");
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
          slug: item.slug,
          title: item.title,
          price: item.price,
          foodType: item.foodType,
          description: item.description,
          status: item.status,
          branch: item.branch.id,
          stock: item.stock,
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
        onClick={() => navigate("../items")}
        className="self-start bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>

      <Input
        value={formik.values.slug}
        label="Slug"
        name="slug"
        placeholder="Slug"
        required
        onChange={formik.handleChange}
        errorText={formik.errors.slug /*&& touched.name*/}
      />
      <Input
        value={formik.values.title}
        label="Title"
        name="title"
        placeholder="Title"
        required
        onChange={formik.handleChange}
        errorText={formik.errors.title /*&& touched.name*/}
      />

      <Input
        value={formik.values.description}
        label="Description"
        name="description"
        placeholder="Description"
        required
        onChange={formik.handleChange}
        errorText={formik.errors.description /*&& touched.name*/}
      />
      <Input
        type="number"
        value={formik.values.price}
        label="Price"
        name="price"
        placeholder="Price"
        required
        onChange={formik.handleChange}
        errorText={formik.errors.price /*&& touched.name*/}
      />
      <Input
        type="number"
        value={formik.values.stock}
        label="Stock"
        name="stock"
        placeholder="Stock"
        required
        onChange={formik.handleChange}
        errorText={formik.errors.stock /*&& touched.name*/}
      />

      <Select
        className="Branch"
        label="Branch"
        options={branchesOptions}
        value={formik.values.branch}
        onChange={(value) =>
          formik.setValues((values) => ({ ...values, branch: value }))
        }
      />

      <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </form>
  );
};

export default ItemForm;
