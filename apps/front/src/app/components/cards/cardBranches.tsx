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
  name?: string;
  status?: boolean;
  zone?: string;
  company?: string;
  franchise?: string;
  id?: string;
  refetch?: () => void;
  onDuplicate?: () => void;
  done?: number;
}
const BranchCard: React.FC<CardProps> = ({
  title,
  classNameContainer = "max-w-[344px]",
  classNameButton,
  name,
  status,
  onDuplicate,
  zone,
  company,
  franchise,
  done,
  id,
  ...rest
}) => {
  const navigate = useNavigate();
  const food = [food1, food2, food3, food4, food5, food6];
  const randomElement = food[Math.floor(Math.random() * food.length)];

  const [showModalConfirmationDuplicate, setShowModalConfirmationDuplicate] =
    useState(false);
  const clicked = (name?: string) => {
    let url = `./${name}?${id}`;

    navigate(url);
  };

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
    <div
      className="relative p-4 w-full bg-white bg-opacity-40 rounded-lg overflow-hidden shadow-md hover:shadow-2xl h-80"
      onClick={() => clicked(name)}
    >
      <div>
        <div className="absolute top-0 right-0 mt-2 mr-1 p-4 z-20 flex justify-between">
          <h2 className="mt-2 text-gray-800  text-base font-semibold line-clamp-1">
            {zone}
          </h2>
          <div className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-sm">
            <svg
              width="21"
              height="28"
              viewBox="0 0 21 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.760875 10.2396C0.756914 8.94054 1.00945 7.6535 1.50401 6.45227C1.99857 5.25105 2.72542 4.15928 3.64286 3.23959C5.36618 1.51189 7.66689 0.481537 10.1034 0.346283C12.5399 0.21103 14.9405 0.980405 16.8444 2.50674C18.7484 4.03308 20.0215 6.20884 20.4195 8.6164C20.8175 11.024 20.3123 13.4937 19.0009 15.5516C16.5342 19.4062 14.0602 23.2549 11.5789 27.0976C11.5299 27.1726 11.4849 27.2476 11.4289 27.3226C11.3475 27.4498 11.2353 27.5544 11.1029 27.6269C10.9704 27.6994 10.8219 27.7374 10.6709 27.7374C10.5199 27.7374 10.3713 27.6994 10.2388 27.6269C10.1064 27.5544 9.99426 27.4498 9.91285 27.3226C9.63685 26.9306 9.38687 26.5226 9.13087 26.1156L2.29786 15.4726C1.28538 13.9158 0.751064 12.0966 0.760875 10.2396ZM15.1779 10.2066C15.1798 9.3155 14.9175 8.44384 14.4241 7.70186C13.9306 6.95988 13.2282 6.3809 12.4056 6.03816C11.5831 5.69542 10.6774 5.60431 9.80308 5.77636C8.92876 5.94841 8.12508 6.37588 7.49372 7.00472C6.86237 7.63355 6.43169 8.4355 6.25614 9.30913C6.0806 10.1828 6.1681 11.0888 6.50755 11.9127C6.847 12.7366 7.42315 13.4413 8.16316 13.9378C8.90316 14.4342 9.77378 14.7 10.6649 14.7016C11.8593 14.7037 13.0057 14.2314 13.852 13.3885C14.6983 12.5455 15.1752 11.401 15.1779 10.2066Z"
                fill="red"
              />
            </svg>
          </div>
        </div>

        <div className="relative  w-full  h-full">
          <div className="h-32 w-full flex justify-center  rounded-lg">
            <div className="bg-trueblack relative content-left rounded-full mt-8 justify-center items-center w-[10rem] h-[10rem] text-white inline-flex">
              <img
                className="bg-trueblack relative content-left rounded-full  justify-center items-center w-[10rem] h-[10rem] text-white inline-flex"
                src={randomElement}
              ></img>
              {status && (
                <div className="bg-[#25D366] absolute bottom-0 right-0 rounded-full justify-center items-center w-[3rem] h-[3rem] text-white inline-flex"></div>
              )}
              {!status && (
                <div className="bg-[#f80000] absolute bottom-0 right-0 rounded-full justify-center items-center w-[3rem] h-[3rem] text-white inline-flex"></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-16 text-gray-800  text-lg font-semibold line-clamp-1 flex justify-center">
        {company}
      </h2>
      <h2 className="mt-2 text-gray-800  text-lg font-semibold line-clamp-1 flex justify-center">
        {franchise}
      </h2>
      <h2 className="mt-2 text-gray-800  text-lg font-semibold line-clamp-1 flex justify-center">
        {name}
      </h2>
    </div>
    // </div>
  );
};
export default BranchCard;
