import React from "react";
import useTime from "../../../hooks/useTime";

function ContactItem({ contact }) {
  const formattedTime = useTime(contact.status.lastSeen);
  return (
    <div className="flex py-[1rem] px-[1.5rem] gap-[1rem]">
      {/* Avatar */}
      <img
        src={contact.avatar}
        alt={contact.title}
        className="w-[5rem] h-[5rem] rounded-full"
      />
      {/* Details */}
      <div className="">
        <p className="font-semibold">{contact.title}</p>
        <p className="text-secondary-text text-[1.5rem]">
          {contact.status.online ? "online" : `last seen at ${formattedTime}`}
        </p>
      </div>
    </div>
  );
}

export default ContactItem;
