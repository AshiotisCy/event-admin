import { EventsInterface } from "../../intrefaces/interfaces"

const createEvent = (event: EventsInterface) => {
    return {
        type: "POST_EVENT",
        payload: event
    }
}


export {
    createEvent
}