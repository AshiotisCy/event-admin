import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateEvent from "../CreateEvent/CreateEvent";
import { Modal } from "antd";
import { DefaultState, EventInterface } from "../../intrefaces/interfaces";
import { v4 as uuid } from "uuid";
import * as actions from "../../redux/actions";
import { TableMockData } from "../MockData/MockData";
import EventsComponent from "../EventsComponent/EventsComponent";
import HeaderButtons from "../HeaderButtons/HeaderButtons";
import Moment from "react-moment";
import styles from './styles.module.css'

const MainPage = () => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState<string | undefined>();
  const [date, setDate] = useState<string | undefined>();
  const [beforeUrlExtension, setBeforeUrlExtension] = useState("");
  const [website, setWebsite] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [location, setLocation] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("All Events");
  const [selectedEvents, setSelectedEvents] = useState<EventInterface[]>();

  const data = useSelector((state: DefaultState) => state.getAllEvents);

  useEffect(() => {
    if (data.length === 0) {
      TableMockData.map((mockData) => {
        dispatch(actions.createEvent(mockData as never));
      });
    }
  }, [data.length, dispatch]);

  useEffect(() => {
    switch (title) {
      case "Upcoming Events":
        setSelectedEvents(data.filter((event) => event.status === "Upcoming"));
        break;
      case "Canceled Events":
        setSelectedEvents(data.filter((event) => event.status === "Canceled"));
        break;
      default:
        setSelectedEvents(data);
    }
  }, [data, title]);

  const showModal = () => {
    setIsModalVisible(true);
    setImageUrl("");
    setEventName(undefined);
    setWebsite(undefined);
    setStatus(undefined);
    setLocation(undefined);
    setDate(undefined);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    const payload: EventInterface = {
      id: uuid(),
      img: imageUrl,
      eventName: eventName,
      date: date,
      website: website,
      location: location,
      status: status,
    };
    dispatch(actions.createEvent(payload as never));
    setIsModalVisible(false);
  };

  const onInputWebsiteChange = (value: string) => {
    setWebsite(`${beforeUrlExtension + value}`);
  };

  const onSelectStatusChange = (value: string) => {
    setStatus(value);
  };

  const onDateChange = (date: Moment, dateString: string) => {
    setDate(dateString);
  };

  const onSelectLocationChange = (value: string) => {
    setLocation(value);
  };

  return (
    <div>
      <div className={styles.mainHeaderWrapper}>
        <HeaderButtons showModal={showModal} setTitle={setTitle} />
      </div>
      <div className={styles.title}>{title}</div>
      <EventsComponent selectedEvents={selectedEvents} />
      <Modal
        title="Create Event"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        <CreateEvent
          setEventName={setEventName}
          eventName={eventName}
          setLoading={setLoading}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          loading={loading}
          website={website}
          status={status}
          location={location}
          setBeforeUrlExtension={setBeforeUrlExtension}
          onInputWebsiteChange={onInputWebsiteChange}
          onSelectStatusChange={onSelectStatusChange}
          onDateChange={onDateChange}
          onSelectLocationChange={onSelectLocationChange}
        />
      </Modal>
    </div>
  );
};

export default MainPage;
