import { Tag } from "antd";
import colorTypes from "../../../enums/colorTypes";
import statusTypes from "../../../enums/statusTypes";
import { EventInterface } from "../../../intrefaces/interfaces";
import styles from "./styles.module.css";

const MobileHeaders = (eventProps: EventInterface) => {
  return (
    <div className={styles.collapseHeaderWrapper}>
      <div className={styles.eventName}>{eventProps.eventName}</div>
      <div className={styles.date}>{eventProps.date}</div>
      <Tag
        className={styles.antTag}
        color={
          eventProps.status === statusTypes.upComing
            ? colorTypes.green
            : eventProps.status === statusTypes.canceled
            ? colorTypes.red
            : colorTypes.blue
        }
      >
        {eventProps.status}
      </Tag>
    </div>
  );
};

export default MobileHeaders;
