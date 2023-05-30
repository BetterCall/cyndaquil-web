import react from "react";
import { Modal } from "antd";
import { CardHeader } from "./cards";

interface IFileProps {
  url: string;
  publicLink: string;
  informations?: string;
}

export const File: React.FC<IFileProps> = ({
  url,
  publicLink,
  informations = "",
}) => {
  const [extension, setExtension] = react.useState<string>(
    url.split(".").pop() || ""
  );

  const [isOpened, setIsOpened] = react.useState(false);
  const handleCancel = () => {
    setIsOpened(false);
  };

  const imgExtensions = ["jpg", "jpeg", "png"];

  const renderPreview = () => {
    if (extension === "pdf") {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${publicLink}&embedded=true`}
          style={{ width: "100%", height: "100%" }}
          frameBorder="0"
        />
      );
    } else if (extension === "ai") {
      return <div>ai</div>;
    } else if (imgExtensions.includes(extension)) {
      return <img className="object-contain" src={publicLink} alt="file" />;
    } else {
      return <div>File not supported</div>;
    }
  };

  return (
    <>
      <div onClick={() => setIsOpened(true)}> {renderPreview()}</div>

      <Modal open={isOpened} onCancel={handleCancel} footer={null}>
        <CardHeader title={publicLink} subtitle={informations} />

        {renderPreview()}
        <div className="flex justify-center">
          <div className="w-1/4">
            <a href={publicLink} className="btn">
              Telecharger
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};
