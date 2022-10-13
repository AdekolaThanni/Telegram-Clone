import React from "react";
import Modal from "../../globals/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import IconWrapper from "../../globals/IconWrapper";
import FormField from "../../globals/FormField";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";

const formSchema = Yup.object().shape({
  firstName: Yup.string().required("Field is required"),
  lastName: Yup.string(),
  phoneNumber: Yup.number().required("Field is required"),
});

function NewContactForm() {
  const dispatch = useDispatch();
  return (
    <Modal
      typeValue="newContactForm"
      className="max-w-[45rem] mx-[1rem]"
      canOverlayClose={false}
    >
      <Formik
        validationSchema={formSchema}
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
        }}
      >
        {({ errors, touched, values }) => (
          <Form
            className="px-[1rem] py-[1rem] flex flex-col gap-[2rem]"
            autoComplete="off"
          >
            {/* Header */}
            <div className="flex items-center">
              <IconWrapper onClick={() => dispatch(modalActions.closeModal())}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
                    strokeWidth={1}
                    className=""
                  />
                </svg>
              </IconWrapper>
              <h2 className="text-[2rem] font-semibold ml-[1rem]">
                Add Contact
              </h2>
              <button
                type="submit"
                className={`text-white uppercase px-[2rem] py-[1rem] rounded-md bg-cta-icon ml-auto
                ${(!values.firstName || !values.phoneNumber) && "opacity-60"}`}
              >
                Add
              </button>
            </div>
            {/* Top */}
            <div className="flex items-center mb-[.5rem] gap-[1.5rem]">
              {/* Avatar */}
              <div className="w-[10rem] h-[10rem] rounded-full bg-cta-icon flex items-center justify-center text-[2.5rem] text-white font-bold uppercase">
                {values.firstName[0]}{" "}
                {values.lastName[0] || values.firstName?.split(" ")?.[1]?.[0]}
              </div>
              {/* Forms */}
              <div className="flex flex-col gap-[2rem]">
                {/* form group */}
                <FormField
                  name="firstName"
                  labelName="First Name"
                  required={true}
                  error={errors.firstName}
                  touched={touched.firstName}
                  value={values.firstName}
                />
                <FormField
                  name="lastName"
                  labelName="Last Name"
                  required={false}
                  error={errors.lastName}
                  touched={touched.lastName}
                  value={values.lastName}
                />
              </div>
            </div>
            {/* Bottom */}
            <FormField
              name="phoneNumber"
              labelName="Phone Number"
              required={true}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
              value={values.phoneNumber}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default NewContactForm;
