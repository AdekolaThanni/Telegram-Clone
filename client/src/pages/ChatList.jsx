import React, { useState } from "react";
import CTAIconWrapper from "../components/globals/CTAIconWrapper";
import ChatItem from "../components/pages/ChatList/ChatItem";
import CTAModal from "../components/pages/ChatList/CTAModal";
import Menu from "../components/pages/ChatList/Menu";
import ChatListSkeleton from "../components/pages/ChatList/ChatListSkeleton";
import ActivePage from "../components/pages/Sidebar/ActivePage";
import useChatList from "../hooks/useChatList";
import { AnimatePresence, motion } from "framer-motion";
import ChatOptionsModal from "../components/pages/ChatList/ChatOptionsModal";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalSlice";
import Header from "../components/globals/Header";
import SearchBar from "../components/pages/ChatList/SearchBar";
import { useEffect } from "react";
import useSocket from "../hooks/useSocket";
import { chatListActions } from "../store/chatListSlice";
import { sidebarActions } from "../store/sidebarSlice";

function ChatList() {
  const { chatList, handleSearchValue, searchValue, loadingChatList } =
    useChatList();
  const ctaModalVisible = useSelector(
    (state) => state.modalReducer.type === "ctaModal"
  );

  const dispatch = useDispatch();
  const { socketListen } = useSocket();

  useEffect(() => {
    socketListen("user:chatRoomClear", ({ chatRoomId }) => {
      dispatch(
        chatListActions.removeFromChatList({
          chatRoomId,
        })
      );
    });
  }, []);

  return (
    <ActivePage activePageName="chatList" className="flex flex-col">
      {loadingChatList === "loading" && <ChatListSkeleton />}
      {loadingChatList === "success" && (
        <>
          <Header className="flex px-[2rem] items-center gap-[1rem]">
            <Menu />
            <SearchBar
              handleSearchValue={handleSearchValue}
              searchValue={searchValue}
              className="flex-grow"
            />
          </Header>
          <div className="basis-full p-[.5rem] overflow-y-scroll custom-scrollbar">
            {chatList.map((chatItem) => {
              if (!chatItem.latestMessage._id) return null;

              return <ChatItem key={chatItem.chatRoomId} chatData={chatItem} />;
            })}
            {!chatList.length && (
              <div className="flex flex-col py-[2rem] items-center uppercase">
                <button
                  onClick={() =>
                    dispatch(
                      sidebarActions.changeActivePage({
                        newActivePage: "contacts",
                      })
                    )
                  }
                  className={`bg-cta-icon mt-[5rem] p-[1rem] rounded-xl uppercase text-white font-semibold opacity-80 flex items-center justify-center`}
                  type="submit"
                >
                  Start Chat Now
                </button>
              </div>
            )}
            <ChatOptionsModal />
          </div>

          {/* CTA to create new group chat or private chat */}
          <CTAModal />
          <CTAIconWrapper
            className="absolute bottom-[2rem] right-[2rem] cursor-pointer"
            onClick={() => {
              if (ctaModalVisible) {
                dispatch(modalActions.closeModal());
              } else {
                dispatch(
                  modalActions.openModal({
                    positions: { right: 20, bottom: 80 },
                    type: "ctaModal",
                  })
                );
              }
            }}
          >
            <AnimatePresence>
              {!ctaModalVisible && (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transitionDuration: 0.2 }}
                  exit={{ scale: 0, transitionDuration: 0.2 }}
                >
                  <path
                    fill="currentColor"
                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157l3.712 3.712l1.157-1.157a2.625 2.625 0 0 0 0-3.712Zm-2.218 5.93l-3.712-3.712l-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
                    className="fill-white stroke-white"
                  />
                </motion.svg>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {ctaModalVisible && (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 32 32"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transitionDuration: 0.2 }}
                  exit={{ scale: 0, transitionDuration: 0.2 }}
                  className="absolute"
                >
                  <path
                    fill="currentColor"
                    d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
                    strokeWidth={1}
                    className="fill-white stroke-white"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </CTAIconWrapper>
        </>
      )}
    </ActivePage>
  );
}

export default ChatList;
