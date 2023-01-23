import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useContactList from "../hooks/useContactList";
import { sidebarActions } from "../store/sidebarSlice";
import IconWrapper from "../components/globals/IconWrapper";
import ActivePage from "../components/pages/Sidebar/ActivePage";
import ContactSelect from "../components/pages/SelectContacts/ContactSelect";
import SelectedContacts from "../components/pages/SelectContacts/SelectedContacts";
import CTAIconWrapper from "../components/globals/CTAIconWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { modalActions } from "../store/modalSlice";

function SelectContacts() {
  const { contacts, handleSearchValue, searchValue } = useContactList();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const dispatch = useDispatch();

  const removeContact = (contactId) => {
    setSelectedContacts((prevState) =>
      prevState.filter((contact) => contact._id !== contactId)
    );
  };

  const addContact = (contact) => {
    setSelectedContacts((prevState) => prevState.concat(contact));
  };

  return (
    <ActivePage
      activePageName="selectContacts"
      className="relative overflow-y-hidden"
    >
      {/* Header */}
      <div className="px-[1.5rem] flex flex-col gap-[1rem] mb-[1.5rem] py-[.5rem]">
        <div className="flex items-center">
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
          <h2 className="font-semibold ml-[3rem] text-[2rem]">Add Members</h2>
        </div>

        {/* All added members */}
        {/* Selected contacts */}
        <SelectedContacts
          contacts={selectedContacts}
          removeContact={removeContact}
        />
        {/* Search Input */}
        {!!contacts.length && (
          <input
            type="text"
            className="focus-within:outline-none placeholder:text-secondary-text bg-transparent w-full ml-[1rem]"
            placeholder="Who would you like to add?"
            onChange={handleSearchValue}
            value={searchValue}
          />
        )}
      </div>

      {/* Contacts */}
      {contacts.map((contact) => (
        <ContactSelect
          contact={contact}
          key={contact._id}
          selected={selectedContacts.some((con) => con._id === contact._id)}
          addContact={addContact}
          removeContact={removeContact}
        />
      ))}
      {/* If no contacts exists */}
      {!contacts.length && (
        <div className="flex flex-col py-[2rem] items-center uppercase">
          <button
            onClick={() =>
              dispatch(
                modalActions.openModal({
                  type: "newContactForm",
                  positions: {},
                })
              )
            }
            className={`bg-cta-icon mt-[5rem] p-[1rem] rounded-xl uppercase text-white font-semibold opacity-80 flex items-center justify-center`}
            type="submit"
          >
            Add Contacts Now
          </button>
        </div>
      )}

      {/* ADD button */}
      <AnimatePresence>
        {selectedContacts.length && (
          <motion.div
            initial={{ bottom: "-10rem" }}
            animate={{ bottom: "2rem" }}
            exit={{ bottom: "-10rem" }}
            className="w-fit h-fit absolute right-[2rem]"
          >
            <CTAIconWrapper className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                className="rotate-180"
              >
                <path
                  fill="currentColor"
                  d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2Z"
                  className="stroke-transparent fill-white"
                />
              </svg>
            </CTAIconWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivePage>
  );
}

export default SelectContacts;
