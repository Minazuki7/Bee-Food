import classes from './classes.module.scss';
import classNames from 'classnames';
import { forwardRef } from 'react';

const AbsoluteFill = forwardRef<
  HTMLDivElement,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>(({ className, children, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      {...rest}
      className={classNames(classes.container, className)}
    >
      {children}
    </div>
  );
});

export default AbsoluteFill;
