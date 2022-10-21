import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/globals/Header";
import IconWrapper from "../components/globals/IconWrapper";
import { userProfileActions } from "../store/userProfileSlice";
import { modalActions } from "../store/modalSlice";

function UserProfile() {
  const { visible, profile } = useSelector((state) => state.userProfileReducer);
  const dispatch = useDispatch();
  return (
    <div
      className={`bg-primary duration-200 ease-in-out ${
        visible
          ? "w-[40rem] sm:w-full xl:translate-x-0"
          : "w-0 xl:w-[40rem] xl:translate-x-[50rem]"
      }  h-full shrink-0 xl:absolute xl:top-0 xl:right-0 xl:z-20 xl:shadow-lg xl:shadow-box-shadow `}
    >
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"
              className="!fill-transparent !stroke-danger"
            />
          </svg>
        </IconWrapper>
      </Header>
      {/* Avatar */}
      <div className="h-[40rem] relative">
        <img src={profile.avatar} alt="" className="w-full h-full" />
        <div className="absolute bottom-[2rem] left-[2rem]">
          <p className="text-[2rem] font-semibold text-white">
            {profile.title}
          </p>
          <p className="text-secondary-text">
            {profile.status?.online && "Online"}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="p-[1rem] overflow-y-scroll custom-scrollbar">
        {/* Phone number */}
        <div className="flex items-center gap-[3rem] hover hover:bg-secondary-light-text p-[.5rem] rounded-md ">
          {/* Phone icon */}
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
          <div className="flex flex-col">
            <span className="font-semibold">{profile.phoneNumber}</span>
            <span className="text-secondary-text">Phone</span>
          </div>
        </div>
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
