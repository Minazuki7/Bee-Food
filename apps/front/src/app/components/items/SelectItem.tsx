import classNames from 'classnames';

interface SelectItemProps
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  children?: React.ReactNode;
  selected?: boolean;
  lastChild?: boolean;
}

const SelectItem = ({
  children,
  selected,
  className,
  lastChild,
  ...rest
}: SelectItemProps) => {
  return (
    <li
      className={classNames(
        'width-100 h-dropdown-item flex items-center text-[18px] pl-[25px] cursor-pointer border-dropdown-border',
        ':hover-text-white :hover-bg-orange',
        !lastChild && 'border-b-2',
        selected && 'text-white bg-orange border-white',
        className
      )}
      {...rest}
    >
      {children}
    </li>
  );
};

export default SelectItem;
