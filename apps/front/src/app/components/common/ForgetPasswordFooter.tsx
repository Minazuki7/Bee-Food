import React from "react";
import question from "@assets/svg/questionMark.svg";
import file from "@assets/svg/file.svg";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import ImageTextRow from "./ImageTextRow";
interface Props {
  className?: string;
  textClassName?: string;
}

const ForgetPasswordFooter = ({ className, textClassName }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <p className={classNames("text-white text-text18", textClassName)}>
          Vous avez déjà un compte ?{" "}
          <span
            onClick={() => navigate("/")}
            className="underline cursor-pointer font-bold"
          >
            Se connecter
          </span>
        </p>
      </div>
      <div className="flex mt-12 justify-between w-full">
        <ImageTextRow
          text="Conditions Générales et d'utilisation"
          image={file}
          width={16}
          height={20}
          className={className}
          textClassName={textClassName}
        />
        <ImageTextRow
          text="Besoin d'aide ?"
          image={question}
          width={24}
          height={24}
          className={className}
          textClassName={textClassName}
        />
      </div>
    </div>
  );
};

export default ForgetPasswordFooter;
