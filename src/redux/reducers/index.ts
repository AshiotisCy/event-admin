import { combineReducers } from "redux";
import { EventInterface } from "../../intrefaces/interfaces";

const getAllEvents = (state: EventInterface[] = [], action: any) => {
  const payload = action?.payload;

  switch (action.type) {
    case "POST_EVENT":
      return [...state, payload];

    case "UPDATE_EVENT":
      const index = state.findIndex((item) => item.id === payload.id);
      state[index] = payload;
      return state;

    case "DELETE_EVENT":
      const filteredEvents = state.filter((item) => item.id !== payload.id);
      state = filteredEvents;
      return state;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  getAllEvents,
});

export default rootReducer;
