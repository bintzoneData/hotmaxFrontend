import { Rating } from "@mui/material"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import { FaShareAlt } from "react-icons/fa";


function ViewDetails() {
  return (
    <div>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <section className="flex pb-3 flex-col gap-1">
            </section>
    </div>
  )
}

const SectionOne = () =>{
    return (
        <section className="flex shadow-bsh64b pb-3 flex-col gap-1">
        <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum deleniti, odit quas praesentium blanditiis veritatis. Ducimus distinctio sapiente beatae repellendus autem, totam sed exercitationem inventore, similique officiis itaque. Dolorem, modi!</h1>
        <Link className="text-[blue] underline" to='/'><small>View more like this</small></Link>
        <div className="flex gap-[10px] items-center">
        <Rating style={{fontSize: 18 }} className="shadow-bsh64r pr-2" />
        <div className="shadow-bsh64r pr-2">
            2 years warranty
        </div>
        <div className="">
           <span className="text-[gray]">brand</span>: samsung
        </div>
        </div>
        
      </section> 
    )
}
const SectionTwo = () =>{
    return      <section className="flex mt-2 shadow-bsh64b pb-3 flex-col gap-1">
    <div className="leading-[1.1rem]">
    <h1 className="text-[20px]">
       <span className="bg-[red] px-[10px] py-[1px] text-white mr-2 text-[17px]">-33%</span>
    <span className="font-bold">36,000</span>
       <small className="text-[gray] ml-[1px] text-[10px]">ksh</small>
     </h1>  
     <p className="text-[gray] pl-2 text-[10px]">
       was <del>36,000</del>
     </p>
     
    </div>
    <h2 className="text-[gray] h-[20px] first-letter:uppercase ">
       # return available in 7 days
       </h2>
   </section>
}

const SectionThree = () =>{
    return    <section className="flex pb-3 flex-col gap-2 pt-2">
    <h1 className="text-[15px]"><span className="text-[gray]">color</span>: black</h1>
    <div className="flex gap-2">
    <div className={ `bg-[green] h-[30px] w-[40px] shadow-bsh08`}/>           
    <div className={ `bg-[black] h-[30px] w-[40px] shadow-bsh08`}/> 
    <div className={ `bg-[yellow] h-[30px] w-[40px] shadow-bsh08`}/> 
    <div className={ `bg-[red] h-[30px] w-[40px] shadow-bsh08`}/> 
    </div>
   <div className="mt-[10px] flex md gap-1 max-mq-450:flex-col max-mq-450:gap-3">
   <Button variant="contained" color="primary" >add to cart</Button>
    
    <div className="flex gap-2 ">
   <Button variant="outlined" className="max-mq-450:flex-1" color="primary" >request assistance</Button>
   <Button variant="outlined" color="primary" >
    <FaShareAlt/>
   </Button>
   </div>
   </div>
    
    </section>
}

export default ViewDetails