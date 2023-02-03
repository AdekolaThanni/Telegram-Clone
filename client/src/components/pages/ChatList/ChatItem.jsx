import React from "react";
import useTime from "../../../hooks/useTime";
import MessageCheck from "../../globals/MessageCheck";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import useModalBestPosition from "../../../hooks/useModalBestPosition";
import useChat from "../../../hooks/useChat";
import { chatListActions } from "../../../store/chatListSlice";
import Image from "../../globals/Image";

function ChatItem({ chatData }) {
  // Chat options visibility
  const chatOptionVisible = useSelector(
    (state) => state.modalReducer.payload.chatRoomId === chatData.chatRoomId
  );

  const activeChat = useSelector(
    (state) => state.chatReducer.currentChatRoom._id === chatData.chatRoomId
  );

  // Chat mode of user i.e Typing, recording
  const chatMode = useSelector((state) => {
    const chatIndex = state.chatListReducer.findIndex(
      (chat) => chat.chatRoomId === chatData.chatRoomId
    );

    return state.chatListReducer[chatIndex]?.mode;
  });

  // Currently logged in user id
  const userId = useSelector((state) => state.userReducer.user._id);

  // Set chat room function
  const { setChatRoom } = useChat(chatData, "chatList");

  // Format latest message date
  const formattedDate = useTime(chatData.latestMessage.timeSent);

  const dispatch = useDispatch();

  // returns function to get the best position for a modal
  const getBestModalPostion = useModalBestPosition();

  // Elements data to help with getting best position
  const elemData = {
    modalData: {
      width: 140,
      height: 80,
    },
    overlayId: "side-bar",
  };

  // show options handler
  const showOptions = (event) => {
    event.preventDefault();
    const positions = getBestModalPostion(event, elemData);
    dispatch(
      modalActions.openModal({
        type: "chatOptions",
        payload: chatData,
        positions,
      })
    );
  };

  // On mobile, enable holding down to show options
  const timeoutToShowOptions = (event) => {
    const timer = setTimeout(() => {
      showOptions(event);
    }, 250);

    event.currentTarget.addEventListener("mouseup", () => {
      clearTimeout(timer);
    });
  };

  return (
    <div
      onClick={() => {
        setChatRoom();
      }}
      onContextMenu={showOptions}
      onMouseDown={timeoutToShowOptions}
      className={`p-[1rem] rounded-[1.5rem] not-selectable flex gap-[1rem] text-secondary-text group  cursor-default ${
        activeChat ? "bg-cta-icon !text-white" : "hover:bg-secondary-light-text"
      } ${chatOptionVisible && "bg-secondary-light-text"}`}
    >
      {/* Avatar */}
      <Image
        src={chatData.profile.avatar}
        alt={chatData.profile.name || chatData.profile.username}
        className="w-[5.5rem] h-[5.5rem] rounded-full"
      />
      {/* Details */}
      <div className="flex-grow overflow-hidden">
        {/* Title */}
        <div className="flex justify-between">
          <span
            className={`text-primary-text font-medium ${
              activeChat && "!text-white"
            }`}
          >
            {chatData.profile.name || chatData.profile.username}
          </span>

          {/* Message check */}
          <span className="flex items-center gap-[.5rem]">
            {chatData.latestMessage.sender === userId && (
              <MessageCheck
                readStatus={chatData.latestMessage.readStatus}
                deliveredStatus={chatData.latestMessage.deliveredStatus}
                className={`${activeChat && "!stroke-white"}`}
              />
            )}
            <span className="text-[1.4rem]">{formattedDate}</span>
          </span>
        </div>

        {/* Subtitle */}
        <div className="flex justify-between">
          {/* Chat mode status */}
          {chatMode && (
            <span className="text-cta-icon italic font-normal">
              {chatMode}...
            </span>
          )}

          {/* Default without chatMode active */}
          {!chatMode && (
            <>
              {/* Latest text */}
              <span className="flex-grow truncate">
                {!(chatData.roomType === "Private") &&
                  !!chatData.latestMessage.sender && (
                    <span
                      className={`text-primary-text ${
                        activeChat && "!text-white"
                      }`}
                    >
                      {chatData.latestMessage.sender}:{" "}
                    </span>
                  )}
                {chatData.latestMessage.messageType === "text" && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: chatData.latestMessage.message,
                    }}
                  ></span>
                )}

                {chatData.latestMessage.messageType === "image" && (
                  <span className="flex items-center gap-[.5rem]">
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
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0Z"
                        className={`stroke-secondary-text !fill-transparent ${
                          activeChat && "!stroke-white"
                        }`}
                      />
                    </svg>
                    Photo
                  </span>
                )}
              </span>

              {/* When user has a message pinned and also has an unread message, the unread message indicator takes precedence */}
              <span className="">
                {chatData.unreadMessagesCount ? (
                  <span className="flex items-center justify-center rounded-full text-white bg-cta-icon min-w-[2.5rem] min-h-[2.5rem] px-[.8rem]">
                    {chatData.unreadMessagesCount}
                  </span>
                ) : (
                  chatData.pinned && (
                    <svg
                      width="25"
                      height="26"
                      viewBox="0 0 25 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5187 6.5C14.5844 6.49988 14.6495 6.51272 14.7102 6.53777C14.771 6.56282 14.8262 6.5996 14.8727 6.646L19.8227 11.596C19.9164 11.6898 19.9691 11.8169 19.9691 11.9495C19.9691 12.0821 19.9164 12.2092 19.8227 12.303C19.3427 12.783 18.7507 12.891 18.3197 12.891C18.1427 12.891 17.9847 12.873 17.8597 12.852L14.7257 15.986C14.8082 16.3184 14.8617 16.6573 14.8857 16.999C14.9317 17.701 14.8537 18.686 14.1657 19.374C14.0719 19.4677 13.9448 19.5204 13.8122 19.5204C13.6796 19.5204 13.5524 19.4677 13.4587 19.374L10.6297 16.546L7.44768 19.728C7.25268 19.923 6.22868 20.63 6.03368 20.435C5.83868 20.24 6.54568 19.215 6.74068 19.021L9.92268 15.839L7.09468 13.01C7.00094 12.9162 6.94828 12.7891 6.94828 12.6565C6.94828 12.5239 7.00094 12.3968 7.09468 12.303C7.78268 11.615 8.76768 11.536 9.46968 11.583C9.81134 11.6069 10.1503 11.6605 10.4827 11.743L13.6167 8.61C13.5905 8.45772 13.5771 8.30351 13.5767 8.149C13.5767 7.719 13.6847 7.127 14.1657 6.646C14.2594 6.55253 14.3863 6.50003 14.5187 6.5V6.5ZM14.6407 8.612V8.61V8.612ZM14.6407 8.61V8.612C14.6696 8.69997 14.6734 8.79423 14.6519 8.88428C14.6304 8.97433 14.5842 9.05662 14.5187 9.122L10.9837 12.656C10.918 12.7214 10.8354 12.7673 10.7452 12.7884C10.655 12.8096 10.5606 12.8053 10.4727 12.776H10.4707L10.4567 12.772C10.3615 12.7435 10.2655 12.7182 10.1687 12.696C9.91712 12.6373 9.66133 12.5985 9.40368 12.58C8.98168 12.552 8.56768 12.588 8.22868 12.73L13.7387 18.239C13.8797 17.899 13.9157 17.486 13.8877 17.064C13.8622 16.7067 13.7978 16.3533 13.6957 16.01L13.6917 15.997V15.996C13.6621 15.9079 13.6577 15.8134 13.6789 15.723C13.7001 15.6325 13.7461 15.5498 13.8117 15.484L17.3477 11.949C17.4158 11.8805 17.5022 11.8332 17.5967 11.8128C17.6911 11.7924 17.7894 11.7997 17.8797 11.834L17.9757 11.856C18.0627 11.873 18.1837 11.89 18.3197 11.89C18.4337 11.89 18.5497 11.879 18.6627 11.85L14.6177 7.806C14.5887 7.919 14.5777 8.036 14.5777 8.149C14.5782 8.30438 14.599 8.45903 14.6397 8.609L14.6407 8.61Z"
                        className={`stroke-secondary-text fill-transparent ${
                          activeChat && "!stroke-white"
                        }`}
                      />
                      <circle
                        cx="12.5"
                        cy="13"
                        r="12"
                        stroke="red"
                        className={`stroke-secondary-text ${
                          activeChat && "!stroke-white"
                        }`}
                      />
                    </svg>
                  )
                )}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
