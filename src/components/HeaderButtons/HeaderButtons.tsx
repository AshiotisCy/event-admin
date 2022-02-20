import { useState } from "react";
import styles from './styles.module.css'
import  classNames from "classnames";
import btnTypes from "../../enums/btnTypes";

const HeaderButtons = (props: {
  showModal: () => void;
  setTitle: (value: string) => void;
}) => {
  const [key, setKey] = useState(1);

  const onBtnClick = (value: string, key: number) => {
    props.setTitle(value);
    switch (key) {
      case 1:
        setKey(1);
        break;
      case 2:
        setKey(2);
        break;
      case 3:
        setKey(3);
        break;
      default:
        setKey(btnTypes.activeBtn);
    }
  };

  const allEventsBtn = classNames(styles.eventBtn,{
    [styles.eventBtnActive]: key === btnTypes.activeBtn
  })

  const upcomingEventsBtn = classNames(styles.eventBtn,{
    [styles.eventBtnActive]: key === btnTypes.doneBtn
  })

  const canceledEventsBtn = classNames(styles.eventBtn,{
    [styles.eventBtnActive]: key === btnTypes.canceledBtn
  })

  return (
    <>
      <div className={styles.eventWrapper}>
        <button
          className={allEventsBtn}
          onClick={() => onBtnClick("All Events", btnTypes.activeBtn)}
          key={1}
        >
          All Events
        </button>
        <button
          className={upcomingEventsBtn}
          onClick={() => onBtnClick("Upcoming Events", btnTypes.doneBtn)}
          key={2}
        >
          Upcoming Events
        </button>
        <button
          className={canceledEventsBtn}
          onClick={() => onBtnClick("Canceled Events", btnTypes.canceledBtn)}
          key={3}
        >
          Canceled Events
        </button>
      </div>
      <button className={styles.createEventBtn} onClick={props.showModal}>
        Create Event
      </button>
    </>
  );
};

export default HeaderButtons;
