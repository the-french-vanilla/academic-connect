import { SET_FIRST_CONTACT_ID, SET_FIRST_OTHER_CONTACT_ID, 
  GET_ALL_CONTACTS, GET_CONTACT, GET_OTHER_CONTACT_ID,
  CREATE_CONTACT_IF_NOT_EXIST } from "../actions/types";

const initialState = {
  // firstContactId: 0,
  // firstOtherContactId: 0,
  contacts: [],
  contact: null,
  contactExists: false,
  otherContactId: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FIRST_CONTACT_ID:
      return {
        ...state,
        firstContactId: action.payload,
      };

    case SET_FIRST_OTHER_CONTACT_ID:
      return {
        ...state,
        firstOtherContactId: action.payload,
      };

    case GET_ALL_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        // contact: action.payload[0]
      };

    case GET_CONTACT:
      return {
        ...state,
        contact: action.payload,
      };

    case GET_OTHER_CONTACT_ID:
      return {
        ...state,
        otherContactId: action.payload,
      };

    case CREATE_CONTACT_IF_NOT_EXIST:
      return {
        ...state,
      };

    default:
      return state;
  }
}