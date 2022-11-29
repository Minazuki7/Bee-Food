import ModalContainer from "@components/feedback/Modal";

import Checked from "@assets/png/CHECKED.png";
import Close from "@assets/svg/closeOrange.svg";
import file from "@assets/svg/file.svg";
import Question from "@assets/svg/questionMark.svg";
import { useNavigate } from "react-router-dom";
import LOGO from "@assets/png/logo.png";
import { useEffect, useState } from "react";
import { useForm } from "@hooks/useForm";
import { useFormik } from "formik";

interface PropsModal {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  //   values: { v1: number; v2: number; v3: number; v4: number; v5: number };
  //   rest: () => void;
}
interface food {
  name: string;
  score: number;
}
const FoodResult = ({
  open,
  onClose,
  onSubmit,
}: //values,
//rest,
PropsModal) => {
  return (
    <ModalContainer
      open={open}
      classNameContainer=" w-1/3 "
      contentClasses="py-0"
      color={true}
      client={true}
    >
      <div className="flex flex-col items-center px-4 py-6 absolute right-0 t-20 cursor-pointer z-20">
        <img src={Close} alt="Close" width={20} height={20} onClick={onClose} />
      </div>
      <div className="h-full w-full relative flex flex-col items-center ">
        <div className="text-[#623b1e] text-4xl font-bold m-8">
          Food For You :<br />
          <span className="text-2xl"> Pizza,Pasta,Lasagna</span>
        </div>
        <div>
          <button
            className="bg-[#623b1e] text-white font-bold rounded-lg h-16 w-28 my-8 opacity-100 "
            onClick={() => {
              onClose();
              //rest();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default FoodResult;
