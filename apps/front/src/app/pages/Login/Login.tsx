import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Input from "@components/inputs/Input";
import CheckBox from "@components/inputs/CheckBox";
import Button from "@components/button/Button";

import useAuth from "@hooks/useAuth";
import { useForm } from "@hooks/useForm";
import { useLogin } from "@requests/auth/mutations";

import useUser from "@hooks/useUser";
import Redirect from "@components/ui/Redirect";
import { decodeUri } from "@utils/url";
import LOGO from "../../assets/png/logo.png";
import DRIVER from "../../assets/png/DRIVER.png";

const Login = () => {
  const user = useUser();
  const location = useLocation();
  const { values, errors, touched, setAllTouched, validateForm, handleChange } =
    useForm({
      initialValues: {
        email: "",
        password: "",
        stayConnected: true,
      },
      required: ["email", "password"],
    });

  const navigate = useNavigate();

  const [loginCall, { error }] = useAuth(useLogin);
  if (error) {
    console.log("TTTS", error.message);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      loginCall({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    } else {
      setAllTouched(true);
    }
  };

  if (user) {
    const { from } = decodeUri(location.search);

    return <Redirect to={"" || "/"} />;
  }

  return (
    <div className="absolute inset-y-0 left-0 w-full max-h-fit flex  divide-x divide-white">
      <div className=" overflow-hidden left-0 relative min-h-screen rounded-r-4xl bg-cyan flex-2 w-3/5 ">
        <div className="text-black text-text22 text-left mt-8 ml-28">
          <img src={LOGO} alt="alt" width="200" height="200 "></img>
        </div>
        <div className="flex justify-center  inset-x-0 ">
          <img src={DRIVER} alt="alt" className="h-full" />{" "}
        </div>
      </div>
      <div className=" overflow-hidden  place-content-center relative min-h-screen bg-white flex-1 m-0   ">
        {/* <div className="absolute  -right-20 h-full py-4">
      <img src={BackgroundLogo} alt="lo" className="h-full" />
    </div>
    <div className="bg-baseOrange w-widthLogoContainer h-heightLogoContainer flex justify-center px-4 py-6 shadow-boxShadowLogo absolute left-20 t-0">
      <img src={Logo} alt="packfast" className="w-widthLogo h-heightLogo" />
    </div>
    <div className="absolute overflow-hidden -left-88 bottom-4 h-1/3">
      <img src={Van} alt="van" className="h-full w-full" />
    </div> */}
        <div className="px-20 justify-center py-10 mt-24">
          <div className="mt-24 flex flex-col ">
            <span className="text-black text-text38 text-center font-bold">
              WELCOME BACK !
            </span>
            <span className="text-text20 text-black text-center font-bold ">
              Welcome back ! please enter your details
            </span>

            <form
              className="flex flex-col justify-center py-20"
              onSubmit={handleSubmit}
            >
              <Input
                name="email"
                label=" Email"
                onChange={handleChange("email")}
                value={values.email}
                icon={user}
                placeholder="Exemple : login@gamil.com"
                required
                type="text"
                errorText={touched.password && errors.email}
                borderColor="#000000"
                colorText="#131F2A"
              />
              <Input
                label="password"
                name="password"
                value={values.password}
                onChange={handleChange("password")}
                placeholder="insert your password"
                required
                type="password"
                // icon={key}
                errorText={touched.password && errors.password}
                borderColor="#000000"
                colorText="#131F2A"
              />
              <p className=" text-xl  text-red-600">{error?.message}</p>
              {/* <p
                onClick={() => navigate("/forgot")}
                className="text-ghost text-18 text-right mt-2 underline cursor-pointer"
              >
                Forget your password ?
              </p> */}
              {/* <div className="my-6">
                <CheckBox
                  label="Remeber me"
                  onChange={handleChange("stayConnected")}
                  checked={values.stayConnected}
                  textColor="#fff"
                  fill
                  borderColor="border-baseOrange"
                />
              </div> */}
              <div className="mt-2 py-10 ">
                <Button
                  label="Sign In"
                  container="full"
                  sizeBtn="medium"
                  type="primary"
                  className="my-1 hover:bg-blue hover:text-grey rounded-lg font-bold text-text26"
                />
              </div>
              <div className="mt-2">
                <p className="text-black text-18 text-center mt-2">
                  You are not a member ?{" "}
                  <span
                    className="text-blue text-18 underline text-center cursor-pointer "
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
              <div className="md:mt-8 flex justify-between">
                {/* <div className="flex items-center">
                <img
                  src={file}
                  alt="file"
                  className="mr-2"
                  width={16}
                  height={20}
                />{" "}
                <span className="text-white text-sm underline cursor-pointer">
                  Conditions Générales et d'utilisation
                </span>
              </div> */}
                {/* <div className="flex items-center">
                <img
                  src={Question}
                  alt="mark"
                  className="mr-2"
                  width={24}
                  height={24}
                />
                <span className="text-white text-sm underline cursor-pointer">
                  Besoin d'aide ?
                </span>
              </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
