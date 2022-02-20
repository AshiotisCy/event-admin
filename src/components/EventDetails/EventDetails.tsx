import { Tag } from "antd";
import { useEffect, useState } from "react";
import { EventInterface, LocationInterface } from "../../intrefaces/interfaces";
import { getWeather } from "../../apiCalls/api";
import { noImageDetected } from "../../icons";
import { LocationData } from "../MockData/MockData";
import WeatherComponent from "../WeatherComponent/WeatherComponent";
import colorTypes from "../../enums/colorTypes";
import statusTypes from "../../enums/statusTypes";
import styles from './styles.module.css'
import "./antdOverwrite.css";

const EventDetails = (props: { eventProps: EventInterface | undefined }) => {
  const eventLogo = props.eventProps?.img;
  const eventName = props.eventProps?.eventName;
  const eventWebsite = props.eventProps?.website;
  const eventDate = props.eventProps?.date;
  const eventLocation = props.eventProps?.location;
  const eventStatus = props.eventProps?.status;

  const [coordinates, setCoordinates] = useState<LocationInterface>();
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    LocationData.filter((location) => {
      if (location.value === eventLocation) {
        setCoordinates(location);
      }
    });
  }, [eventLocation]);

  useEffect(() => {
    if (coordinates !== undefined && eventDate !== undefined) {
      getWeather(coordinates!.latitude, coordinates!.longitude, eventDate).then(
        (response) => {
          setWeatherData(response.data);
        }
      );
    }
  }, [coordinates, eventDate]);

  return (
    <>
      <div className={styles.eventDetails}>
        <div className={styles.leftSide}>
          <img className={styles.eventLogo} src={eventLogo !== "" ? eventLogo : noImageDetected} alt=""/>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.eventWrapper}>
            <div className={styles.eventHeader}>Event Name:</div>
            <div>{eventName}</div>
          </div>
          <div className={styles.eventWrapper}>
            <div className={styles.eventHeader}>Website:</div>
            <div>{eventWebsite}</div>
          </div>
          <div className={styles.eventWrapper}>
            <div className={styles.eventHeader}>Date:</div>
            <div>{eventDate}</div>
          </div>
          <div className={styles.eventWrapper}>
            <div className={styles.eventHeader}>Location:</div>
            <div>{eventLocation}</div>
          </div>
          <div className={styles.eventWrapper}>
            <div className={styles.eventHeader}>Status:</div>
            <div className={styles.tagEvent}>
              <Tag
                color={
                  eventStatus === statusTypes.upComing
                    ? colorTypes.green
                    : eventStatus === statusTypes.canceled
                    ? colorTypes.red
                    : colorTypes.blue
                }
              >
                {eventStatus}
              </Tag>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.eventLine} />
      {weatherData !== undefined ? (
        <WeatherComponent WeatherData={weatherData} />
      ) : null}
    </>
  );
};

export default EventDetails;
