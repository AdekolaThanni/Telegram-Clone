import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ContactItem from "../Contacts/ContactItem";

function ContactSelect({ contact, selected, addContact, removeContact }) {
  const [selectState, setSelectState] = useState(selected);

  useEffect(() => {
    setSelectState(selected);
  }, [selected]);

  return (
    <div
      onClick={() =>
        selectState ? removeContact(contact._id) : addContact(contact)
      }
      className="flex items-center px-[1rem] mx-[1.5rem] rounded-3xl gap-[1.5rem] cursor-default active:bg-secondary-light-text"
    >
      <input type="checkbox" name="contacts" hidden />
      <label
        htmlFor="contacts"
        className={`border border-secondary-text rounded-md w-[2.5rem] h-[2.5rem] flex items-center
         justify-center duration-200 ${
           selectState && "border-none bg-cta-icon"
         }`}
      >
        <AnimatePresence>
          {selectState && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              className="w-[1.7rem] h-[1.7rem]"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="m4 12l6 6L20 6"
                className="fill-transparent stroke-white"
              />
            </svg>
          )}
        </AnimatePresence>
      </label>
      <ContactItem contact={contact} />
    </div>
  );
}

export default ContactSelect;
