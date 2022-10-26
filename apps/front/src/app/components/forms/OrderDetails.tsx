import { useEffect, useRef, useState } from "react";
import { useForm } from "@hooks/useForm";
import Input from "@components/inputs/Input";
import { UpdateOrderVariables, Order } from "@requests/order";
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
import { ORDER_STATUS } from "@shared/permission";
import { items } from "libs/schemas/src";

export interface OrderFormProps {
  onSubmit: () => void;
  item?: Order;
  onClose: () => void;
}
interface itemType {
  name: string;
  price: number;
}

interface FormProps {
  id?: string;
  branch?: string;
  items?: any[];
  menus?: any[];
  client?: string;
  company?: string;
  driver?: string;
  deliveryFees?: number;
  price?: number;
  totalPrice?: number;
  status?: ORDER_STATUS;
  zone?: string;
}
function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ReactGA.send(["pageview", location.pathname]);
  }, [location]);
}
const OrderForm = ({ onSubmit, item, onClose }: OrderFormProps) => {
  const formikRef = useRef<FormikProps<FormProps> | null>(null);

  const [items, setItems] = useState<any[]>([]);

  const formik = useFormik({
    initialValues: {
      id: "",
      branch: "",
      status: ORDER_STATUS.sent,
      client: "",
      company: "",
      driver: "",
      deliveryFees: 0,
      price: 0,
      totalPrice: 0,
      items: [] as any,
      menus: [] as any,
      zone: "",
    },

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   if (validateForm()) {
    //     console.log(values);
    onSubmit: (values: FormProps) => {
      onSubmit();
    },
  });
  //   } else {
  //     setAllTouched(true);
  //   }
  // };

  const addItems = () => {
    let tab: any = [];
    let tabItems: any = [];

    formik.values.items?.map((item) => {
      if (!tab.includes(item.id)) {
        tab.push(item.id);
        tabItems.push({ name: item.title, price: item.price, occurance: 1 });
      } else {
        tabItems[tab.indexOf(item.id)].occurance += 1;
      }
    });
    formik.values.menus?.map((item) => {
      if (!tab.includes(item.id)) {
        tab.push(item.id);
        tabItems.push({ name: item.name, price: item.price, occurance: 1 });
      } else {
        tabItems[tab.indexOf(item.id)].occurance += 1;
      }
    });

    setItems(tabItems);
  };

  useEffect(() => {
    if (item) {
      if (formik) {
        formik.setValues({
          id: item.id,
          branch: item.branch.name,
          client: item.client.lastName + "   " + item.client.firstName,
          company: item.company?.name,
          driver: item.driver
            ? item.driver?.lastName + "   " + item.driver?.firstName
            : "Driver No assigned Yet",
          deliveryFees: item.deliveryFees,
          price: item.price,
          totalPrice: item.totalPrice,
          status: item.status,
          menus: item.menus,
          items: item.items,
          zone: item.branch.zone.name,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  useEffect(() => {
    if (formik.values) {
      addItems();
    }
  }, [formik.values]);

  return (
    <div>
      <div className="mx-8 grid grid-cols-2 mt-12">
        <table className="m-4 rounded-xl shadow-xl border-1  ">
          <tr className=" h-16 text-[22px] text-black bg-[#CBDEFF] rounded-xl">
            <th className="rounded-tl-xl">Items</th>
            <th className="">QTY</th>
            <th className="">Price</th>
            <th className="rounded-tr-xl">Total Price</th>
          </tr>

          {items.map((item) => (
            <tr className=" text-center m-6">
              <td className="h-[40px]">{item.name}</td>
              <td className="h-[40px]">X{item.occurance}</td>
              <td className="h-[40px]">{item.price}</td>
              <td className="h-[40px] mb-4"> {item.price * item.occurance}</td>
            </tr>
          ))}
        </table>
        <div className="">
          <div className=" text-center max-h-5 m-12 ">
            <span className="font-bold ">
              Driver: <br />
            </span>{" "}
            {formik.values.driver}
          </div>
        </div>
        <div className="m-4 rounded-xl shadow-xl">
          {" "}
          <p className="bg h-16 text-[22px]  bg-[#CBDEFF] font-bold rounded-t-lg text-black ">
            {" "}
            <p className="ml-3 py-4">
              {" "}
              Delivery details : <br />
            </p>
          </p>
          <div className="grid grid-cols-2 ">
            <div className=" left-0 ml-4 mt-3 ">Client name:</div>
            <div className=" ml-auto mr-4 mt-3">{formik.values.client}</div>
            <div className=" left-0 ml-4 mt-3">Company:</div>
            <div className=" ml-auto mr-4 mt-3">{formik.values.company}</div>
            <div className=" left-0 ml-4 mt-3">Branch:</div>
            <div className=" ml-auto mr-4 mt-3">{formik.values.branch}</div>
            <div className=" left-0 ml-4 mt-3 mb-4 ">Zone:</div>
            <div className=" ml-auto mr-4 mt-3 mb-4 ">{formik.values.zone}</div>
          </div>
        </div>
        <div className="m-4 rounded-xl shadow-xl">
          {" "}
          <p className="bg-[#CBDEFF] h-16 text-[22px]  font-bold rounded-t-lg text-black ">
            <p className="ml-4 py-4">
              Order Summary : <br />{" "}
            </p>
          </p>
          <div className="grid grid-cols-2 ">
            <div className=" left-0 ml-4 mt-3">Status:</div>
            <div className=" ml-auto mr-4 mt-3">{formik.values.status}</div>
            <div className=" left-0 ml-4 mt-3">Subtotal:</div>
            <div className=" ml-auto mr-4 mt-3">{formik.values.price} DT</div>
            <div className=" left-0 ml-4 mt-3">Delivery Fee:</div>
            <div className=" ml-auto mr-4 mt-3">
              {formik.values.deliveryFees} DT
            </div>
            <div className=" left-0 font-bold ml-4 mt-3 mb-4 ">Total:</div>
            <div className=" ml-auto mr-4 mt-3 font-bold mb-4 ">
              {formik.values.totalPrice} DT
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.329717768453!2d10.29943186860107!3d36.73228464855805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd49c2c1b117a3%3A0x58be0cb5e7a5d48!2sKFC%20Boumhel!5e0!3m2!1sen!2stn!4v1666623116480!5m2!1sen!2stn"
          width="700"
          height="350"
        ></iframe>
      </div>
    </div>
  );
};

export default OrderForm;
