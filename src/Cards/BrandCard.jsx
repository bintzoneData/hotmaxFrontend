import { Image, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { AppTimeStamp, DomainApi } from '@/App.jsx';
import ImgSpin from '../shared/ImgSpin';

export default function BrandCard({ imgUrl, name, url }) {
  return (
    <Link
      to={`/products` + url}
      className='shadow-bsh33 w-[100%]  cursor-pointer min-mq-450:hover:opacity-60 h-[250px]  max-mq-450:h-[250px] flex flex-col items-center gap-[5px] overflow-hidden pt-[5px] relative rounded-md bg-[white] '
    >
      {/* logo */}
      <div className='h-[30px] min-w-[100px] capitalize text-2xl  flex items-center justify-center'>
        {name}
      </div>
      {/* image */}
      <div className='flex-1 w-[200px] h-[100px]  flex items-center justify-center '>
        <Image
          // src={
          //   imgUrl.startsWith('http')
          //     ? imgUrl
          //     : `${DomainApi}${imgUrl}?v=${AppTimeStamp}`
          // }
          src={imgUrl && URL.createObjectURL(imgUrl)}
          width={'80%'}
          preview={false}
          placeholder={<ImgSpin />}
        />
      </div>
      <footer className='flex justify-center absolute bottom-0'>
        <div className='bg-[#5ad0ee] rounded-t-[5px] text-white px-[10px] text-[18px] py-[5px]'>
          view more
        </div>
      </footer>
      <footer className='flex justify-center '>
        <div className='bg-[#5ad0ee] rounded-t-[5px] text-white px-[10px] text-[18px] py-[5px] invisible'>
          qw
        </div>
      </footer>
    </Link>
  );
}
