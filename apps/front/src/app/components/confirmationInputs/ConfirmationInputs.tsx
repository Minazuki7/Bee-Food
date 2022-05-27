import classNames from '@utils/classNames';
import React, { useState, useRef } from 'react';
import './confirmation.css';
interface Props {
  length: number;
  errorInput: string;
  value: string;
  setValue: (s: string) => void;
}

const Confirmation = ({ length, errorInput, value, setValue }: Props) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const CODE_LENGTH = new Array(length).fill(0);
  const values = value.split('');
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = e.target.value;
    if (valueInput.length >= CODE_LENGTH.length) {
      console.log('s');
    } else {
      const res = (value + valueInput).slice(0, CODE_LENGTH.length);
      setValue(res);
    }
  };
  const handleKeyUp = (e: any) => {
    if (e.key === 'Backspace') {
      setValue(value.slice(0, value.length - 1));
    }
  };
  const selectedIndex =
    values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;
  const hideInput = !(values.length < CODE_LENGTH.length);
  return (
    <div className="relative h-input">
      <div className="wrap" onClick={handleClick}>
        {CODE_LENGTH.map((v, index) => {
          const selected = values.length === index;
          const filled =
            values.length === CODE_LENGTH.length &&
            index === CODE_LENGTH.length - 1;
          return (
            <div
              className="display"
              key={`a-${index * 2}`}
              style={{
                borderBottom: errorInput && ' 1px solid #F87272',
              }}
            >
              {values[index]}
              {(selected || filled) && focused && <div className="shadows" />}
            </div>
          );
        })}
        <input
          value=""
          onChange={handleChange}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          className="input"
          style={{
            width: '102px',
            top: '0px',
            bottom: '0px',
            left: `${selectedIndex * 98}px`,
            opacity: hideInput ? 0 : 1,
            color: '#FFF',
          }}
        />
      </div>
    </div>
  );
};

export default Confirmation;
