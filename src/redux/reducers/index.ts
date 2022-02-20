import { combineReducers } from "redux";

const getAllEvents = (state= [], action: any) => {
    const payload = action?.payload
    switch (action.type) {
        case "POST_EVENT":
            return [
                ...state,
                payload
            ]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    getAllEvents,
})

export default rootReducer