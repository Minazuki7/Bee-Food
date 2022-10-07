import AbsoluteFill from "@components/ui/AbsoluteFill";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  classNameContainer?: string;
  contentClasses?: string;
  color?: boolean;
  client?: boolean;
}

const Modal = ({
  open,
  color,
  children,
  classNameContainer,
  contentClasses,
  client,
}: ModalProps) => {
  const divRef = useRef(null);

  useEffect(() => {
    if (!open) document.body.setAttribute("style", "overflow:auto;");
    else document.body.setAttribute("style", "overflow:hidden;");
  }, [open]);

  return createPortal(
    <Transition
      nodeRef={divRef}
      mountOnEnter
      unmountOnExit
      in={open}
      timeout={300}
    >
      {(state) => (
        <AbsoluteFill
          ref={divRef}
          className="fixed z-40 inset-0 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            className={classNames(
              "bg-black transition-opacity",
              state === "entered" ? "opacity-75" : "opacity-0"
            )}
            aria-hidden="true"
          />
          <div
            className={classNames(
              "flex items-center justify-center py-10",
              contentClasses
            )}
          >
            {!color && (
              <div
                className={classNames(
                  "flex flex-col min-w-1/2 bg-white rounded-lg shadow-xl transform transition-all overflow-hidden",
                  state === "entered"
                    ? "translate-y-0 opacity-1"
                    : "translate-y-4 opacity-0",
                  classNameContainer
                )}
              >
                {children}
              </div>
            )}
            {!client && color && (
              <div
                className={classNames(
                  "flex flex-col min-w-1/2 bg-blue rounded-lg shadow-xl transform transition-all overflow-hidden",
                  state === "entered"
                    ? "translate-y-0 opacity-1"
                    : "translate-y-4 opacity-0",
                  classNameContainer
                )}
              >
                {children}
              </div>
            )}
            {client && color && (
              <div
                className={classNames(
                  "flex flex-col min-w-1/2 bg-[#623b1e] rounded-lg shadow-xl transform transition-all overflow-hidden",
                  state === "entered"
                    ? "translate-y-0 opacity-90"
                    : "translate-y-4 opacity-0",
                  classNameContainer
                )}
              >
                {children}
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}
    </Transition>,
    document.getElementById("modals") as HTMLDivElement
  );
};

export default Modal;
