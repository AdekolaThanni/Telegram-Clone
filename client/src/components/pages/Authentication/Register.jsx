import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormField from "../../globals/FormField";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too short")
    .max(50, "Too long")
    .required("Field is required"),
  username: Yup.string()
    .min(1, "Too short")
    .max(50, "Too long")
    .required("Field is required"),
  phoneNumber: Yup.string().required("Field is required"),
  password: Yup.string().required("Field is required"),
  confirmPassword: Yup.string()
    .required("Field is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function Register({ setUserWantsToLogin }) {
  return (
    <div className="basis-[35rem]">
      <h1 className="text-cta-icon font-semibold text-[2rem] uppercase mb-[2rem]">
        Join Telegram
      </h1>
      <Formik
        initialValues={{
          name: "",
          username: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
      >
        {({ errors, values }) => (
          <Form className="flex flex-col gap-[1.5rem]" autoComplete="off">
            <FormField
              labelName="Name"
              labelClassName={`bg-transparent group-focus-within:hidden ${
                values.firstName && "hidden"
              }`}
              name="name"
              required={true}
              value={values.name}
              error={errors.name}
            />

            <FormField
              labelName="Username"
              labelClassName={`bg-transparent group-focus-within:hidden ${
                values.firstName && "hidden"
              }`}
              name="username"
              required={true}
              value={values.username}
              error={errors.username}
            />

            <FormField
              labelName="Telephone Number"
              labelClassName={`bg-transparent group-focus-within:hidden ${
                values.phoneNumber && "hidden"
              }`}
              name="phoneNumber"
              required={true}
              value={values.phoneNumber}
              error={errors.phoneNumber}
            />

            <FormField
              labelName="Password"
              labelClassName={`bg-transparent group-focus-within:hidden ${
                values.password && "hidden"
              }`}
              name="password"
              required={true}
              value={values.password}
              error={errors.password}
              fieldType="password"
            />

            <FormField
              labelName="Confirm Password"
              labelClassName={`bg-transparent group-focus-within:hidden ${
                values.password && "hidden"
              }`}
              name="confirmPassword"
              required={true}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              fieldType="confirmPassword"
            />
            <button
              className={`bg-cta-icon mt-[1rem] p-[1rem] rounded-xl uppercase text-white font-semibold opacity-80 ${
                !errors.name &&
                !errors.username &&
                !errors.phoneNumber &&
                !errors.password &&
                !errors.confirmPassword &&
                "opacity-100"
              }`}
              type="submit"
            >
              Join
            </button>
          </Form>
        )}
      </Formik>
      <div
        onClick={() => setUserWantsToLogin(true)}
        className="mt-[2rem] text-right  text-secondary-text underline cursor-pointer hover:text-cta-icon"
      >
        Already on Telegram
      </div>
    </div>
  );
}

export default Register;
