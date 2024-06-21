import { Divider } from "antd"
import { FaHashtag, } from "react-icons/fa"

function ViewRest() {
  return (
    <div className="flex flex-col gap-4">
        <SectionOne/>
        <SectionTwo/>
    </div>
  )
}


const SectionOne = () => {
    return   <section>
    <Divider orientation="left">
     <p className="text-[18px]">Item Details</p>
     </Divider>
     <ul>
         <li className="flex  p-1 gap-1 shadow-bsh64b py-2">
         <p className="text-[18px] text-[gray] min-w-[120px]">item :</p>
             <p className="text-[18px]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus itaque unde, modi dolore facilis ratione illo pariatur exercitationem dolorum dolores voluptatem eligendi ut est libero odit ducimus voluptate vitae. A!</p>
         </li>
         <li className="flex  gap-1 shadow-bsh64b py-2">
             <p className="text-[18px] text-[gray] min-w-[120px]">brand :</p>
             <p className="text-[18px]">samsung</p>
         </li>
         <li className="flex  gap-1 shadow-bsh64b py-2">
             <p className="text-[18px] text-[rgb(128,128,128)] min-w-[120px]">brand :</p>
             <p className="text-[18px]">samsung</p>
         </li>
         

        
     </ul>
    
  </section>
}

const SectionTwo = () => {
    return    <section>
    <Divider orientation="left">
 <p className="text-[18px]">About this item</p>
 </Divider>
    <main className="flex flex-col gap-2">
    <div className="flex gap-2">
    <FaHashtag className="text-[18px]"/> <p>it has a very good quality, Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione enim molestiae veritatis ad quo expedita nihil nobis! Explicabo, nihil temporibus? Dicta quo perspiciatis pariatur eligendi, debitis maiores nisi dolorum velit.</p>
 </div>
 <div className="flex gap-2">
    <FaHashtag className="text-[18px]"/> <p>it has a very good quality, Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione enim molestiae veritatis ad quo expedita nihil nobis! Explicabo, nihil temporibus? Dicta quo perspiciatis pariatur eligendi, debitis maiores nisi dolorum velit.</p>
 </div>
    </main>
    </section>
}
export default ViewRest