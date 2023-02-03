import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { chatListActions } from "../store/chatListSlice";

const useChatList = () => {
  const chatList = useSelector((state) => state.chatListReducer);
  const userId = useSelector((state) => state.userReducer.user._id);
  const [searchValue, setSearchValue] = useState("");
  const [searchedChats, setSearchedChats] = useState([]);

  const dispatch = useDispatch();

  const { reqFn: fetchChatRoomSummary, reqState: loadingChatList } = useFetch(
    { method: "GET", url: "/chatRoom/summary" },
    (data) =>
      dispatch(
        chatListActions.setChatList({ chatList: data.data.chatRoomSummary })
      )
  );

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue) {
      setSearchedChats(
        chatList.filter(
          (chat) =>
            chat.profile.name
              ?.toLowerCase()
              .startsWith(searchValue.toLowerCase()) ||
            chat.profile.username
              .toLowerCase()
              .startsWith(searchValue.toLowerCase())
        )
      );
    } else {
      setSearchedChats(chatList);
    }
  }, [searchValue, chatList]);

  useEffect(() => {
    if (userId) {
      fetchChatRoomSummary();
    }
  }, [userId]);

  return {
    chatList: searchedChats,
    searchValue,
    handleSearchValue,
    loadingChatList,
  };
};

export default useChatList;
