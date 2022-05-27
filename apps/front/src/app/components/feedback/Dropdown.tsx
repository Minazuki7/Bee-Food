import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import classNames from 'classnames';

export interface DropDownProps {
  children?: React.ReactNode;
  items: React.ReactNode;
  open: boolean;
  classes?: {
    container?: string;
    items?: string;
  };
}

const DropDown = ({ children, classes = {}, open, items }: DropDownProps) => {
  const [height, setHeight] = useState(0);
  const itemsWrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && itemsRef.current) {
      setHeight(itemsRef.current.getBoundingClientRect().height);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className={classNames('flex flex-col', classes.container)}>
      {children}
      <Transition nodeRef={itemsWrapperRef} in={!!height} timeout={250}>
        {() => (
          <div
            ref={itemsWrapperRef}
            className={'w-full overflow-hidden transition-all'}
            style={{ maxHeight: height }}
          >
            <div className={classes.items} ref={itemsRef}>
              {items}
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default DropDown;
