import ModalContainer from "@components/feedback/Modal";

import Checked from "../../assets/png/CHECKED.png";
import Close from "../../assets/svg/closeOrange.svg";
import file from "../../assets/svg/file.svg";
import Question from "../../assets/svg/questionMark.svg";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/png/logo.png";
import { useState } from "react";

interface PropsModal {
  open: boolean;
  onClose: () => void;

  onSubmit: (value: number) => void;
}
const ConfirmationModal = ({ open, onClose, onSubmit }: PropsModal) => {
  const [input, setValue] = useState(1);
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

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
      <div className="h-full w-full relative flex flex-col items-center mt-20">
        <p className="text-center text-text48 text-white">
          Number of item(s){" "}
          <input
            type="number"
            className="text-black rounded-lg w-16 text-center"
            onChange={handleChange}
            value={input}
          />
        </p>
        <textarea
          placeholder="Addtional Request "
          className="w-11/12 h-1/4 mt-4 rounded-lg p-2"
        />

        <button
          className="bg-white rounded-lg h-12 w-24 my-8 "
          onClick={() => {
            onSubmit(input);
            setValue(1);
          }}
        >
          Confirm
        </button>
      </div>
    </ModalContainer>
  );
};

export default ConfirmationModal;
