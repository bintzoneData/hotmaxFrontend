import React from 'react';
import { Divider } from 'antd';
import { FaHashtag } from 'react-icons/fa';
function AboutShow({ product }) {
  return (
    <div>
      <SectionOne details={product.details} />
      <SectionTwo about={product.about} />
    </div>
  );
}
const SectionOne = ({ details }) => {
  return (
    <section>
      <Divider orientation='left'>
        <p className='text-[18px]'>Item Details</p>
      </Divider>
      <ul>
        {details?.map((detail, index) => (
          <li key={index} className='flex  p-1 gap-1 shadow-bsh64b py-2'>
            <p className='text-[18px] text-[gray] min-w-[120px]'>
              {detail.Dname}
            </p>
            <p className='text-[18px]'>{detail.Ddesc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

const SectionTwo = ({ about }) => {
  return (
    <section>
      <Divider orientation='left'>
        <p className='text-[18px]'>About this item</p>
      </Divider>
      <main className='flex flex-col gap-2'>
        {about?.map((detail, index) => (
          <div key={index}>
            {detail.split(':').length === 2 && (
              <div className='flex gap-2'>
                <div className=''>
                  <FaHashtag className='text-[18px] text-blue-400' />
                </div>

                <p className=''>
                  <span className='font-semibold mr-1'>
                    {' '}
                    {detail.split(':')[0]}:
                  </span>
                  {detail.split(':')[1]}
                </p>
              </div>
            )}
          </div>
        ))}
      </main>
    </section>
  );
};
export default AboutShow;
