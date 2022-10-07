import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface CardProps {
  name: string;
  price: number;
  id: string;
  onSubmit: (name: string, price: number, id: string) => void;
}

const CardItem: React.FC<CardProps> = ({ name, price, id, onSubmit }) => {
  const navigate = useNavigate();

  const [counter, setCounter] = useState(0);
  const decrement = () => {
    setCounter(counter - 1);
  };
  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="mt-4 grid w-full grid-cols-1  bg-white gap-6 sm:grid-cols-2 h-full lg:grid-cols-3 xl:grid-cols-4 shadow-2xl opacity-90  ">
      <div className=" p-6 items-center justify-center flex-col  ml-28">
        <div className="mt-2 text-center text-lg font-semibold text-gray-800 ">
          {name}
        </div>

        <p className="mt-2 text-center text-gray-800">{price}</p>
        <div className="custom-number-input h-10 w-32 ">
          <label
            htmlFor="custom-input-number"
            className="w-full text-gray-700 text-sm font-semibold mt-2"
          >
            Number of units
          </label>
          <div className="flex flex-row h-10 w-full rounded-lg  bg-transparent mt-1">
            <button
              onClick={decrement}
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <div>{counter}</div>
            <button
              onClick={() => {
                increment();
                onSubmit(name, price, id);
              }}
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardItem;
