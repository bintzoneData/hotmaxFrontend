import P1Slider from '@/assets/swiper/P1Slider';
import { Fsm } from '../../../context/Fsm';
import { useContext } from 'react';
function SlideCards() {
  const { cardsData } = useContext(Fsm);
  const slideCards = cardsData?.data?.slideCards;

  return (
    <div className='select-none  flex h-[180px]'>
      <P1Slider data={slideCards} />
    </div>
  );
}

export default SlideCards;
