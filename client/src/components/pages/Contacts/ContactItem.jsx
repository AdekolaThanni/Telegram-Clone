import React from "react";
import useTime from "../../../hooks/useTime";

function ContactItem({ contact: { name: contactName, contactDetails } }) {
  const formattedTime = useTime(contactDetails.status.lastSeen);
  return (
    <div className="flex py-[1rem] px-[1.5rem] gap-[1rem]">
      {/* Avatar */}
      <img
        src={contactDetails.avatar}
        alt={contactName}
        className="w-[5rem] h-[5rem] rounded-full"
      />
      {/* Details */}
      <div className="">
        <p className="font-semibold">{contactName}</p>
        <p className="text-secondary-text text-[1.5rem]">
          {contactDetails.status.online
            ? "online"
            : `last seen at ${formattedTime}`}
        </p>
      </div>
    </div>
  );
}

export default ContactItem;
