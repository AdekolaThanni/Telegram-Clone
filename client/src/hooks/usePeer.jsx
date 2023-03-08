import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import useSocket from "./useSocket";
import Peer from "simple-peer";
import useSendMessage from "./useSendMessage";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalSlice";
import useCounter from "./useCounter";

const usePeer = ({ mediaOptions, callDetail }) => {
  const userMediaRef = useRef();
  const partnerMediaRef = useRef();

  //   Get id of chat room both user belongs to
  const currentChatRoomId = useSelector(
    (state) => state.chatReducer.currentChatRoom._id
  );
  const [userStream, setUserStream] = useState();
  //   Call status to show calling, ringing, ongoing
  const [callStatus, setCallStatus] = useState("calling");
  //   Call acceptance state
  const [callAccepted, setCallAccepted] = useState();
  //   Duration counter for call
  const {
    formattedTime: duration,
    startCounter,
    stopCounter,
  } = useCounter({ showCentiseconds: false });
  //   Get socket instances
  const { socketEmit, socketListen, socket, userId } = useSocket();
  //   Send call details to database
  const { sendMessage } = useSendMessage();

  const dispatch = useDispatch();

  // Get user media and attach to ref
  useEffect(() => {
    if (userMediaRef.current) {
      navigator.mediaDevices.getUserMedia(mediaOptions).then((stream) => {
        setUserStream(stream);
        userMediaRef.current.srcObject = stream;
      });
    }
  }, []);

  // If user is the one initiating call
  useEffect(() => {
    if (callDetail.caller && userStream) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: userStream,
      });
      peer.on("signal", (signalData) => {
        socketEmit(
          "user:callRequest",
          {
            signalData,
            callType: mediaOptions.video ? "video" : "voice",
            chatRoomId: currentChatRoomId,
            userId,
          },
          (callAcknowledged) => {
            // Caller acknowledges call request
            setCallStatus(callAcknowledged ? "ringing" : "calling");
            // While call receiver hasn't picked call
            setTimeout(() => {
              if (!callAccepted) {
                dispatch(modalActions.closeModal());
                denyCall("Missed");
              }
            }, 60000);
          }
        );
      });
      socketListen("user:callAccepted", ({ signalData }) => {
        peer.signal(signalData);
        setCallAccepted(true);
        // Start duration
        startCounter();
      });
      peer.on("stream", (stream) => {
        partnerMediaRef.current.srcObject = stream;
      });
      peer.on("close", () => {
        socket.off("user:callAccepted");
        dispatch(modalActions.closeModal());
        userStream.getTracks().forEach(function (track) {
          track.stop();
        });
      });
      socketListen("user:endCall", () => {
        peer.destroy();
      });
    }
  }, [userStream]);

  //   If user is the one receiving call
  useEffect(() => {
    if (callAccepted && userStream && !callDetail.caller) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: userStream,
      });

      peer.on("signal", (signalData) => {
        socketEmit("user:callAccepted", {
          signalData,
          chatRoomId: callDetail.chatRoomId,
        });

        // Start duration
        startCounter();
      });

      peer.signal(callDetail.callerSignal);

      peer.on("stream", (stream) => {
        partnerMediaRef.current.srcObject = stream;
      });

      peer.on("close", () => {
        dispatch(modalActions.closeModal());
        userStream.getTracks().forEach(function (track) {
          track.stop();
        });
      });
    }
  }, [callAccepted, userStream]);

  //   If call is denied by any user
  useEffect(() => {
    socketListen("user:callDenied", () => {
      // If user is the caller, show reason for disconnection
      if (callDetail.caller) {
        setCallStatus("Call denied");
        setTimeout(() => {
          dispatch(modalActions.closeModal());
        }, 1000);
      } else {
        dispatch(modalActions.closeModal());
      }

      userStream.getTracks().forEach(function (track) {
        track.stop();
      });
    });

    return () => {
      socket.off("user:callDenied");
    };
  }, [userStream]);

  //   Accept call
  const acceptCall = () => {
    setCallAccepted(true);
  };

  //   Deny call
  const denyCall = (reason) => {
    // Emit call denied to caller
    socketEmit("user:callDenied", {
      chatRoomId: callDetail.caller ? currentChatRoomId : callDetail.chatRoomId,
    });

    sendMessage({
      callType: mediaOptions.video ? "video" : "voice",
      callRejectReason: reason,
      sender: callDetail.caller ? userId : callDetail.callerId,
      chatRoomId: callDetail.caller ? currentChatRoomId : callDetail.chatRoomId,
    });

    // End duration
    stopCounter();
  };

  //   End call
  const endCall = () => {
    socketEmit("user:endCall", {
      duration,
      chatRoomId: callDetail.caller ? currentChatRoomId : callDetail.chatRoomId,
    });

    sendMessage({
      callType: mediaOptions.video ? "video" : "voice",
      callDuration: duration,
      sender: callDetail.caller ? userId : callDetail.callerId,
      chatRoomId: callDetail.caller ? currentChatRoomId : callDetail.chatRoomId,
    });

    // End duration
    stopCounter();
  };

  return {
    userStream,
    userMediaRef,
    partnerMediaRef,
    callStatus,
    acceptCall,
    callAccepted,
    endCall,
    denyCall,
    duration,
  };
};

export default usePeer;
