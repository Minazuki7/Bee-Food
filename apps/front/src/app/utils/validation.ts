import { isNaN } from "lodash";

export function isNumberEmpty(value: any) {
  if (value !== "" && !isNaN(value - 0)) return false;
  return true;
}

export function isStringEmpty(value: string) {
  if (value) return "";
  return "This field is required";
}

export function isArrayEmpty(values: any[]) {
  if (values.length) return "";
  return "Field empty";
}

export function validateEmail(email: string) {
  if (!email) return " Email empty";
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(`${email}`.toLowerCase())) {
    return "";
  }
  return " invalide Email";
}
export function hasUppercase(s: string) {
  return /[A-Z]/g.test(s);
}
export function hasLowercase(s: string) {
  return /[a-z]/g.test(s);
}
export function hasNumber(s: string) {
  return /[0-9]/g.test(s);
}
export function hasSpecial(s: string) {
  return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/g.test(s);
}
export function validatePassword(password: string) {
  if (!password) return "empty passward";
  if (password.length < 6) return " Password must exceed 6 characters";
  if (
    !hasNumber(password) ||
    !hasUppercase(password) ||
    !hasLowercase(password) ||
    !hasSpecial(password)
  ) {
    return "Password invalid";
  }
  return "";
}
