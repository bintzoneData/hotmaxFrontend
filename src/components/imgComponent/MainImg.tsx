import { Image } from "antd";

const MainImg = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <div className="m-[10px] max-w-[900px]">
      <Image
        className="cursor-pointer"
        alt="example"
        src={imgUrl}
        preview={false}
      />
    </div>
  );
};

export default MainImg;
