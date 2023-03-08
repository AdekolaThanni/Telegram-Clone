const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");
const catchAsyncError = require("../utilities/catchAsyncError");
const ReqError = require("../utilities/ReqError");

exports.createChatRoom = async (chatRoomDetails) =>
  await ChatRoom.create(chatRoomDetails);

exports.getChatRoom = catchAsyncError(async (req, res, next) => {
  const chatRoom = await ChatRoom.findById(req.params.chatRoomId);
  if (!chatRoom) return next(new ReqError(400, "Chat does not exist"));

  res.status(200).json({
    status: "success",
    data: { chatRoom },
  });
});

exports.getChatRoomSummaryForUser = catchAsyncError(async (req, res, next) => {
  // Get user
  const user = await User.findById(req.cookies.userId);

  let chatRoomSummary = await Promise.all(
    user.chatRooms.map(async (chatRoomId) => {
      const outputSummary = {};

      // Get chatRoom object
      const chatRoom = await ChatRoom.findById(chatRoomId).populate({
        path: "members",
        select: "id username avatar bio status",
      });

      if (!chatRoom) return next(new ReqError("Chat room can't be found"));

      // If there are messages in the room message in chatRoom
      if (chatRoom.messageHistory.length) {
        // Get chatRoom latest message
        const lastDay =
          chatRoom.messageHistory[chatRoom.messageHistory.length - 1];

        outputSummary.latestMessage =
          lastDay.messages[lastDay.messages.length - 1];

        // Get how many messages are unread by user in the chatRoom
        outputSummary.unreadMessagesCount = user.unreadMessages.reduce(
          (acc, curr) => {
            if (chatRoomId.toString() === curr.chatRoomId.toString())
              return (acc += 1);

            return acc;
          },
          0
        );
      } else {
        outputSummary.latestMessage = {};
        outputSummary.unreadMessagesCount = 0;
      }

      // Attach chatRoomId
      outputSummary.chatRoomId = chatRoomId;
      outputSummary.roomType = chatRoom.roomType;

      // If roomType is private
      if (chatRoom.roomType === "Private") {
        const profile = chatRoom.members.find(
          (member) => user._id.toString() !== member._id.toString()
        );

        outputSummary.profile = profile;
        outputSummary.profile.name = user.contacts.find(
          (contact) =>
            contact.contactDetails.toString() === profile._id.toString()
        )?.name;
      }

      outputSummary.mode = null;

      // Check if chat is pinned
      outputSummary.pinned = user.pinnedChatRooms.some(
        (chatRoom) => chatRoom.toString() === chatRoomId.toString()
      );

      return outputSummary;
    })
  );

  // Get all pinned chats and sort based on newest message
  const pinnedChats = chatRoomSummary
    .filter((chatRoom) => chatRoom.pinned)
    .sort((a, b) => {
      const latestMessageInATime = new Date(a.latestMessage.timeSent).getTime();
      const latestMessageInBTime = new Date(b.latestMessage.timeSent).getTime();

      return latestMessageInBTime - latestMessageInATime;
    });

  // Get all unpinned chats and sort based on newest message
  const unpinnedChats = chatRoomSummary
    .filter((chatRoom) => !chatRoom.pinned)
    .sort((a, b) => {
      const latestMessageInATime = new Date(a.latestMessage.timeSent).getTime();
      const latestMessageInBTime = new Date(b.latestMessage.timeSent).getTime();

      return latestMessageInBTime - latestMessageInATime;
    });

  // Concatenate both arrays
  chatRoomSummary = [...pinnedChats, ...unpinnedChats];

  res.status(200).json({
    status: "success",
    data: {
      chatRoomSummary,
    },
  });
});

exports.pinChatRoom = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.cookies.userId);
  user.pinnedChatRooms.push(req.params.chatRoomId);
  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      pinnedChatRooms: user.pinnedChatRooms,
    },
  });
});

exports.unpinChatRoom = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.cookies.userId);
  user.pinnedChatRooms = user.pinnedChatRooms.filter(
    (chatRoomId) => chatRoomId.toString() !== req.params.chatRoomId
  );
  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      pinnedChatRooms: user.pinnedChatRooms,
    },
  });
});

exports.checkIfChatRoomExists = async (user, secondaryUser) => {
  let chatRoomId;
  // secondaryUser is the user not performing the action
  // Chat room exists if secondaryUser already has user as a contact
  secondaryUser.contacts.forEach((contact) => {
    if (contact.contactDetails.toString() === user._id.toString()) {
      chatRoomId = contact.chatRoomId;
    }
  });

  return chatRoomId;
};

exports.deleteChatRoom = async (chatRoomId) => {
  await ChatRoom.findByIdAndDelete(chatRoomId);
};

exports.clearChatRoom = async ({ chatRoomId }) => {
  const chatRoom = await ChatRoom.findById(chatRoomId);

  chatRoom.messageHistory = [];

  for (memberId of chatRoom.members) {
    const memberModel = await User.findById(memberId);

    memberModel.unreadMessages = memberModel.unreadMessages.filter(
      (data) => data.chatRoomId.toString() !== chatRoom._id.toString()
    );

    memberModel.undeliveredMessages = memberModel.undeliveredMessages.filter(
      (data) => data.chatRoomId.toString() !== chatRoom._id.toString()
    );

    await memberModel.save();
  }

  await chatRoom.save();
};

// Get all chat room user belongs to
exports.getAllChatRoomUserIn = async (userId) => {
  const user = await User.findById(userId);
  return user.chatRooms;
};

// Add message to chatroom
exports.addMessageToChatRoom = async (chatRoomId, message) => {
  const chatRoom = await ChatRoom.findById(chatRoomId);

  // Get last chatRoom day message
  const lastDayMessage =
    chatRoom.messageHistory[chatRoom.messageHistory.length - 1];

  // Get day message was sent
  const dayString = new Date(message.timeSent).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  // Convert day string to milliseconds
  const day = new Date(dayString).getTime();

  // Add list of all members to message undelivered and unread members
  message.undeliveredMembers = chatRoom.members;
  message.unreadMembers = chatRoom.members.filter(
    (memberId) => memberId.toString() !== message.sender.toString()
  );

  // Check if day is today
  if (lastDayMessage?.day === day) {
    // Add to object if day is today
    lastDayMessage.messages.push(message);
  } else {
    // Else create new object for day
    const newDayObject = {
      day,
      messages: [message],
    };
    chatRoom.messageHistory.push(newDayObject);
  }

  await chatRoom.save();

  // Return message object included with message id
  const messageObj =
    chatRoom.messageHistory[chatRoom.messageHistory.length - 1].messages[
      chatRoom.messageHistory[chatRoom.messageHistory.length - 1].messages
        .length - 1
    ];

  return { messageObj, chatRoom, day };
};

exports.getMessageFromChatRoom = async ({ chatRoomId, messageId, day }) => {
  // Get chat room
  const chatRoom = await ChatRoom.findById(chatRoomId);

  if (!chatRoom.messageHistory.length) return {};

  // Get dayMessages
  const dayMessage = chatRoom.messageHistory.find(
    (dayMessage) => dayMessage.day === day
  );

  // Get message obj
  const message = dayMessage.messages.find(
    (message) => message._id.toString() === messageId.toString()
  );

  return { chatRoom, message };
};

// Check member off undelivered list in message
exports.checkMembersOffUndeliveredListInMessage = async ({
  membersId,
  messageId,
  chatRoomId,
  day,
  io,
}) => {
  const { message, chatRoom } = await this.getMessageFromChatRoom({
    day,
    messageId,
    chatRoomId,
  });

  if (!message) return;

  message.undeliveredMembers = message.undeliveredMembers.filter(
    (memberId) => !membersId.includes(memberId.toString())
  );

  if (!message.undeliveredMembers.length) {
    message.deliveredStatus = true;

    // Emit message been delivered
    io.to(chatRoomId).emit("user:messageDelivered", {
      messageId: message._id,
      senderId: message.sender,
      chatRoomId,
      day,
    });
  }

  await chatRoom.save();

  return {
    undeliveredMembers: message.undeliveredMembers,
    messageDelivered: message.deliveredStatus,
  };
};

// Add message as unread to users
exports.addMessageAsUndeliveredToUser = async ({
  undeliveredMembers,
  chatRoomId,
  messageId,
  day,
}) => {
  for (let memberId of undeliveredMembers) {
    const memberModel = await User.findById(memberId.toString());

    // If message hasn't been added as undelivered before, add
    memberModel.undeliveredMessages.push({
      day,
      chatRoomId,
      messageId,
    });

    await memberModel.save();
  }
};

exports.addMessageAsUnreadToUser = async ({
  unreadMembers,
  chatRoomId,
  messageId,
  day,
}) => {
  for (let memberId of unreadMembers) {
    const memberModel = await User.findById(memberId);

    memberModel.unreadMessages.push({
      day,
      chatRoomId,
      messageId,
    });

    await memberModel.save();
  }
};

// Mark messages as read by user
exports.markMessageAsReadByUser = async ({
  messageId,
  chatRoomId,
  day,
  userId,
  io,
}) => {
  const { message, chatRoom } = await this.getMessageFromChatRoom({
    messageId,
    chatRoomId,
    day,
  });

  if (!message) return;

  const user = await User.findById(userId);

  user.unreadMessages = user.unreadMessages.filter(
    (message) => message.messageId.toString() !== messageId.toString()
  );

  message.unreadMembers = message.unreadMembers.filter(
    (memberId) => memberId.toString() !== userId.toString()
  );

  if (!message.unreadMembers.length) {
    message.readStatus = true;

    // Emit message as been read by all members
    io.to(chatRoomId).emit("user:messageReadByAllMembers", {
      messageId: message._id,
      senderId: message.sender,
      chatRoomId,
      day,
    });
  }

  await chatRoom.save();
  await user.save();
};
