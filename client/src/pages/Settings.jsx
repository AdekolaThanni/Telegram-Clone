import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import CTAIconWrapper from "../components/globals/CTAIconWrapper";
import Header from "../components/globals/Header";
import IconWrapper from "../components/globals/IconWrapper";
import ActivePage from "../components/pages/Sidebar/ActivePage";
import useSettings from "../hooks/useSettings";
import { sidebarActions } from "../store/sidebarSlice";
import { modalActions } from "../store/modalSlice";
import * as Yup from "yup";
import FormField from "../components/globals/FormField";
import LogoutModal from "../components/pages/Settings/LogoutModal";

const formSchema = Yup.object().shape({
  firstName: Yup.string().required("Field is required"),
  lastName: Yup.string(),
  username: Yup.string(),
  phoneNumber: Yup.number().required("Field is required"),
});

function Settings() {
  const dispatch = useDispatch();
  const { user } = useSettings();
  return (
    <ActivePage
      activePageName="settings"
      className="custom-scrollbar overflow-y-scroll"
    >
      <Header className="px-[1.5rem] flex items-center">
        <IconWrapper
          onClick={() =>
            dispatch(
              sidebarActions.changeActivePage({ newActivePage: "chatList" })
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2Z"
              className="stroke-transparent"
            />
          </svg>
        </IconWrapper>
        <h2 className="text-[2rem] font-semibold ml-[3rem]">Settings</h2>
        <IconWrapper
          onClick={() =>
            dispatch(
              modalActions.openModal({
                type: "logoutModal",
                positions: { top: 50, right: 15 },
              })
            )
          }
          className="ml-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"
            />
          </svg>
        </IconWrapper>
      </Header>
      {/* Avatar */}
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-full h-[30rem]"
        />
        <CTAIconWrapper
          onClick={(event) =>
            event.currentTarget.querySelector("#avatar").click()
          }
          className="absolute bottom-[2rem] right-[2rem] cursor-pointer"
        >
          <input type="file" name="avatar" id="avatar" hidden />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <circle cx="12" cy="13" r="3" />
              <path d="M5 7h2a2 2 0 0 0 2-2a1 1 0 0 1 1-1h2m9 7v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2m10-1h6m-3-3v6" />
            </g>
          </svg>
        </CTAIconWrapper>
      </div>
      {/* Details */}
      <Formik
        validationSchema={formSchema}
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
          phoneNumber: user.phoneNumber,
          username: user.username,
        }}
      >
        {({ values, errors }) => (
          <Form
            className="mt-[3rem] px-[1.5rem] flex flex-col gap-[3rem]"
            autoComplete="off"
          >
            <FormField
              value={values.firstName}
              error={errors.firstName}
              name="firstName"
              required={true}
              labelName="Name"
            />
            <FormField
              value={values.lastName}
              name="lastName"
              required={false}
              labelName="Last Name"
            />
            <FormField
              value={values.username}
              name="username"
              required={false}
              labelName="Username"
            />
            <FormField
              value={values.bio}
              name="bio"
              required={false}
              labelName="Bio"
            />
            <FormField
              value={values.phoneNumber}
              name="phoneNumber"
              required={true}
              labelName="Phone Number"
            />
            <button
              className={`bg-cta-icon text-center py-[1rem] mb-[2rem] uppercase font-semibold rounded-xl text-white ${
                !(
                  values.firstName !== user.firstName ||
                  values.lastName !== user.lastName ||
                  values.phoneNumber !== user.phoneNumber ||
                  values.bio !== user.bio
                ) && "opacity-60"
              }`}
            >
              Update Profile
            </button>
          </Form>
        )}
      </Formik>
      <LogoutModal />
    </ActivePage>
  );
}

export default Settings;
