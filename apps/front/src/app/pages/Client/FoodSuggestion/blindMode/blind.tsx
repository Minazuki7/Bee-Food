import FoodSuggModal from "@components/modals/FoodSuggModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValueSetting from "../Values";

const FoodSuggestion = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ v1: 0, v2: 0, v3: 0, v4: 0, v5: 0 });
  const back = () => {
    navigate("../FoodSuggestion");
  };
  const handleChange = (event: any) => {
    const value = event.target.value;

    setValues({ ...values, [event.target.name]: parseInt(value) });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  const rest = () => {
    setValues({ v1: 0, v2: 0, v3: 0, v4: 0, v5: 0 });
  };
  return (
    <div>
      <FoodSuggModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={() => {
          setOpen(false);
        }}
        values={values}
        rest={rest}
      />
      <button
        onClick={back}
        className="self-start bg-[#623b1e] justify-start mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>
      <div className="flex justify-center  text-2xl ">
        <div>
          <div className="text-5xl text-center ">
            How much you agree with this statment ? <br />
            <span className="text-xl ml-16 ">
              (1:Strongly Disagree ; 2:Disagree ; 3:Neutral ; 4:Agree ; 5
              Strongly Agree)
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="mt-8 ">
              <div className="flex justify-start">
                <div className="flex gap-4 w-full">
                  <div className=" place-self-start mt-7 w-1/2  ">
                    1 : You prefer cold weather over hot one ?
                  </div>
                  <ValueSetting
                    name={"v1"}
                    seleceted={values.v1}
                    onChange={handleChange}
                  />
                </div>{" "}
                <br />
              </div>
              <div className="flex justify-start">
                <div className="flex gap-4 w-full">
                  <div className=" place-self-start mt-7 w-1/2 ">
                    {" "}
                    2 : You find comfort in gloominess rather than brightness ?
                  </div>
                  <ValueSetting
                    name={"v2"}
                    seleceted={values.v2}
                    onChange={handleChange}
                  />
                </div>
                <br />
              </div>
              <div className="flex justify-start">
                <div className="flex gap-4 w-full">
                  <div className=" place-self-start mt-7 w-1/2 ">
                    {" "}
                    3: Are you an outdoor person ?
                  </div>

                  <ValueSetting
                    name={"v3"}
                    seleceted={values.v3}
                    onChange={handleChange}
                  />
                </div>{" "}
                <br />
              </div>
              <div className="flex justify-start">
                <div className="flex gap-4 w-full">
                  <div className=" place-self-start mt-7 w-1/2 ">
                    4: You consider your self a risk taker ?
                  </div>
                  <ValueSetting
                    name={"v4"}
                    seleceted={values.v4}
                    onChange={handleChange}
                  />
                </div>{" "}
                <br />
              </div>
              <div className="flex justify-start">
                <div className="flex gap-4 w-full">
                  <div className=" place-self-start mt-7 w-1/2 ">
                    5: You find joy in sharing ?
                  </div>

                  <ValueSetting
                    name={"v5"}
                    seleceted={values.v5}
                    onChange={handleChange}
                  />
                </div>{" "}
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setOpen(true)}
          className=" self-center w-2/6 bg-[#623b1e] text-2xl  mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default FoodSuggestion;
