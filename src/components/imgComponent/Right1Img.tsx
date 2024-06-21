import { Image } from "antd";

const Right1Img = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <div className="m-[10px]">
      <Image
        className="cursor-pointer"
        alt="example"
        src={imgUrl}
        preview={false}
      />
    </div>
  );
};

export default Right1Img;
