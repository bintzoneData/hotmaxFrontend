import { Image } from "antd"
import ImageList from "./ImageList"

function ViewImage({imgUrl}: {imgUrl: string}) {
  return (
    <div className="flex p-[10px] gap-1">
     <section className="select-none  shadow-bsh08 w-fit h-fit px-[5px] flex flex-col gap-[10px]">
        <ImageList imgUrl={imgUrl}/>
        <ImageList imgUrl={imgUrl}/>
        <ImageList imgUrl={imgUrl}/>
        <ImageList imgUrl={imgUrl}/>
        <ImageList imgUrl={imgUrl}/>
        </section>
        <div className="max-w-[400px] ">
            <Image src={imgUrl} width={"100%"} />
        </div>
    </div>
  )
}

export default ViewImage