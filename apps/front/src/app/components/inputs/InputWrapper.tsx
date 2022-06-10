import React, { forwardRef } from "react";

import classNames from "classnames";
import Bubble from "./components/Bubble";

export interface InputWrapperProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  icon?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  borderColor?: string;
  colorText?: string;
  errorText?: string;
  labelClassName?: string;
}

const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(
  (
    {
      label,
      required,
      icon,
      disabled,
      children,
      className,
      labelClassName,
      borderColor,
      colorText,
      errorText,
      ...rest
    }: InputWrapperProps,
    ref
  ) => {
    const renderBorder = () => {
      let color = "";
      if (borderColor && !errorText) {
        color = borderColor;
      } else if (errorText && !disabled) {
        color = "#f87272";
      } else {
        color = "#131F2A";
      }
      return color;
    };
    return (
      <div
        {...rest}
        ref={ref}
        className={classNames("flex-col items-stretch mb-4", className)}
      >
        {label && (
          <p
            className={classNames(
              "text-inputColor text-text20 mb-2",
              labelClassName
            )}
          >
            {label}
          </p>
        )}
        <div
          className={`flex w-full border-2 min-h-input rounded-md leading-tight flex relative items-center pl-2`}
          style={{
            borderColor: renderBorder(),
            backgroundColor: disabled ? "#DBDBDB" : "transparent",
            color: colorText,
          }}
        >
          {icon && <img className="w-18 h-4" src={icon} alt="icon" />}
          {children}
          {required && (
            <span
              className="text-requiredIndicator z-1 absolute top-1 right-1"
              style={{ color: errorText && !disabled ? "#f87272" : "#B8B8B8" }}
            >
              *
            </span>
          )}
        </div>
      </div>
    );
  }
);
export default InputWrapper;
