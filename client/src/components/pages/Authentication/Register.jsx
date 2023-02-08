import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormField from "../../globals/FormField";
import useFetch from "../../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import Spinner from "../../globals/Spinner";
import useChatBot from "../../../hooks/useChatBot";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too short")
    .max(50, "Too long")
    .required("Field is required"),
  username: Yup.string()
    .min(1, "Too short")
    .max(50, "Too long")
    .required("Field is required"),
  password: Yup.string().required("Field is required"),
  confirmPassword: Yup.string()
    .required("Field is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function Register({ setUserWantsToLogin }) {
  const dispatch = useDispatch();

  // Add bot as contact
  const { reqFn: addBotAsContact, reqState: addBotState } = useFetch(
    { url: "/contacts", method: "POST" },
    (data) => {
      dispatch(
        authActions.setUserIsNew({
          isNew: true,
          payload: { chatRoomId: data.data.contact.chatRoomId },
        })
      );

      dispatch(authActions.login());
    }
  );

  // Register user
  const { reqFn, reqState } = useFetch(
    { url: "/user/register", method: "POST" },
    () => {
      addBotAsContact({
        name: process.env.REACT_APP_BOT_NAME,
        username: process.env.REACT_APP_BOT_USERNAME,
      });
    }
  );

  return (
    <div className="basis-[35rem]">
      <h1 className="text-cta-icon font-semibold text-[2rem] uppercase mb-[2rem]">
        Join Telegram
      </h1>
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
        onSubmit={reqFn}
      >
        {({ errors, values }) => (
          <Form className="flex flex-col gap-[1.5rem]" autoComplete="off">
            <FormField
              labelName="Name"
              labelClassName={`bg-transparent group-focus-within:hidden ${
                values.name && "hidden"
              }`}
              name="name"
              required={true}
              value={values.name}
              error={errors.name}
            />

            <FormField
              labelName="Username"
              labelClassName={`bg-transparent group-focus-within:hidden ${
                values.username && "hidden"
              }`}
              name="username"
              required={true}
              value={values.username}
              error={errors.username}
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
                values.confirmPassword && "hidden"
              }`}
              name="confirmPassword"
              required={true}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              fieldType="password"
            />
            <button
              className={`bg-cta-icon mt-[1rem] p-[1rem] rounded-xl uppercase text-white font-semibold opacity-80 flex items-center justify-center ${
                !errors.name &&
                !errors.username &&
                !errors.phoneNumber &&
                !errors.password &&
                !errors.confirmPassword &&
                "opacity-100"
              }`}
              type="submit"
            >
              {reqState !== "loading" && addBotState !== "loading" && "Join"}
              {(reqState === "loading" || addBotState === "loading") && (
                <Spinner className="w-[2.5rem] h-[2.5rem]" />
              )}
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
