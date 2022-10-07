import ModalContainer from "@components/feedback/Modal";

import Checked from "../../assets/png/CHECKED.png";
import Close from "../../assets/svg/closeOrange.svg";
import file from "../../assets/svg/file.svg";
import Question from "../../assets/svg/questionMark.svg";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/png/logo.png";

interface PropsModal {
  open: boolean;
  onClose: () => void;
}
const ModalSuccess = ({ open, onClose }: PropsModal) => {
  const navigate = useNavigate();
  const closing = () => {
    navigate("../");
  };
  return (
    <ModalContainer
      open={open}
      classNameContainer="h-1/3 w-1/3 "
      contentClasses="py-0"
      color={true}
    >
      <div className="flex flex-col items-center px-4 py-6 absolute right-0 t-20 cursor-pointer z-20">
        <img src={Close} alt="Close" width={20} height={20} onClick={closing} />
        <span className="text-white">Close</span>
      </div>
      <div className="h-full w-full relative flex flex-col items-center">
        <div className="h-1/2 ">
          <img src={Checked} alt="alt" className="h-full" />
        </div>
        <p className="text-center text-text48 text-white">
          Action Done With <span className="text-[#fecc7a]">Success</span>
        </p>
      </div>
    </ModalContainer>
  );
};

export default ModalSuccess;
