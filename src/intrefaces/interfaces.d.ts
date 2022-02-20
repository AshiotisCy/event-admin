interface LocationInterface {
  value: string;
  longitude: number;
  latitude: number;
}

interface EventInterface {
  id: string;
  img: string;
  eventName: string | undefined;
  date: string | undefined;
  website: string | undefined;
  location: string | undefined;
  status: string | undefined;
}

interface DefaultState extends DefaultRootState {
  getAllEvents: EventInterface[];
  getCanceledEvents: EventInterface[];
  getUpcomingEvents: EventInterface[];
}

export { EventInterface, EventsInterface, DefaultState, LocationInterface };
