import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Tag } from "antd";
import { useDispatch } from "react-redux";
import colorTypes from "../../../enums/colorTypes";
import modalTypes from "../../../enums/modalTypes";
import { EventInterface } from "../../../intrefaces/interfaces";
import * as actions from "../../../redux/actions";
import styles from "./styles.module.css";

const MobileBody = (props: {
  eventProps: EventInterface;
  editTableDetails: (params: EventInterface, typeOfModal: string) => void;
}) => {
  const { img, eventName, website, date, location } = props.eventProps;

  const dispatch = useDispatch();

  const deleteTableDetails = (params: EventInterface) => {
    dispatch(actions.deleteEvent(params));
  };

  return (
    <div className={styles.mobileBodyWrapper}>
      <div className={styles.mobileWrapperInformation}>
        <div className={styles.mobileImageWrapper}>
          <img className={styles.tableCellImage} src={img} alt="" />
        </div>
        <div>{eventName}</div>
        <div>
          <a href={website}>{website}</a>
        </div>
        <div>{date}</div>
        <div>{location}</div>
      </div>
      <div className={styles.mobileBtnWrapper}>
        <Tag
          className={styles.antButtonTag}
          color={colorTypes.green}
          onClick={() => {
            props.editTableDetails(props.eventProps, modalTypes.editDetails);
          }}
        >
          <EditOutlined style={{ fontSize: "20px", color: "#389e0d" }} />
        </Tag>
        <Popconfirm
          title="Are you sure you want to delete this event?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteTableDetails(props.eventProps)}
        >
          <Tag
            className={styles.antButtonTag}
            color={colorTypes.red}
          >
            <DeleteOutlined style={{ fontSize: "20px", color: "#dd5d22" }} />
          </Tag>
        </Popconfirm>
      </div>
    </div>
  );
};

export default MobileBody;
