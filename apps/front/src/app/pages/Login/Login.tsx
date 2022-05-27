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

const Login = () => {
  const user = useUser();
  const location = useLocation();
  const { values, errors, touched, setAllTouched, validateForm, handleChange } =
    useForm({
      initialValues: {
        username: "",
        password: "",
        stayConnected: true,
      },
      required: ["username", "password"],
    });

  const navigate = useNavigate();

  const [loginCall] = useAuth(useLogin);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      loginCall({
        variables: {
          username: values.username,
          password: values.password,
        },
      });
    } else {
      setAllTouched(true);
    }
  };

  if (user) {
    const { from } = decodeUri(location.search);
    return <Redirect to={from || "/"} />;
  }

  return (
    <div className="bg-baseBlue overflow-hidden  relative min-h-screen">
      {/* <div className="absolute  -right-20 h-full py-4">
      <img src={BackgroundLogo} alt="lo" className="h-full" />
    </div>
    <div className="bg-baseOrange w-widthLogoContainer h-heightLogoContainer flex justify-center px-4 py-6 shadow-boxShadowLogo absolute left-20 t-0">
      <img src={Logo} alt="packfast" className="w-widthLogo h-heightLogo" />
    </div>
    <div className="absolute overflow-hidden -left-88 bottom-4 h-1/3">
      <img src={Van} alt="van" className="h-full w-full" />
    </div> */}
      <div className="flex justify-center py-10">
        <div className="mt-24 flex flex-col w-1/3">
          <span className="text-white text-text22 text-center">PACKFAST</span>
          <span className="text-text48 text-white text-center font-bold">
            Se connecter
          </span>

          <form
            className="flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <Input
              name="username"
              label="Votre nom complet"
              onChange={handleChange("username")}
              value={values.username}
              icon={user}
              placeholder="Exemple : Ali ben mohamed"
              required
              type="text"
              errorText={touched.password && errors.username}
              borderColor="#fff"
              colorText="#fff"
            />
            <Input
              label="Mot de passe"
              name="password"
              value={values.password}
              onChange={handleChange("password")}
              placeholder="Taper Votre mot de passe"
              required
              type="password"
              // icon={key}
              errorText={touched.password && errors.password}
              borderColor="#fff"
              colorText="#fff"
            />
            <div className="my-6">
              <CheckBox
                label="Se souvenir de mon identifiant"
                onChange={handleChange("stayConnected")}
                checked={values.stayConnected}
                textColor="#fff"
                fill
                borderColor="border-baseOrange"
              />
            </div>
            <div className="mt-2">
              <Button
                label="Se connecter"
                container="full"
                sizeBtn="medium"
                type="primary"
                className="my-1 hover:bg-white hover:text-baseBlue"
              />
            </div>
            <div className="mt-2">
              <p className="text-white text-18 text-center mt-2">
                Vous n'avez pas un compte ?{" "}
                <span
                  className="text-white text-18 underline text-center cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  créer un compte
                </span>
              </p>
              <p
                onClick={() => navigate("/forgot")}
                className="text-white text-18 text-center mt-2 underline cursor-pointer"
              >
                Mot de passe oublié ?
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
  );
};

export default Login;
