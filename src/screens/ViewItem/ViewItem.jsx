import am011 from '@/assets/AM011.jpg';
import ViewImage from './ViewImage';
import ViewDetails from './ViewDetails';
import ViewRest from './ViewRest';
export default function ViewItem() {
  return (
    <div className=' bg-white p-[10px]'>
      <section className='flex gap-3 max-mq-1000:flex-col '>
        <div className='first-letter:uppercase min-mq-1000:min-w-[350px] '>
          <ViewImage imgUrl={am011} />
        </div>
        <div className='p-[10px]'>
          <ViewDetails />
        </div>
      </section>
      <section>
        <ViewRest />
      </section>
    </div>
  );
}
