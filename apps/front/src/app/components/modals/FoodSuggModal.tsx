import ModalContainer from "@components/feedback/Modal";

import Checked from "@assets/png/CHECKED.png";
import Close from "@assets/svg/closeOrange.svg";
import file from "@assets/svg/file.svg";
import Question from "@assets/svg/questionMark.svg";
import { useNavigate } from "react-router-dom";
import LOGO from "@assets/png/logo.png";
import { useEffect, useState } from "react";
import { useForm } from "@hooks/useForm";
import { useFormik } from "formik";

interface PropsModal {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  values: { v1: number; v2: number; v3: number; v4: number; v5: number };
  rest: () => void;
}
interface food {
  name: string;
  score: number;
}
const FoodSuggModal = ({
  open,
  onClose,
  onSubmit,
  values,
  rest,
}: PropsModal) => {
  const [foods, setFood] = useState<food[]>([
    { name: "Salade", score: 0 },
    { name: "Burger", score: 0 },
    { name: "Pizza", score: 0 },
    { name: "Pasta", score: 0 },
    { name: "Tacos", score: 0 },
    { name: "Sushi", score: 0 },
    { name: "Ramen", score: 0 },
    { name: "Rice", score: 0 },
    { name: "BBQ", score: 0 },
    { name: "Kabeb", score: 0 },
  ]);

  useEffect(() => {
    result(foods);
  }, [open]);

  const [best, setBest] = useState({ name: "", score: -1 });
  const [secondBest, setSecondBest] = useState({ name: "", score: -1 });
  const [thirdBest, setThirdBest] = useState({ name: "", score: -1 });

  const result = (list: food[]) => {
    let besttemp = best;
    let secondtemp = secondBest;
    let thirdtemp = thirdBest;
    let total = 0;
    if (values.v1 === 1) {
      (list[0].score = list[0].score + 3),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 1),
        (list[4].score = list[4].score + 3),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 0),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 3),
        (list[9].score = list[9].score + 2);
    }
    if (values.v1 === 2) {
      (list[0].score = list[0].score + 2),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 2),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 1),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 3),
        (list[9].score = list[9].score + 2);
    }
    if (values.v1 === 3) {
      (list[0].score = list[0].score + 2),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 3),
        (list[3].score = list[3].score + 3),
        (list[4].score = list[4].score + 1),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 1),
        (list[7].score = list[7].score + 1),
        (list[8].score = list[8].score + 2),
        (list[9].score = list[9].score + 3);
    }
    if (values.v1 === 4) {
      (list[0].score = list[0].score + 1),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 3),
        (list[3].score = list[3].score + 3),
        (list[4].score = list[4].score + 1),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 2),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 2),
        (list[9].score = list[9].score + 2);
    }
    if (values.v1 === 5) {
      (list[0].score = list[0].score + 1),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 3),
        (list[3].score = list[3].score + 3),
        (list[4].score = list[4].score + 1),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 2),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 2),
        (list[9].score = list[9].score + 2);
    }
    if (values.v2 === 1) {
      (list[0].score = list[0].score + 0),
        (list[1].score = list[1].score + 3),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 3),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 3),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 1),
        (list[9].score = list[9].score + 2);
    }
    if (values.v2 === 2) {
      (list[0].score = list[0].score + 1),
        (list[1].score = list[1].score + 3),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 2),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 3),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 1);
      list[9].score = list[9].score + 2;
    }
    if (values.v2 === 3) {
      (list[0].score = list[0].score + 1),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 2),
        (list[5].score = list[5].score + 1),
        (list[6].score = list[6].score + 3),
        (list[7].score = list[7].score + 3),
        (list[8].score = list[8].score + 2);
      list[9].score = list[9].score + 2;
    }
    if (values.v2 === 4) {
      (list[0].score = list[0].score + 3),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 2),
        (list[5].score = list[5].score + 1),
        (list[6].score = list[6].score + 1),
        (list[7].score = list[7].score + 3),
        (list[8].score = list[8].score + 3);
      list[9].score = list[9].score + 1;
    }
    if (values.v2 === 5) {
      (list[0].score = list[0].score + 3),
        (list[1].score = list[1].score + 1),
        (list[2].score = list[2].score + 1),
        (list[3].score = list[3].score + 1),
        (list[4].score = list[4].score + 1),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 2),
        (list[7].score = list[7].score + 4),
        (list[8].score = list[8].score + 3);
      list[9].score = list[9].score + 2;
    }
    if (values.v3 === 1) {
      (list[0].score = list[0].score + 0),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 3),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 3),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 4),
        (list[7].score = list[7].score + 1),
        (list[8].score = list[8].score + 1);
      list[9].score = list[9].score + 2;
    }
    if (values.v3 === 2) {
      (list[0].score = list[0].score + 1),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 3),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 2),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 3),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 1);
      list[9].score = list[9].score + 2;
    }
    if (values.v3 === 3) {
      (list[0].score = list[0].score + 2),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 2),
        (list[5].score = list[5].score + 3),
        (list[6].score = list[6].score + 2),
        (list[7].score = list[7].score + 1),
        (list[8].score = list[8].score + 2);
      list[9].score = list[9].score + 2;
    }
    if (values.v3 === 4) {
      (list[0].score = list[0].score + 3),
        (list[1].score = list[1].score + 1),
        (list[2].score = list[2].score + 0),
        (list[3].score = list[3].score + 1),
        (list[4].score = list[4].score + 2),
        (list[5].score = list[5].score + 3),
        (list[6].score = list[6].score + 2),
        (list[7].score = list[7].score + 3),
        (list[8].score = list[8].score + 3),
        (list[9].score = list[9].score + 2);
    }
    if (values.v3 === 5) {
      (list[0].score = list[0].score + 10),
        (list[1].score = list[1].score + 4),
        (list[2].score = list[2].score + 7),
        (list[3].score = list[3].score + 6),
        (list[4].score = list[4].score + 5),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 1),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 10);
    }
    if (values.v4 === 1) {
      (list[0].score = list[0].score + 3),
        (list[1].score = list[1].score + 3),
        (list[2].score = list[2].score + 4),
        (list[3].score = list[3].score + 3),
        (list[4].score = list[4].score + 0),
        (list[5].score = list[5].score + 0),
        (list[6].score = list[6].score + 0),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 3),
        (list[9].score = list[9].score + 2);
    }
    if (values.v4 === 2) {
      (list[0].score = list[0].score + 3),
        (list[1].score = list[1].score + 3),
        (list[2].score = list[2].score + 3),
        (list[3].score = list[3].score + 3),
        (list[4].score = list[4].score + 1),
        (list[5].score = list[5].score + 1),
        (list[6].score = list[6].score + 1),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 1),
        (list[9].score = list[9].score + 2);
    }
    if (values.v4 === 3) {
      (list[0].score = list[0].score + 2),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 3),
        (list[3].score = list[3].score + 3),
        (list[4].score = list[4].score + 2),
        (list[5].score = list[5].score + 1),
        (list[6].score = list[6].score + 2),
        (list[7].score = list[7].score + 1),
        (list[8].score = list[8].score + 2),
        (list[9].score = list[9].score + 2);
    }
    if (values.v4 === 4) {
      (list[0].score = list[0].score + 1),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 3),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 3),
        (list[7].score = list[7].score + 1),
        (list[8].score = list[8].score + 1),
        (list[9].score = list[9].score + 3);
    }
    if (values.v4 === 5) {
      (list[0].score = list[0].score + 0),
        (list[1].score = list[1].score + 1),
        (list[2].score = list[2].score + 1),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 4),
        (list[5].score = list[5].score + 4),
        (list[6].score = list[6].score + 4),
        (list[7].score = list[7].score + 1),
        (list[8].score = list[8].score + 1),
        (list[9].score = list[9].score + 2);
    }
    if (values.v5 === 1) {
      (list[0].score = list[0].score + 0),
        (list[1].score = list[1].score + 5),
        (list[2].score = list[2].score + 0),
        (list[3].score = list[3].score + 2),
        (list[4].score = list[4].score + 4),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 3),
        (list[7].score = list[7].score + 1),
        (list[8].score = list[8].score + 1),
        (list[9].score = list[9].score + 2);
    }
    if (values.v5 === 2) {
      (list[0].score = list[0].score + 1),
        (list[1].score = list[1].score + 3),
        (list[2].score = list[2].score + 1),
        (list[3].score = list[3].score + 3),
        (list[4].score = list[4].score + 1),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 3),
        (list[7].score = list[7].score + 2),
        (list[8].score = list[8].score + 2),
        (list[9].score = list[9].score + 2);
    }
    if (values.v5 === 3) {
      (list[0].score = list[0].score + 3),
        (list[1].score = list[1].score + 2),
        (list[2].score = list[2].score + 1),
        (list[3].score = list[3].score + 3),
        (list[4].score = list[4].score + 2),
        (list[5].score = list[5].score + 3),
        (list[6].score = list[6].score + 1),
        (list[7].score = list[7].score + 1),
        (list[8].score = list[8].score + 2),
        (list[9].score = list[9].score + 2);
    }
    if (values.v5 === 4) {
      (list[0].score = list[0].score + 5),
        (list[1].score = list[1].score + 0),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 0),
        (list[4].score = list[4].score + 3),
        (list[5].score = list[5].score + 3),
        (list[6].score = list[6].score + 1),
        (list[7].score = list[7].score + 3),
        (list[8].score = list[8].score + 2),
        (list[9].score = list[9].score + 1);
    }
    if (values.v5 === 5) {
      (list[0].score = list[0].score + 5),
        (list[1].score = list[1].score + 1),
        (list[2].score = list[2].score + 2),
        (list[3].score = list[3].score + 0),
        (list[4].score = list[4].score + 1),
        (list[5].score = list[5].score + 2),
        (list[6].score = list[6].score + 1),
        (list[7].score = list[7].score + 3),
        (list[8].score = list[8].score + 3),
        (list[9].score = list[9].score + 2);
    }
    list.forEach((v) => {
      total += v.score;
      if (v.score >= besttemp.score) {
        secondtemp = besttemp;
        besttemp = v;
      } else if (v.score >= secondtemp.score) {
        thirdtemp = secondtemp;
        secondtemp = v;
      } else if (v.score >= thirdtemp.score) {
        thirdtemp = v;
      }
    });

    setFood(list);
    setBest(besttemp);
    setSecondBest(secondtemp);
    setThirdBest(thirdtemp);
    return;
  };

  return (
    <ModalContainer
      open={open}
      classNameContainer=" w-1/3 "
      contentClasses="py-0"
      color={true}
      client={true}
    >
      <div className="flex flex-col items-center px-4 py-6 absolute right-0 t-20 cursor-pointer z-20">
        <img src={Close} alt="Close" width={20} height={20} onClick={onClose} />
      </div>
      <div className="h-full w-full relative flex flex-col items-center ">
        <div className="text-[#623b1e] text-4xl font-bold m-8">
          {" "}
          Food For You :{" "}
        </div>
        {Object.values(values).includes(0) && (
          <div className="text-2xl text-[#623b1e]">
            {" "}
            Please Answer All the Questions
          </div>
        )}
        {!Object.values(values).includes(0) && (
          <div className="text-2xl text-[#623b1e] ">
            We Suggest :
            <div>
              {best.name} with {((best.score / 25) * 100).toFixed(2)} %<br />
              {secondBest.name} with
              {((secondBest.score / 25) * 100).toFixed(2)} %<br />
              {thirdBest.name} with {((thirdBest.score / 25) * 100).toFixed(2)}{" "}
              %
              <br />
            </div>
          </div>
        )}
        <button
          className="bg-[#623b1e] text-white font-bold rounded-lg h-16 w-28 my-8 opacity-100 "
          onClick={() => {
            onClose();
            rest();
          }}
        >
          Confirm
        </button>
      </div>
    </ModalContainer>
  );
};

export default FoodSuggModal;
