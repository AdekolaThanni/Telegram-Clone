import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/globals/Header";
import IconWrapper from "../components/globals/IconWrapper";
import { userProfileActions } from "../store/userProfileSlice";
import { modalActions } from "../store/modalSlice";
import useTime from "../hooks/useTime";
import Image from "../components/globals/Image";

function UserProfile() {
  const { visible, profile } = useSelector((state) => state.userProfileReducer);
  const dispatch = useDispatch();
  const lastSeenTime = useTime(profile?.status?.lastSeen);

  return (
    <div
      className={`bg-primary duration-200 ease-in-out ${
        visible
          ? "w-[40rem] sm:w-full xl:translate-x-0"
          : "w-0 xl:w-[40rem] xl:translate-x-[50rem]"
      }  h-full shrink-0 xl:absolute xl:top-0 xl:right-0 xl:z-20 xl:shadow-lg xl:shadow-box-shadow `}
    >
      {/* Header bar */}
      <Header className="flex items-center px-[1rem]">
        <IconWrapper
          onClick={() => dispatch(userProfileActions.hideProfile())}
          className=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
            className=""
          >
            <path
              fill="currentColor"
              d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
              strokeWidth={1}
              className="fill-secondary-text stroke-secondary-text"
            />
          </svg>
        </IconWrapper>
        <h2 className="text-[2rem] font-semibold ml-[2rem] mr-auto">Profile</h2>
        {profile.name && (
          <IconWrapper
            onClick={() =>
              dispatch(
                modalActions.openModal({
                  type: "deleteContactModal",
                  payload: { profile },
                })
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
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"
                className="!fill-transparent !stroke-danger"
              />
            </svg>
          </IconWrapper>
        )}
      </Header>

      {/* Avatar */}
      <div className="h-[40rem] relative">
        <Image
          src={profile.avatar}
          alt={profile.name || profile.username}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-[2rem] left-[2rem]">
          <p className="text-[2rem] font-semibold text-white">
            {profile.name || profile.username}
          </p>
          <p className="text-secondary-text">
            {profile.status?.online ? "Online" : `last seen at ${lastSeenTime}`}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="p-[1rem] overflow-y-scroll custom-scrollbar">
        {/* Username */}
        <div className="flex items-center gap-[3rem] hover hover:bg-secondary-light-text p-[.5rem] rounded-md ">
          {/* At icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="stroke-secondary-text"
            >
              <path d="M10.25 8c0 3.25 4 3.25 4 0A6.25 6.25 0 1 0 8 14.25c2.25 0 3.25-1 3.25-1" />
              <circle cx="8" cy="8" r="2.25" />
            </g>
          </svg>
          <div className="flex flex-col">
            <span className="font-semibold">{profile.username}</span>
            <span className="text-secondary-text">Username</span>
          </div>
        </div>
        {/* Bio */}
        {profile.bio && (
          <div className="flex items-center gap-[3rem] hover hover:bg-secondary-light-text p-[.5rem] rounded-md ">
            {/* Info icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
              className="shrink-0"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="stroke-secondary-text"
              >
                <path d="M16 14v9m0-15v2" />
                <circle cx="16" cy="16" r="14" />
              </g>
            </svg>
            <div className="flex flex-col flex-grow">
              <p className="font-semibold break-words pr-[2rem]">
                {profile.bio}
              </p>
              <span className="text-secondary-text">Bio</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
