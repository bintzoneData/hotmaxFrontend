import { useContext } from 'react';
import BrandCard from '../../Cards/BrandCard';
import { Fsm } from '../../context/Fsm';
function TopBrands() {
  const { cardsData } = useContext(Fsm);
  const topBrands = cardsData?.data?.topBrands;

  return (
    <main className='flex mx-[10px]  flex-col gap-[10px] w-full'>
      <div className='shadow-bsh64b pb-[10px]'>
        <h1 className='text-[20px] font-bold pl-2 '>Top Brands</h1>
      </div>
      <div className='BcardGrid shadow-bsh64b py-[15px]'>
        {topBrands?.map((brand) => (
          <BrandCard
            key={brand._id}
            name={brand.name}
            imgUrl={brand.imgUrl}
            url={brand.linkUrl}
          />
        ))}
      </div>
    </main>
  );
}

export default TopBrands;
