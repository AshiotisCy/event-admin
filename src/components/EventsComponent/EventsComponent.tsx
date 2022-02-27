import { EventInterface } from "../../intrefaces/interfaces";
import { useState } from "react";
import { Button, Modal } from "antd";
import EventDetails from "../EventDetails/EventDetails";
import Table from "../Table/Table";
import * as actions from "../../redux/actions";
import UpdateEvent from "../UpdateEvent/UpdateEvent";
import { useDispatch } from "react-redux";

const EventsComponent = (props: {
  selectedEvents: EventInterface[] | undefined;
}) => {
  const dispatch = useDispatch();
  const data = props.selectedEvents;

  const [eventProps, setEventProps] = useState<EventInterface>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [payload, setPayload] = useState<EventInterface>();

  const upcomingData: any[] = [];
  data?.map((event) => {
    upcomingData.push({
      id: event.id,
      img: event.img,
      eventName: event.eventName,
      website: event.website,
      date: event.date,
      location: event.location,
      status: event.status,
    });
  });

  const openModal = (params: EventInterface | undefined, typeOfModal: string) => {
    switch (typeOfModal) {
      case "ViewDetails":
        setIsModalVisible(true);
        break;
      case "EditDetails":
        setEditModalVisible(true);
    }
    setEventProps(params);
  };

  const handleEditModalOk = () => {
    dispatch(actions.updateEvent(payload as EventInterface));
    setEditModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditModalVisible(false);
  };

  return (
    <div>
      <Table
        tableProps={upcomingData}
        rowDataDetails={openModal}
        editTableDetails={openModal}
      />
      <Modal
        title={`${eventProps?.eventName} Event Details`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <EventDetails eventProps={eventProps} />
      </Modal>
      <Modal
        title={`${eventProps?.eventName} Event Details`}
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button key="submit" type="primary" onClick={handleEditModalOk}>
            Submit
          </Button>,
        ]}
      >
        <UpdateEvent eventProps={eventProps} setPayload={setPayload} />
      </Modal>
    </div>
  );
};

export default EventsComponent;
