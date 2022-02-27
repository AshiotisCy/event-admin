import { EventInterface } from "../../intrefaces/interfaces";
import { TableHeaders } from "./TableHeaders";
import { Collapse, Empty, Popconfirm, Tag } from "antd";
import { useDispatch } from "react-redux";
import statusTypes from "../../enums/statusTypes";
import colorTypes from "../../enums/colorTypes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import * as actions from "../../redux/actions";
import modalTypes from "../../enums/modalTypes";
import { useResponsiveBreakPoints } from "../../hooks/responsiveHook";
import MobileHeaders from "./MobileTable/MobileHeaders";
import MobileBody from "./MobileTable/MobileBody";
import styles from "./styles.module.css";
import "./antdOverwrite.css";

const Table = (props: {
  tableProps: EventInterface[];
  rowDataDetails: (params: EventInterface, typeOfModal: string) => void;
  editTableDetails: (params: EventInterface, typeOfModal: string) => void;
}) => {
  const dispatch = useDispatch();

  const { Panel } = Collapse;

  const { isExtraExtraSmall, isExtraSmall, isSmall, isMedium } =
    useResponsiveBreakPoints();
  const isMobile = isExtraExtraSmall || isExtraSmall || isSmall || isMedium;

  const deleteTableDetails = (params: EventInterface) => {
    dispatch(actions.deleteEvent(params));
  };

  const Props = props.tableProps;

  return (
    <div className={styles.tableBox}>
      {!isMobile ? (
        <div className={styles.tableHead}>
          {TableHeaders.map((head) => (
            <div className={styles.tableCell} key={head.id}>
              <p>{head.name}</p>
            </div>
          ))}
        </div>
      ) : null}
      {Props.length > 0 ? (
        <>
          {Props.map((prop) => {
            return (
              <>
                {!isMobile ? (
                  <div className={styles.tableRow} key={prop.id}>
                    <div
                      className={styles.tableCell}
                      onClick={() =>
                        props.rowDataDetails(prop, modalTypes.viewDetails)
                      }
                    >
                      <img
                        className={styles.tableCellImage}
                        src={prop.img}
                        alt=""
                      />
                    </div>
                    <div className={styles.tableCell}>
                      <p>{prop.eventName}</p>
                    </div>
                    <div className={styles.tableCell}>
                      <a href={prop.website} target="_blank" rel="noreferrer">
                        {prop.website}
                      </a>
                    </div>
                    <div className={styles.tableCell}>
                      <p>{prop.date}</p>
                    </div>
                    <div className={styles.tableCell}>
                      <p>{prop.location}</p>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.statusCellWrapper}>
                        {prop.status !== undefined ? (
                          <div className={styles.statusCell}>
                            <Tag
                              className={styles.antTag}
                              color={
                                prop.status === statusTypes.upComing
                                  ? colorTypes.green
                                  : prop.status === statusTypes.canceled
                                  ? colorTypes.red
                                  : colorTypes.blue
                              }
                            >
                              {prop.status}
                            </Tag>
                          </div>
                        ) : null}
                        <div className={styles.buttonsWrapper}>
                          <Popconfirm
                            title="Are you sure you want to delete this event?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => deleteTableDetails(prop)}
                          >
                            <div className={styles.deleteBtn}>
                              <DeleteOutlined
                                style={{ fontSize: "20px", color: "#dd5d22" }}
                              />
                            </div>
                          </Popconfirm>
                          <div
                            className={styles.editBtn}
                            onClick={() =>
                              props.editTableDetails(
                                prop,
                                modalTypes.editDetails
                              )
                            }
                          >
                            <EditOutlined
                              style={{ fontSize: "20px", color: "#8665f7" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Collapse key={prop.id}>
                    <Panel header={MobileHeaders(prop)} key={prop.id}>
                      <MobileBody
                        eventProps={prop}
                        editTableDetails={props.editTableDetails}
                        key={prop.id}
                      />
                    </Panel>
                  </Collapse>
                )}
              </>
            );
          })}
        </>
      ) : (
        <div className={styles.tableRow}>
          <div className={styles.tableCell}>
            <Empty />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
