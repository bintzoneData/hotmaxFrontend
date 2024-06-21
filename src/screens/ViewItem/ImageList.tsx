import { Image } from "antd"

function ImageList({imgUrl}: {imgUrl: string}) {
  return (
    
            <div className="w-[40px]  shadow-bsh64b cursor-pointer last:shadow-none ">
            <Image src={imgUrl} preview={false} width={"100%"} />
            </div>
           
        
  )
}

export default ImageList