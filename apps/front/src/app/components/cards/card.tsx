import Button from "@components/button/Button";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import food1 from "../../assets/png/food1.jpg";
import food2 from "../../assets/png/food2.jpg";
import food3 from "../../assets/png/food3.jpg";
import food4 from "../../assets/png/food4.jpg";
import food5 from "../../assets/png/food5.png";
import food6 from "../../assets/png/food6.jpg";
interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title?: string;
  classNameContainer?: string;
  classNameButton?: string;
  name: string;
  status: boolean;
  price: number;
  id: string;
  onClick: () => void;
  onConfirm: (name: string, price: number, id: string) => void;
  refetch?: () => void;
  onDuplicate?: () => void;
  done?: number;
}
const Card: React.FC<CardProps> = ({
  title,
  classNameContainer = "max-w-[344px]",
  classNameButton,
  name,
  id,
  status,
  onClick,
  onDuplicate,
  price,
  done,
  onConfirm,
  ...rest
}) => {
  const navigate = useNavigate();
  const food = [food1, food2, food3, food4, food5, food6];
  const randomElement = food[Math.floor(Math.random() * food.length)];

  const [showModalConfirmationDuplicate, setShowModalConfirmationDuplicate] =
    useState(false);

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
    <div
      className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md bg-opacity-40 "
      onClick={() => {
        onClick();
        onConfirm(name, price, id);
      }}
    >
      <div>
        <div className="absolute top-0 right-0 mt-2 mr-2 p-4 z-20 flex justify-between">
          <div className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8  fill-current text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="relative  w-full  h-full">
          <div className="h-32 w-full flex justify-center  rounded-lg">
            <div className="bg-trueblack relative content-left rounded-full justify-center items-center w-[10rem] h-[10rem] text-white inline-flex">
              <img
                className="bg-trueblack relative content-left rounded-full justify-center items-center w-[10rem] h-[10rem] text-white inline-flex"
                src={randomElement}
              ></img>
              <div className="bg-redtyping absolute bottom-0 right-0 rounded-full justify-center items-center w-[5rem] h-[5rem] text-white inline-flex">
                {price}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
        {name}
      </h2>
      <p className="mt-2 text-gray-800 text-sm"></p>
      {status && (
        <div className="mt-4 px-4 py-2 bg-greenbox text-greentyping text-sm text-center	 font-medium rounded-md w-full">
          Avalaibe
        </div>
      )}

      {!status && (
        <div className="mt-4 px-4 py-2 bg-redbox text-redtyping text-sm  text-center	font-medium rounded-md w-full">
          not Avalaibe
        </div>
      )}
    </div>
    // </div>
  );
};
export default Card;
