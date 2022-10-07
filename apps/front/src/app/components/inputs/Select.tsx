import { useRef, useState } from "react";
import classNames from "classnames";

import useOnclickOutside from "@hooks/useOnclickOutside";
import InputWrapper from "./InputWrapper";
import Popover from "@components/feedback/Popover";
import SelectItem from "@components/items/SelectItem";
import Chip from "@components/data-display/Chip";

import expandMore from "@assets/svg/expand-more.svg";

export type SelectValue<Multiple extends boolean> = Multiple extends true
  ? string[]
  : string;

export interface SelectOption {
  name: string;
  value: string;
  hidden?: boolean;
}

export type SelectProps<Multiple extends boolean = false> = {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  icon?: string;
  multiple?: Multiple;
  value: SelectValue<Multiple>;
  onChange: (value: SelectValue<Multiple>) => void;
  children?: React.ReactNode;
  arrow?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  showPlaceholder?: boolean;
  label?: string;
};

const Select = <Multiple extends boolean = false>({
  options,
  label,
  className,
  value,
  placeholder,
  onChange,
  icon,
  multiple,
  children,
  arrow = <img alt="" src={expandMore} />,
  open: openProp,
  onClick,
  onClose,
  showPlaceholder = true,
}: SelectProps<Multiple>) => {
  const [openState, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLUListElement>(null);

  const open = openProp !== undefined ? openProp : openState;

  useOnclickOutside(
    () => {
      setOpen(false);
      if (onClose) {
        onClose();
      }
    },
    containerRef,
    popoverRef
  );

  const selectedOptions = Array.isArray(value)
    ? (value.map((v) => options.find((o) => o.value === v)) as SelectOption[])
    : options.find((o) => o.value === value);

  const isSelected = (option: SelectOption) => {
    if (Array.isArray(value)) {
      return value.some((v) => v === option.value);
    }
    return option.value === value;
  };

  const handleChange = (option: SelectOption) => {
    let nextValue: string | string[] = option.value;
    if (Array.isArray(value)) {
      nextValue = isSelected(option)
        ? value.filter((v) => v !== option.value)
        : [...value, option.value];
    }

    onChange(nextValue as SelectValue<Multiple>);
    if (!multiple) setOpen(false);
  };

  const renderValue = () => {
    if (
      !selectedOptions ||
      (Array.isArray(selectedOptions)
        ? selectedOptions.length === 0
        : !selectedOptions.name)
    ) {
      return <span className="text-inputPlaceHolder">{placeholder}</span>;
    }

    if (Array.isArray(selectedOptions)) {
      return selectedOptions.map((o) => (
        <Chip
          key={o.value}
          onDelete={(e) => {
            e.stopPropagation();
            handleChange(o);
          }}
        >
          {o?.name}
        </Chip>
      ));
    }
    if (showPlaceholder) {
      return selectedOptions.name;
    }

    return;
  };

  return (
    <InputWrapper
      className={className}
      icon={icon}
      onClick={() => {
        setOpen((open) => !open);
        if (onClick) onClick();
      }}
      ref={containerRef}
      label={label}
    >
      <div className="self-stretch flex flex-1 items-center mr-4 relative">
        <div className="absolute gap-2 flex items-center inset-0 overflow-auto">
          {renderValue()}
          {children}
        </div>
      </div>
      <div className="flex items-center justify-center w-[40px] h-input border-l-2 border-dropdown-border">
        <div
          className={classNames(
            "transition duration-200 h-[20px] w-[20px]",
            open ? "rotate-0" : "rotate-180"
          )}
        >
          {arrow}
        </div>
      </div>

      <Popover
        ref={popoverRef}
        component="ul"
        parent={containerRef.current}
        open={open}
      >
        {options.map((option, index) => {
          if (option.hidden) return null;
          return (
            <SelectItem
              selected={isSelected(option)}
              lastChild={index === options.length - 1}
              onClick={(e) => {
                e.stopPropagation();
                handleChange(option);
              }}
              key={option.value}
            >
              {option.name}
            </SelectItem>
          );
        })}
      </Popover>
    </InputWrapper>
  );
};

export default Select;
