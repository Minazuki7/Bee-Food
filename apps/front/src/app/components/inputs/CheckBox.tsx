import React, { ChangeEvent, useRef } from 'react';
import classNames from '@utils/classNames';
import check from '../../assets/svg/check.svg';
import checkDisabled from '../../assets/svg/checkDisable.svg';
import checkWhite from '../../assets/svg/checkWhite.svg';

interface checkBoxProps {
  label?: string;
  fill?: boolean;
  disable?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  extraLabelStyle?: string;
  textColor?: string;
  borderColor?: string;
}

const CheckBox = ({
  label,
  fill,
  disable,
  extraLabelStyle,
  textColor,
  borderColor,
  onChange,
  checked,
}: checkBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex items-center cursor-pointer select-none"
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <div
        className={classNames(
          'border-2 border-baseBlue w-checkBox h-checkBox flex justify-center items-center rounded-checkBox',
          fill ? 'bg-baseBlue' : '',
          borderColor
        )}
      >
        {checked && !disable && (
          <img src={fill ? checkWhite : check} alt="check" />
        )}
        {checked && disable && <img src={checkDisabled} alt="check" />}
      </div>
      <span
        style={{ color: textColor }}
        className={classNames(
          'text-baseBlue text-text18 ml-2',
          extraLabelStyle
        )}
      >
        {label}
      </span>
      <input
        type="checkbox"
        ref={inputRef}
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default CheckBox;
