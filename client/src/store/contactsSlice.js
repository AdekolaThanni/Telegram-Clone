import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contactsSlice",
  initialState: [],
  reducers: {
    setContacts: (state, { payload: contacts }) => contacts,
    addContact: (state, { payload: contact }) => {
      state.push(contact);
    },
    removeContact: (state, { payload }) => {
      return state.filter(
        (contact) => contact.contactDetails._id !== payload.id
      );
    },
    setContactOnlineStatus: (state, { payload }) => {
      const contactIndex = state.findIndex(
        (contact) => contact.contactDetails._id === payload.id
      );

      state[contactIndex].contactDetails.status = payload.status;
    },
  },
});

export const contactsActions = contactsSlice.actions;

export default contactsSlice.reducer;
