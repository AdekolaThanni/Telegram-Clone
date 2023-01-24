import React from "react";
import { useDispatch } from "react-redux";
import CTAIconWrapper from "../components/globals/CTAIconWrapper";
import Header from "../components/globals/Header";
import IconWrapper from "../components/globals/IconWrapper";
import SearchBar from "../components/pages/ChatList/SearchBar";
import ContactItem from "../components/pages/Contacts/ContactItem";
import ActivePage from "../components/pages/Sidebar/ActivePage";
import useContactList from "../hooks/useContactList";
import { sidebarActions } from "../store/sidebarSlice";
import { modalActions } from "../store/modalSlice";

function Contacts() {
  const dispatch = useDispatch();
  const { contacts, handleSearchValue, searchValue } = useContactList();
  return (
    <ActivePage activePageName="contacts" className="">
      <Header className="flex items-center gap-[2rem] px-[1.5rem]">
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
        <SearchBar
          className="flex-grow"
          searchValue={searchValue}
          handleSearchValue={handleSearchValue}
        />
      </Header>
      {/* Contacts */}
      <div className="">
        {!!contacts.length &&
          contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
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
      </div>
      <CTAIconWrapper
        onClick={() =>
          dispatch(
            modalActions.openModal({
              type: "newContactForm",
              positions: {},
            })
          )
        }
        className="absolute bottom-[2rem] right-[2rem]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M12 20v-8m0 0V4m0 8h8m-8 0H4"
            className=" stroke-white"
          />
        </svg>
      </CTAIconWrapper>
    </ActivePage>
  );
}

export default Contacts;
