import React, { ReactElement } from "react";
import classNames from "@utils/classNames";

interface ButtonProps {
  type: "primary" | "secondary" | "outline";
  label?: string;
  children?: React.ReactNode;
  container?: "small" | "base" | "full";
  sizeBtn?: "small" | "medium" | "large";
  className?: string;
  buttonType?: "button" | "submit" | "reset";
}

const Button = ({
  label,
  type,
  children,
  container,
  sizeBtn,
  disabled,
  className,
  buttonType,
  ...props
}: ButtonProps & React.HTMLProps<HTMLButtonElement>) => {
  const stylePrimary =
    "bg-blue text-white hover:bg-baseBlue hover:text-white focus:border-borderOrange h-smallBtn rounded-checkBox font-bold ";
  const stylesSecondary =
    "bg-baseBlue text-white hover:bg-baseOrange hover:text-white focus:border-borderBleu h-smallBtn rounded-checkBox font-bold ";
  const disable =
    "bg-baseGray text-white h-smallBtn rounded-checkBox font-bold ";
  const primaryOutline =
    "bg-transparent border border-white font-bold rounded-checkBox h-smallBtn text-white hover:bg-white hover:text-baseBlue focus:border-baseOrange";

  const renderContainer = () => {
    let res = "";
    switch (container) {
      case "small":
        return (res = "w-maxContent px-2 py-1");
      case "base":
        return (res = "w-maxContent px-20 py-1");
      case "full":
        return (res = "w-full px-2 py-1");
    }
    return res;
  };
  const renderHeight = () => {
    let height = "h-medBtn";
    switch (sizeBtn) {
      case "small":
        return (height = "h-smallBtn");
      case "medium":
        return (height = "h-medBtn");
      case "large":
        return (height = "h-baseBtn");
    }

    return height;
  };
  const renderStyle = () => {
    switch (type) {
      case "outline":
        return primaryOutline;
      case "primary":
        return stylePrimary;
      case "secondary":
        return stylesSecondary;
    }
  };
  return (
    <button
      type={buttonType}
      className={classNames(
        disabled ? disable : renderStyle(),
        renderContainer(),
        renderHeight(),
        className
      )}
      {...props}
    >
      {label && <span>{label}</span>}
      {children}
    </button>
  );
};

export default Button;
