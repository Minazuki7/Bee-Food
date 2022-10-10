import classNames from "classnames";
import React from "react";

import close from "@assets/svg/close.svg";

interface ChipProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onDelete?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Chip = ({ children, className, onDelete, ...rest }: ChipProps) => {
  return (
    <div
      className={classNames(
        "h-chip bg-orange text-sm text-white flex items-center pl-2 rounded overflow-hidden whitespace-nowrap",
        onDelete ? "cursor-pointer" : "pr-2",
        className
      )}
      {...rest}
    >
      {children}
      {onDelete && (
        <div
          onClick={onDelete}
          className="ml-2 px-2 border-l h-full flex items-center justify-center border-white"
        >
          <img alt="" height={14} width={14} src={close} />
        </div>
      )}
    </div>
  );
};

export default Chip;
