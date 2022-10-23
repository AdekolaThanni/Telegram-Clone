import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormField from "../../globals/FormField";

const schema = Yup.object().shape({
  phoneNumber: Yup.string().required("Field is required"),
  password: Yup.string().required("Field is required"),
});

function Login({ setUserWantsToLogin }) {
  return (
    <div className="basis-[35rem]">
      <h1 className="text-cta-icon font-semibold text-[2rem] uppercase mb-[2rem]">
        Login To Telegram
      </h1>
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
        }}
        validationSchema={schema}
      >
        {({ errors, values }) => (
          <Form className="flex flex-col gap-[1.5rem]" autoComplete="off">
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
            <button
              className={`bg-cta-icon mt-[1rem] p-[1rem] rounded-xl uppercase text-white font-semibold opacity-80 ${
                !errors.phoneNumber && !errors.password && "opacity-100"
              }`}
              type="submit"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      <div
        onClick={() => setUserWantsToLogin(false)}
        className="mt-[2rem] text-right  text-secondary-text underline cursor-pointer hover:text-cta-icon"
      >
        New to Telegram
      </div>
    </div>
  );
}

export default Login;
