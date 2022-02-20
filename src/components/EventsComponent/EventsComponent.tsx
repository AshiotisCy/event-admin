
import { EventInterface } from "../../intrefaces/interfaces";
import { useState } from "react";
import { Button, Modal } from "antd";
import EventDetails from "../EventDetails/EventDetails";
import Table from "../Table/Table";

const EventsComponent = (props: {selectedEvents: EventInterface[] | undefined}) => {

  const data = props.selectedEvents

  const [eventProps, setEventProps] = useState<EventInterface>();
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const openModal = (params: EventInterface) => {
    setEventProps(params);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Table tableProps={upcomingData} rowDataDetails={openModal} />
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
    </div>
  );
};

export default EventsComponent;
