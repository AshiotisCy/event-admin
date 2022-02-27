import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import './antdOverwrite.css'
import { useResponsiveBreakPoints } from "../../../hooks/responsiveHook";

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadImage = (props: {setLoading: (value: boolean) => void, imageUrl:string, setImageUrl: (value: string) => void, loading: boolean}) => {

  
  const { isExtraExtraSmall, isExtraSmall, isSmall, isMedium } =
    useResponsiveBreakPoints();
  const isMobile = isExtraExtraSmall || isExtraSmall || isSmall || isMedium;

  const handleChange = (info: {
    file: { status: string; originFileObj: any };
  }) => {
    if (info.file.status === "uploading") {
      props.setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        props.setLoading(false);
        props.setImageUrl(imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      {props.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={isMobile ? "mobileAvatar" : "" }
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {props.imageUrl ? (
        <img className="avatar-image" src={props.imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;
