import React from "react";
import { motion } from "framer-motion";

function SelectedContacts({ contacts, removeContact }) {
  return (
    !!contacts.length && (
      <div className="flex items-center flex-wrap gap-[.5rem]">
        {contacts.map((contact) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={contact.id}
            onClick={() => removeContact(contact.id)}
            className="flex items-center bg-secondary-light-text pr-[1.5rem] gap-[1.5rem] rounded-full cursor-default"
          >
            {/* Avatar */}
            <img
              src={contact.avatar}
              alt={contact.title}
              className="w-[3.5rem] h-[3.5rem] rounded-full"
            />
            <span className="">{contact.title}</span>
          </motion.div>
        ))}
      </div>
    )
  );
}

export default SelectedContacts;
