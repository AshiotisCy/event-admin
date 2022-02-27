import { EventsInterface } from "../../intrefaces/interfaces"

const createEvent = (event: EventsInterface) => {
    return {
        type: "POST_EVENT",
        payload: event
    }
}

const updateEvent = (event: EventsInterface) => {
    return {
        type: "UPDATE_EVENT",
        payload: event
    }
}

const deleteEvent = (event: EventsInterface) => {
    return {
        type: "DELETE_EVENT",
        payload: event
    }
}


export {
    createEvent, updateEvent, deleteEvent
}