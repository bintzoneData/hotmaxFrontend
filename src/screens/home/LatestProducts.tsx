import ProductCard from "@/Cards/ProductCard"
import AM011 from "@/assets/AM011.jpg"
function LatestProducts() {
  return (
    <main className="flex mx-[10px]  flex-col gap-[10px] w-full">
    <div className="shadow-bsh64b pb-[10px]">
      <h1 className="text-[20px] font-bold pl-2 capitalize ">Latest Products</h1>
    </div>
    <div className="BcardGrid  py-[15px]" >
        <ProductCard imgUrl={AM011}/>
        <ProductCard imgUrl={AM011}/>
        <ProductCard imgUrl={AM011}/>
        <ProductCard imgUrl={AM011}/>
        <ProductCard imgUrl={AM011}/>
        <ProductCard imgUrl={AM011}/>
        <ProductCard imgUrl={AM011}/>
    </div>

    </main>
  )
}


export default LatestProducts