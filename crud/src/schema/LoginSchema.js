// import * as yup from "yup";
// export const LoginSchema = yup.object({
//   email: yup.string.email().required(),
//   password: yup.string.matches(/^[A-Z][a-z]{5}[0-9]{3}$/).required(),
// });

import * as Yup from 'yup'

export const LoginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().matches(
    /^[A-Z][a-z]{5}[0-9]{3}$/,
    "Password must be 1 uppercase, 5 lowercase, and 3 digits"
  ).required()
});
