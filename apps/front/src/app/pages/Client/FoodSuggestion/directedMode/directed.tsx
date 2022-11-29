import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loadsh from "lodash";
import Cold from "@assets/svg/cold.svg";
import Hot from "@assets/svg/hot.svg";
import Cheap from "@assets/svg/cheap.svg";
import Meat from "@assets/svg/meat.svg";
import Salad from "@assets/svg/salad.svg";
import Salty from "@assets/svg/salty.svg";
import Sandwish from "@assets/svg/sandwish.svg";
import Sweet from "@assets/svg/sweet.svg";
import Expensive from "@assets/svg/expensive.svg";
import Spaghetti from "@assets/svg/spaghetti.svg";
import NotFound from "@assets/png/NotFound.png";
import FoodResult from "@components/modals/foodModal";

const FoodSuggestion = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(0);
  const [values, setValues] = useState({ v1: 0, v2: 0, v3: 0, v4: 0 });

  const handleChange = (event: any) => {
    const value = event.target.value;

    setValues({ ...values, [event.target.name]: parseInt(value) });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  const back = () => {
    navigate("../FoodSuggestion");
  };

  return (
    <div>
      <FoodResult
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={() => {
          setOpen(false);
        }}
        //values={values}
        //rest={rest}
      />
      <button
        onClick={back}
        className="self-start bg-[#623b1e] justify-start mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>
      <div className=" flex  font-bold justify-center text-6xl mt-6">
        Choose your prefrence:
      </div>
      {status === 0 && (
        <div className="flex flex-2 justify-center text-3xl gap-12 font-bold mt-6 ">
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v1: 1 });
              setStatus(1);
            }}
          >
            <div>
              <div className="mt-6">Hot</div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center"
                src={Hot}
              />
            </div>
          </div>
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v1: 2 });
              setStatus(1);
            }}
          >
            <div>
              <div className="mt-6">Cold</div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center "
                src={Cold}
              />
            </div>
          </div>
        </div>
      )}
      {status === 1 && (
        <div className="flex flex-2 justify-center text-3xl gap-7 font-bold mt-6 ">
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v2: 1 });
              setStatus(2);
            }}
          >
            <div>
              <div className="mt-6">Salty</div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center"
                src={Salty}
              />
            </div>
          </div>
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v2: 2 });
              setStatus(2);
            }}
          >
            <div>
              <div className="mt-6">Sweet</div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center "
                src={Sweet}
              />
            </div>
          </div>
        </div>
      )}
      {/* {status === 2 && (
        <div className="flex flex-2 justify-center text-3xl gap-7 font-bold mt-6 ">
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v3: 1 });
              setStatus(3);
            }}
          >
            <div>
              <div className="mt-6">Expensive</div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center"
                src={Expensive}
              />
            </div>
          </div>
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v3: 2 });
              setStatus(3);
            }}
          >
            <div>
              <div className="mt-6">Cheap</div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center "
                src={Cheap}
              />
            </div>
          </div>
        </div>
      )} */}
      {status === 2 && (
        <div className="flex flex-2 justify-center text-3xl gap-7 font-bold mt-6 ">
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v3: 1 });
              setStatus(3);
            }}
          >
            <div>
              <div className="mt-6">Non-Vegaterian</div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center"
                src={Meat}
              />
            </div>
          </div>
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v3: 2 });
              setStatus(3);
            }}
          >
            <div>
              <div className="mt-6">Vegaterian</div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center "
                src={Salad}
              />
            </div>
          </div>
        </div>
      )}
      {status === 3 && (
        <div className="flex flex-2 justify-center text-3xl gap-7 font-bold mt-6 ">
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v4: 1 });
              setStatus(4);
              setOpen(true);
            }}
          >
            <div>
              <div className="mt-6">Platter </div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center"
                src={Spaghetti}
              />
            </div>
          </div>
          <div
            className="w-1/3 h-1/2 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
            onClick={() => {
              setValues({ ...values, v4: 2 });
              setStatus(4);
              setOpen(true);
            }}
          >
            <div>
              <div className="mt-6">Sandwish</div>
              <img
                className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center "
                src={Sandwish}
              />
            </div>
          </div>
        </div>
      )}
      {status === 4 && (
        <div className=" flex justify-center text-center content-center w-full ml- mt-4  font-bold">
          {/* <img src={NotFound} width="500" height="500"></img> */}
        </div>
      )}
    </div>
  );
};
export default FoodSuggestion;
