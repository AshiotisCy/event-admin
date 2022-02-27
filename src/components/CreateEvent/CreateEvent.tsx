import UploadImage from "./UploadImgComponent/UploadImage";
import { Input, Select, DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";
import statusTypes from "../../enums/statusTypes";
import cityNames from "../../enums/cityNames";
import { useResponsiveBreakPoints } from "../../hooks/responsiveHook";
import styles from "./styles.module.css";
import "./antdOverwrite.css";

const CreateEvent = (props: {
  setEventName: (value: string | undefined) => void;
  eventName: string | undefined;
  setLoading: (value: boolean) => void;
  loading: boolean;
  imageUrl: string;
  website: string | undefined;
  status: string | undefined;
  location: string | undefined;
  setImageUrl: (value: string) => void;
  setBeforeUrlExtension: (value: string) => void;
  onInputWebsiteChange: (value: string) => void;
  onSelectStatusChange: (value: string) => void;
  onDateChange: (date: any, value: string) => void;
  onSelectLocationChange: (value: string) => void;
}) => {
  const { Option } = Select;

  const { isExtraExtraSmall, isExtraSmall, isSmall, isMedium } =
    useResponsiveBreakPoints();
  const isMobile = isExtraExtraSmall || isExtraSmall || isSmall || isMedium;

  const getCurrentDate = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState("");

  const outDate = date.localeCompare(getCurrentDate);

  const onBeforeUrlExtensionSelect = (value: string) => {
    props.setBeforeUrlExtension(value);
  };

  const dateMethod = (date: any, stringDate: string) => {
    setDate(stringDate);
    props.onDateChange(date, stringDate);
  };

  const selectBefore = (
    <Select
      defaultValue={"http://"}
      onChange={(value) => onBeforeUrlExtensionSelect(value)}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <div className={!isMobile ? styles.fieldWrapper : styles.fieldWrapperMobile}>
      <div className={!isMobile ? styles.leftSide : styles.lefSideMobile}>
        <UploadImage
          setLoading={props.setLoading}
          setImageUrl={props.setImageUrl}
          imageUrl={props.imageUrl}
          loading={props.loading}
        />
      </div>
      <div className={!isMobile ? styles.rightSide : styles.rightSideMobile}>
        <div className={styles.field}>
          <Input
            value={props.eventName}
            placeholder="Event Name"
            onChange={(e) => props.setEventName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <Input
            value={props.website}
            addonBefore={selectBefore}
            placeholder="Website"
            onChange={(e) => props.onInputWebsiteChange(e.target.value)}
          />
        </div>
        <div className={styles.selectionPicker}>
          <DatePicker
            onChange={(date, stringDate) => dateMethod(date, stringDate)}
            className={styles.datePicker}
          />
          <Select
            value={props.status}
            placeholder="Select Status"
            className={styles.selectPicker}
            onChange={(statusValue) => props.onSelectStatusChange(statusValue)}
          >
            <Option disabled={outDate < 0 ? true : false} value={statusTypes.upComing}>
              Upcoming
            </Option>
            <Option disabled={outDate > 0 ? true : false} value={statusTypes.done}>
              Done
            </Option>
            <Option value={statusTypes.canceled}>Canceled</Option>
          </Select>
        </div>
        <div className={styles.field}>
          <Select
            value={props.location}
            placeholder="Select Location"
            className={styles.select}
            onChange={(location) => props.onSelectLocationChange(location)}
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

export default CreateEvent;
