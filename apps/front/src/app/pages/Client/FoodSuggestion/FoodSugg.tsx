import { useNavigate } from "react-router-dom";
import Blind from "@assets/png/blind.png";
import Directed from "@assets/svg/directed.svg";

const FoodSuggestion = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate("../branches");
  };
  const blind = () => {
    navigate("./blindMode");
  };
  const directed = () => {
    navigate("./assistedMode");
  };

  return (
    <div>
      <button
        onClick={back}
        className="self-start bg-[#623b1e] justify-start mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>
      <div className=" flex  font-bold justify-center text-5xl mt-6">
        Choose your mode:
      </div>
      <div className="flex flex-2 justify-center text-3xl gap-12 font-bold mt-6 ">
        <div
          className="w-1/3 h-38 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300 "
          onClick={directed}
        >
          <div>
            <div className="mt-6">Directed</div>
            <img
              className=" w-6/12 mt-12 ml-24 mb-6 flex justify-center"
              src={Directed}
            />
            <a> </a>
          </div>
        </div>
        <div
          className="w-1/3 h-38 shadow-2xl  flex-col justify-center rounded-xl border-2 border-[#fff]  text-center cursor-pointer hover:w-1/2 hover:h-full hover:duration-300"
          onClick={blind}
        >
          <div>
            <div className="mt-6">Blind</div>
            <img
              className=" w-6/12 mt-8 ml-24 mb-6 flex justify-center "
              src={Blind}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FoodSuggestion;
