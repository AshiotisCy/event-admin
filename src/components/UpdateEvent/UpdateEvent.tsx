import { DatePicker, Input, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import cityNames from "../../enums/cityNames";
import statusTypes from "../../enums/statusTypes";
import { EventInterface } from "../../intrefaces/interfaces";
import UploadImage from "../CreateEvent/UploadImgComponent/UploadImage";
import { useResponsiveBreakPoints } from "../../hooks/responsiveHook";
import styles from "./styles.module.css";
import { style } from "@mui/system";

const UpdateEvent = (props: {
  eventProps: EventInterface | undefined;
  setPayload: (payload: EventInterface) => void;
}) => {
  const { eventProps, setPayload } = props;

  const { isExtraExtraSmall, isExtraSmall, isSmall, isMedium } =
    useResponsiveBreakPoints();
  const isMobile = isExtraExtraSmall || isExtraSmall || isSmall || isMedium;

  const { Option } = Select;

  const [eventId, setEventId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState<string | undefined>();
  const [website, setWebsite] = useState<string | undefined>();
  const [eventDate, setEventDate] = useState<any>();
  const [status, setStatus] = useState<string | undefined>();
  const [location, setLocation] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [outDate, setOutDate] = useState<any>();
  const [previousDate, setPreviousDate] = useState("")

  useEffect(() => {
    if (eventProps && Object.entries(eventProps).length > 1) {
      setEventId(eventProps.id);
      setImageUrl(eventProps?.img);
      setEventName(eventProps.eventName);
      setWebsite(eventProps.website);
      setEventDate(eventProps.date);
      setStatus(eventProps.status);
      setLocation(eventProps.location);
    }
  }, [eventProps]);

  const onDateChange = (date: any, dateString: string) => {
    setEventDate(dateString);
  };

  const getCurrentDate = moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (eventDate !== undefined) {
      setOutDate(eventDate.localeCompare(getCurrentDate));
    }
  }, [eventDate, getCurrentDate]);

  useEffect(() => {
    const constructPayload: EventInterface = {
      id: eventId,
      img: imageUrl,
      eventName: eventName,
      date: eventDate,
      website: website,
      location: location,
      status: status,
    };
    setPayload(constructPayload);
  }, [
    eventId,
    imageUrl,
    eventName,
    website,
    location,
    status,
    eventDate,
    setPayload,
  ]);

  return (
    <div
      className={!isMobile ? styles.fieldWrapper : styles.fieldWrapperMobile}
    >
      <div className={!isMobile ? styles.leftSide : styles.lefSideMobile}>
        <UploadImage
          setLoading={setLoading}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          loading={loading}
        />
      </div>
      <div className={!isMobile ? styles.rightSide : styles.rightSideMobile}>
        <div className={styles.field}>
          <Input
            value={eventName}
            placeholder="Event Name"
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <Input
            value={website}
            placeholder="Website"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className={styles.selectionPicker}>
          {eventProps?.date === eventDate ? (
            <DatePicker
              defaultValue={moment(eventProps?.date)}
              onChange={(date, stringDate) => onDateChange(date, stringDate)}
              className={styles.datePicker}
            />
          ) : null}
          <Select
            value={status}
            placeholder="Select Status"
            className={styles.selectPicker}
            onChange={(statusValue) => setStatus(statusValue)}
          >
            <Option
              disabled={outDate < 0 ? true : false}
              value={statusTypes.upComing}
            >
              Upcoming
            </Option>
            <Option
              disabled={outDate > 0 ? true : false}
              value={statusTypes.done}
            >
              Done
            </Option>
            <Option value={statusTypes.canceled}>Canceled</Option>
          </Select>
        </div>
        <div className={styles.field}>
          <Select
            value={location}
            placeholder="Select Location"
            className={styles.select}
            onChange={(location) => setLocation(location)}
          >
            <Option value={cityNames.limassol}>Limassol</Option>
            <Option value={cityNames.larnaca}>Larnaca</Option>
            <Option value={cityNames.nicosia}>Nicosia</Option>
            <Option value={cityNames.paphos}>Pafos</Option>
            <Option value={cityNames.famagusta}>Famagusta</Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
