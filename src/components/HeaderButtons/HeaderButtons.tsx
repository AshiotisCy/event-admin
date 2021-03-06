import { useState } from "react";
import classNames from "classnames";
import btnTypes from "../../enums/btnTypes";
import { useResponsiveBreakPoints } from "../../hooks/responsiveHook";
import styles from "./styles.module.css";
import "./antdOverwrite.css";

const HeaderButtons = (props: {
  showModal: () => void;
  setTitle: (value: string) => void;
}) => {
  const { isExtraExtraSmall, isExtraSmall, isSmall } =
    useResponsiveBreakPoints();
  const isMobile = isExtraExtraSmall || isExtraSmall || isSmall;

  const [key, setKey] = useState(1);

  const onBtnClick = (value: string, key: number) => {
    props.setTitle(value);
    setKey(key);
  };

  const allEventsBtn = classNames(styles.eventBtn, {
    [styles.eventBtnActive]: key === btnTypes.activeBtn,
  });

  const upcomingEventsBtn = classNames(styles.eventBtn, {
    [styles.eventBtnActive]: key === btnTypes.upcomingBtn,
  });

  const canceledEventsBtn = classNames(styles.eventBtn, {
    [styles.eventBtnActive]: key === btnTypes.canceledBtn,
  });

  const doneEventsBtn = classNames(styles.eventBtn, {
    [styles.eventBtnActive]: key === btnTypes.doneBtn,
  });

  return (
    <>
      <div
        className={!isMobile ? styles.eventWrapper : styles.eventWrapperMobile}
      >
        <button
          className={allEventsBtn}
          onClick={() => onBtnClick("All Events", btnTypes.activeBtn)}
          key={1}
        >
          All Events
        </button>
        <button
          className={upcomingEventsBtn}
          onClick={() => onBtnClick("Upcoming Events", btnTypes.upcomingBtn)}
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
        <button
          className={doneEventsBtn}
          onClick={() => onBtnClick("Done Events", btnTypes.doneBtn)}
          key={4}
        >
          Done Events
        </button>
      </div>
      <button className={styles.createEventBtn} onClick={props.showModal}>
        Create Event
      </button>
    </>
  );
};

export default HeaderButtons;
