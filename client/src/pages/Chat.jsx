import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "../components/pages/Chat/ChatHeader";
import MessageList from "../components/pages/Chat/MessageList";
import NewMessage from "../components/pages/Chat/NewMessage";
import useChat from "../hooks/useChat";
import { userProfileActions } from "../store/userProfileSlice";
import useSocket from "../hooks/useSocket";
import { chatListActions } from "../store/chatListSlice";

function Chat() {
  const {
    mode,
    chat: { chatProfile, messageHistory },
    chatActions,
  } = useChat();

  const unreadMessagesByUser = useSelector(
    (state) => state.userReducer.user.unreadMessages
  );

  const { socketListen, socketEmit, userId } = useSocket();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileActions.setProfile(chatProfile));
  }, [chatProfile]);

  useEffect(() => {
    // Listen to typing events from other users
    let timeInterval;
    socketListen("user:typing", ({ userId, chatRoomId }) => {
      clearTimeout(timeInterval);

      dispatch(chatActions.setChatProfileMode({ id: userId, mode: "typing" }));
      dispatch(chatListActions.setChatMode({ chatRoomId, mode: "typing" }));

      timeInterval = setTimeout(() => {
        dispatch(chatActions.setChatProfileMode({ id: userId, mode: null }));
        dispatch(chatListActions.setChatMode({ chatRoomId, mode: null }));
      }, 1000);
    });

    // Listen to recording event from other users
    socketListen("user:recording", ({ userId, chatRoomId }) => {
      dispatch(
        chatActions.setChatProfileMode({ id: userId, mode: "recording" })
      );
      dispatch(chatListActions.setChatMode({ chatRoomId, mode: "recording" }));
    });

    // Listen to record stopping event from other users
    socketListen("user:recordingStopped", ({ userId, chatRoomId }) => {
      dispatch(chatActions.setChatProfileMode({ id: userId, mode: null }));
      dispatch(chatListActions.setChatMode({ chatRoomId, mode: null }));
    });

    // Listen to clearance of a chat room
    socketListen("user:chatRoomClear", ({ chatRoomId }) => {
      dispatch(
        chatActions.removeChatRoom({
          chatRoomId,
        })
      );
    });
  }, []);

  const chatActive = useSelector((state) => state.chatReducer.active);

  const currentChatRoom = useSelector(
    (state) => state.chatReducer.currentChatRoom
  );

  useEffect(() => {
    // Mark messages unread in that chat room as read
    const unreadMessagesInCurrentChatRoom = unreadMessagesByUser?.filter(
      (messages) => messages.chatRoomId === currentChatRoom._id
    );

    if (
      unreadMessagesInCurrentChatRoom &&
      unreadMessagesInCurrentChatRoom.length
    ) {
      socketEmit("user:markMessagesAsRead", {
        chatRoomId: currentChatRoom._id,
        messages: unreadMessagesInCurrentChatRoom,
        userId,
      });
    }
  }, [currentChatRoom]);

  return (
    <div
      className={`chat-bg flex-grow h-full relative flex flex-col overflow-hidden shrink-0 sm:absolute sm:top-0 sm:left-0 sm:w-full duration-200 ${
        chatActive
          ? "lg:basis-full sm:translate-x-0"
          : "lg:basis-[100rem] sm:translate-x-[55rem]"
      }`}
      onClick={() => {
        if (!chatActive && currentChatRoom._id) {
          dispatch(chatActions.setChatActive());
        }
      }}
    >
      {userId && (
        <>
          {/* Header */}
          <ChatHeader
            className={`${!currentChatRoom.chatProfile.username && "hidden"}`}
            chatProfile={chatProfile}
          />
          {/* container */}
          <div
            className={`flex-grow px-[1rem] sm:px-[.5rem] overflow-hidden ${
              !currentChatRoom.chatProfile.username && "hidden"
            }`}
          >
            <div className="max-w-[75rem] h-full mx-auto flex flex-col justify-end pb-[2rem] relative overflow-hidden">
              <MessageList messageHistory={messageHistory} />
              <NewMessage mode={mode} currentChatRoom={currentChatRoom} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
