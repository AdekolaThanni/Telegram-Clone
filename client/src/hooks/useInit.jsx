import { useEffect } from "react";
import useSocket from "./useSocket";
import { useSelector, useDispatch } from "react-redux";
import { contactsActions } from "../store/contactsSlice";
import useFetch from "./useFetch";
import { chatActions } from "../store/chatSlice";
import { modalActions } from "../store/modalSlice";
import useChatBot from "./useChatBot";
import { authActions } from "../store/authSlice";

const useInit = () => {
  // useSocketHook
  const { socketEmit, socketListen, userId, socket } = useSocket();

  // Set app theme
  useEffect(() => {
    const initialMode = JSON.parse(localStorage.getItem("darkMode"));
    document
      .querySelector("html")
      .setAttribute("class", initialMode ? "dark" : "null");
  }, []);

  const { respondAsChatBot } = useChatBot();

  // Send default messages from bot
  const sendDefaultMessagesFromBot = (chatRoomId) => {
    respondAsChatBot({
      chatRoomId,
      message:
        "Hi there, I'm Eddie <br /> <br /> A Chat bot to keep you busy while you are still new to the app (built by Adekola Thanni). <br /> <br /> You can test out some of the features of the app while talking with me but I'll strongly recommend you adding a friend to your contact list. <br /> You can hop on a call and video call with them, something more fun than talking to a robot <img class='w-[2.5rem] h-[2.5rem] inline-block' src='https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f643.png'>",
    });
  };

  // Get logged in state
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  const isNew = useSelector((state) => state.authReducer.isNew);

  const chatList = useSelector((state) => state.chatListReducer);

  const dispatch = useDispatch();

  // Fetch user contacts
  const { reqFn: fetchContacts } = useFetch(
    { method: "GET", url: "/contacts" },
    (data) => {
      dispatch(contactsActions.setContacts(data.data.contacts));
    }
  );

  // Moment user logs in, fetch contacts
  useEffect(() => {
    if (loggedIn) {
      fetchContacts();
    }
  }, [loggedIn]);

  // On getting user details
  useEffect(() => {
    if (userId) {
      // Connect socket if disconnected
      if (socket.disconnected) {
        socket.connect();
      }
      // Announce logged in status
      socketEmit("user:online", userId);

      // Listen to online event from other users
      socketListen("user:online", (userId) => {
        const payload = {
          id: userId,
          status: {
            online: true,
          },
        };
        // Set contact online status
        dispatch(contactsActions.setContactOnlineStatus(payload));
        // Set chatroom online status
        dispatch(chatActions.updateChatProfile({ payload }));
      });

      // Listen to offline event from other users
      socketListen("user:offline", ({ userId, time }) => {
        const payload = {
          id: userId,
          status: {
            online: false,
            lastSeen: time,
          },
        };

        dispatch(contactsActions.setContactOnlineStatus(payload));
        dispatch(chatActions.updateChatProfile({ payload }));
      });
    }
  }, [userId]);

  useEffect(() => {
    // Listen to call request
    socketListen(
      "user:callRequest",
      ({ chatRoomId, signalData, userId, callType }, acknowledgeCall) => {
        dispatch(
          modalActions.openModal({
            type: `${callType}CallModal`,
            payload: {
              partnerProfile: chatList.find(
                (chat) => chat.chatRoomId === chatRoomId
              ).profile,
              callDetail: {
                caller: false,
                chatRoomId,
                callerSignal: signalData,
                callerId: userId,
              },
            },
            positions: {},
          })
        );
        acknowledgeCall();
      }
    );

    if (chatList.length && isNew.isNew) {
      sendDefaultMessagesFromBot(isNew.payload.chatRoomId);

      dispatch(authActions.setUserIsNew({}));
    }

    return () => {
      socket.off("user:callRequest");
    };
  }, [chatList]);

  return {
    loggedIn,
  };
};

export default useInit;
