import React from "react";
import Modal from "./Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import IconWrapper from "./IconWrapper";
import FormField from "./FormField";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import useFetch from "../../hooks/useFetch";
import { contactsActions } from "../../store/contactsSlice";
import useSocket from "../../hooks/useSocket";
import { chatListActions } from "../../store/chatListSlice";

const formSchema = Yup.object().shape({
  name: Yup.string().required("Field is required"),
  username: Yup.string().required("Field is required"),
});

function NewContactForm() {
  const dispatch = useDispatch();
  const { socketEmit } = useSocket();
  const { reqFn } = useFetch({ method: "POST", url: "/contacts" }, (data) => {
    dispatch(contactsActions.addContact(data.data.contact));
    socketEmit("user:joinRooms", { rooms: [data.data.contact.chatRoomId] });
    dispatch(
      chatListActions.addToChatList({
        newChat: {
          chatRoomId: data.data.contact.chatRoomId,
          roomType: "Private",
          latestMessage: {},
          unreadMessagesCount: 0,
          pinned: false,
          mode: null,
          profile: {
            name: data.data.contact.name,
            ...data.data.contact.contactDetails,
          },
        },
      })
    );
  });

  const addContact = async (values) => {
    await reqFn(values);
    dispatch(modalActions.closeModal({}));
  };

  return (
    <Modal
      typeValue="newContactForm"
      className="mx-[1rem] !bg-primary backdrop-blur-0"
      canOverlayClose={false}
    >
      <Formik
        validationSchema={formSchema}
        initialValues={{
          name: "",
          username: "",
        }}
        onSubmit={addContact}
      >
        {({ errors, touched, values }) => (
          <Form
            className="px-[1rem] py-[1rem] flex flex-col gap-[2rem] w-[38rem]"
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
                ${(!values.name || !values.username) && "opacity-60"}`}
              >
                Add
              </button>
            </div>
            {/* Top */}
            <div className="flex items-center mb-[.5rem] gap-[1.5rem]">
              {/* Avatar */}
              <div className="w-[10rem] h-[10rem] rounded-full bg-cta-icon flex items-center justify-center text-[2.5rem] text-white font-bold uppercase">
                {values.name[0]} {values.name?.split(" ")?.[1]?.[0]}
              </div>
              {/* Forms */}
              <div className="flex-grow">
                <FormField
                  name="name"
                  labelName="Name"
                  required={true}
                  error={errors.name}
                  touched={touched.name}
                  value={values.name}
                />
              </div>
            </div>
            {/* Bottom */}
            <FormField
              name="username"
              labelName="Username"
              required={true}
              error={errors.username}
              touched={touched.username}
              value={values.username}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default NewContactForm;
