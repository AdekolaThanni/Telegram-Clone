import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { sidebarActions } from "../../../store/sidebarSlice";
import Header from "../../globals/Header";
import IconWrapper from "../../globals/IconWrapper";
import ActionsModal from "./ActionsModal";

function ChatHeader({ chatProfile }) {
  const dispatch = useDispatch();
  return (
    <Header className="flex items-center px-[2rem] bg-primary border-l border-black gap-[1.5rem] shrink-0">
      <IconWrapper
        className="hidden"
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
      {/*  */}
      <img
        src={chatProfile.avatar}
        alt={chatProfile.title}
        className="w-[4.2rem] h-[4.2rem] rounded-full"
      />
      <div className="flex flex-col mr-auto">
        <h2 className="font-semibold">{chatProfile.title}</h2>
        <span className="text-secondary text-[1.4rem]">
          {chatProfile.status.online && "online"}
        </span>
      </div>
      <IconWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M26 29h-.17C6.18 27.87 3.39 11.29 3 6.23A3 3 0 0 1 5.76 3h5.51a2 2 0 0 1 1.86 1.26L14.65 8a2 2 0 0 1-.44 2.16l-2.13 2.15a9.37 9.37 0 0 0 7.58 7.6l2.17-2.15a2 2 0 0 1 2.17-.41l3.77 1.51A2 2 0 0 1 29 20.72V26a3 3 0 0 1-3 3ZM6 5a1 1 0 0 0-1 1v.08C5.46 12 8.41 26 25.94 27a1 1 0 0 0 1.06-.94v-5.34l-3.77-1.51l-2.87 2.85l-.48-.06c-8.7-1.09-9.88-9.79-9.88-9.88l-.06-.48l2.84-2.87L11.28 5Z"
            className="!stroke-transparent"
          />
        </svg>
      </IconWrapper>
      <IconWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
          className="w-[2rem] h-[2rem]"
        >
          <path
            fill="currentColor"
            d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z"
            strokeWidth={1}
            className="group-focus-within:fill-cta-icon group-focus-within:stroke-cta-icon stroke-transparent"
          />
        </svg>
      </IconWrapper>
      <IconWrapper
        onClick={() => {
          dispatch(
            modalActions.openModal({
              type: "actionsModal",
              positions: { top: 60, right: 30 },
            })
          );
        }}
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
            className="!stroke-transparent"
          />
        </svg>
      </IconWrapper>
      <ActionsModal privateChat={chatProfile.privateChat} />
    </Header>
  );
}

export default ChatHeader;
