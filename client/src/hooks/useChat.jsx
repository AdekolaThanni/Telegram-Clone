import useFetch from "./useFetch";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../store/chatSlice";
import { chatListActions } from "../store/chatListSlice";

const useChat = (contact, from = "contact") => {
  const mode = useSelector((state) => state.chatReducer.mode);
  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.chatReducer.chatHistory);
  const chat = useSelector((state) => state.chatReducer.currentChatRoom);

  // Fetch chat room request
  const { reqFn: fetchChatRoom } = useFetch(
    {
      method: "GET",
      url: `/chatRoom/${contact?.chatRoomId}`,
    },
    (data) => {
      const chatRoom = {
        chatProfile:
          from === "contact"
            ? {
                ...contact.contactDetails,
                name: contact.contactName,
              }
            : { ...contact.profile },
        ...data.data.chatRoom,
      };
      // Set chat room as current
      dispatch(chatActions.setChatRoom({ chatRoom }));
      // Add chat room to history
      dispatch(
        chatActions.addToChatRoomHistory({
          chatRoomId: contact.chatRoomId,
          chatRoom,
        })
      );
    }
  );

  // Set chat room
  const setChatRoom = async (
    { disableSettingChatRoomActive } = { disableSettingChatRoomActive: false }
  ) => {
    // Check if chat has been fetched already
    const chatRoom = chatHistory[contact.chatRoomId];
    if (chatRoom) {
      dispatch(chatActions.setChatRoom({ chatRoom }));
    } else {
      await fetchChatRoom();
    }

    !disableSettingChatRoomActive && dispatch(chatActions.setChatActive());
    dispatch(
      chatListActions.markMessagesInChatRoomAsRead({
        chatRoomId: contact.chatRoomId,
      })
    );
  };

  return { chat, setChatRoom, mode, chatActions };
};

export default useChat;
