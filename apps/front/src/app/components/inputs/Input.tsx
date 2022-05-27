import { ChangeEvent } from 'react';
import InputWrapper from '@components/inputs/InputWrapper';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  placeholder?: string;
  label?: string;
  icon?: any;
  errorText?: string;
  name?: string;
  type?: string;
  borderColor?: string;
  colorText?: string;
  labelClassName?: string;
}

const Input = ({
  placeholder,
  type,
  disabled,
  name,
  label,
  borderColor,
  colorText,
  required,
  icon,
  errorText,
  className,
  labelClassName,
  ...inputProps
}: InputProps) => {
  return (
    <InputWrapper
      labelClassName={labelClassName}
      className={className}
      label={label}
      icon={icon}
      borderColor={borderColor}
      colorText={colorText}
      disabled={disabled}
      required={required}
      errorText={errorText}
    >
      <input
        className="flex-1 self-stretch appearance-none bg-transparent border-none w-full px-3 text-gray-700 focus:outline-none focus:shadow-outline placeholder-inputPlaceHolder"
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        required={required}
        {...inputProps}
      />
    </InputWrapper>
  );
};
export default Input;
