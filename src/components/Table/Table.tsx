import { EventInterface } from "../../intrefaces/interfaces";
import { TableHeaders } from "./TableHeaders";
import { Empty, Tag } from "antd";
import styles from "./styles.module.css";
import statusTypes from "../../enums/statusTypes";
import colorTypes from "../../enums/colorTypes";

const Table = (props: {
  tableProps: EventInterface[];
  rowDataDetails: (params: EventInterface) => void;
}) => {
  const Props = props.tableProps;

  return (
    <div className={styles.tableBox}>
      <div className={styles.tableHead}>
        {TableHeaders.map((head) => {
          return (
            <div className={styles.tableCell} key={head.id}>
              <p>{head.name}</p>
            </div>
          );
        })}
      </div>
      {Props.length > 0 ? (
        <>
          {Props.map((prop) => {
            return (
              <div
                className={styles.tableRow}
                onClick={() => props.rowDataDetails(prop)}
                key={prop.id}
              >
                <div className={styles.tableCell}>
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
                  {prop.status !== undefined ? (
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
                  ) : null}
                </div>
              </div>
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
