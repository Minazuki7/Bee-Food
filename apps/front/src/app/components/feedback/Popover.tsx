import { createElement, forwardRef, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import classNames from 'classnames';

interface PopoverProps {
  parent: HTMLElement | null;
  children?: React.ReactNode;
  open: boolean;
  component?: string;
}

const Popover = forwardRef<HTMLElement, PopoverProps>(
  ({ parent, children, open, component = 'div' }, ref) => {
    const divRef = useRef<HTMLElement | null>(null);
    const { top, left, width, height } = parent?.getBoundingClientRect() || {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };

    return (
      <Transition
        timeout={300}
        unmountOnExit
        mountOnEnter
        nodeRef={divRef}
        in={open}
      >
        {(state) =>
          createPortal(
            createElement(component, {
              className: classNames(
                'z-50 absolute top-select bg-white rounded border-2 border-dropdown-border max-h-[270px] overflow-auto',
                'transition duration-200 -translate-y-input opacity-0',
                state === 'entered' && '!translate-y-0 !opacity-100'
              ),
              style: {
                top: top + height + 5,
                left,
                width,
              },
              ref: (element: HTMLElement) => {
                divRef.current = element;
                if (typeof ref === 'function') ref(element);
                else if (ref) ref.current = element;
              },
              children,
            }),
            document.getElementById('popovers') as HTMLDivElement
          )
        }
      </Transition>
    );
  }
);

export default Popover;
