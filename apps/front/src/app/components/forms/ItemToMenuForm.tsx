import { useEffect, useRef, useState } from "react";
import { useForm } from "@hooks/useForm";
import Input from "@components/inputs/Input";
import { CreateMenuVariables, Menu, useCreateMenu } from "@requests/menu";
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
import { useCreateItem, useItemes } from "@requests/item";

import { useNavigate } from "react-router-dom";
import Card from "@components/cards/cardItem";
import CardItem from "@components/cards/cardItem";
import { map } from "lodash";

export interface ItemFormProps {
  onSubmit: (values: CreateMenuVariables) => void;
  item?: Menu;
  onClose: () => void;
}

interface FormProps {
  name: string;
  id?: string;

  price: number;
  items: string[];
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
  const { data: itemsData } = useItemes();
  const items = itemsData?.findAllItems.data;

  let navigate = useNavigate();

  const [addMenu, responseMenu] = useCreateMenu();

  const branchesOptions = branches
    ? branches?.map((branches) => ({
        name: branches.name,
        value: branches.id,
      }))
    : [];
  const itemsOptions = items
    ? items?.map((items) => ({
        name: items.slug,
        price: items.price,
        value: items.id,
      }))
    : [];
  const AddItemValdationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      items: [],
      price: 0,

      description: "",
      status: true,
      branch: "",
    },

    validationSchema: AddItemValdationSchema,
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   if (validateForm()) {
    //     console.log(values);

    onSubmit: (values: FormProps) => {
      // onSubmit({
      //   name: values.name,
      //   title: values.title,
      //   price: values.price,
      //   foodType: values.foodType,
      //   description: values.description,
      //   status: values.status,
      //   branch: values.branch,
      // });
      addMenu({
        variables: {
          name: values.name,
          items: values.items,
          price: values.price,

          description: values.description,
          status: values.status,
          branch: values.branch,
        },
      });
      navigate("../menus");
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
          items: item.items,
          price: item.price,

          description: item.description,
          status: item.status,
          branch: item.branch.id,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  interface itemInMenuType {
    name: string;
    price: number;
    id: string;
  }
  const [itemInMenuInput, setitemInMenuInput] = useState({
    name: "",
    price: 0,
    id: "",
  });

  const [itemsID, setitemsID] = useState<string[]>([]);
  const [itemPrice, setitemPrice] = useState(0);
  const [itemInMenu, setitemInMenu] = useState<itemInMenuType[]>([]);

  const getItems = (name: string, price: number, id: string) => {
    const itemInput = { ...itemInMenu, name, price, id };
    const itemList = [...itemInMenu, itemInMenuInput];
    setitemPrice((prevCount) => prevCount + itemInput.price);
    setitemInMenuInput(itemInput), setitemInMenu(itemList);
    itemsID.push(itemInput.id);
  };
  const [page, setpage] = useState(false);
  formik.values.items = itemsID;

  return (
    <div>
      {!page && (
        <div>
          <button
            onClick={() => navigate("../menus")}
            className="self-start bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <div className="grid grid-cols-4 gap-1">
            {itemsOptions.map((item) => (
              <CardItem
                id={item.value}
                name={item.name}
                price={item.price}
                onSubmit={(name, price, id) => {
                  getItems(name, price, id);
                }}
              />
            ))}
            <button
              className="bg-blue hover:bg-blue-700 text-white m-6 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setpage(true);
              }}
            >
              next
            </button>
          </div>
        </div>
      )}
      {page && (
        <form
          className="flex flex-col gap-5 item-center m-8 bg-white"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex">
            <button
              onClick={() => setpage(false)}
              className="self-start bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
            <button
              onClick={() => navigate("../menus")}
              className="self-end bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
            >
              Cancel
            </button>
          </div>
          <Input
            value={formik.values.name}
            label="name"
            name="name"
            placeholder="name"
            required
            icon={hiddenPassword}
            onChange={formik.handleChange}
            errorText={formik.errors.name /*&& touched.name*/}
          />

          <Input
            value={formik.values.description}
            label="description"
            name="description"
            placeholder="description"
            required
            icon={hiddenPassword}
            onChange={formik.handleChange}
            errorText={formik.errors.description /*&& touched.name*/}
          />
          <Input
            type="number"
            value={formik.values.price}
            label="price      "
            name="price"
            placeholder="price"
            required
            icon={hiddenPassword}
            onChange={formik.handleChange}
            errorText={formik.errors.price /*&& touched.name*/}
          />
          <a className="font-bold">FULL PRICE {itemPrice}</a>

          <Select
            className="branch"
            label="branch"
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
      )}
    </div>
  );
};

export default ItemForm;
