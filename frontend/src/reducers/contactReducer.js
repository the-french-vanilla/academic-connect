import { SET_FIRST_CONTACT_ID, SET_FIRST_OTHER_CONTACT_ID, GET_ALL_CONTACTS } from "../actions/types";

const initialState = {
  firstContactId: 0,
  firstOtherContactId: 0,
  contacts: [],
  contact: {}
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
        contact: action.payload[0]
      };

    default:
      return state;
  }
}