import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Result, Select, message } from 'antd';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ProductCard from '@/Cards/ProductCard';
import { Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Fsm } from '../../context/Fsm';
import MainSpinner from '../../assets/spinners/MainSpinner';
import { useFetch } from '../../hooks/useFetchHook';
import { useFechItems } from '../../hooks/useFsmState';
import { ImageSrc, filterTypes } from '../../utilts/SimpleFunction';
import { useSearchParams } from 'react-router-dom';
const optionPrices = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: '5000',
    label: '< 5,000',
  },
  {
    value: '10000',
    label: '< 10,000',
  },
  {
    value: '20000',
    label: '< 20,000',
  },
  {
    value: '29999',
    label: '< 29,999',
  },
  {
    value: '30000',
    label: '> 30,000',
  },
];
export default function SelectedHome() {
  const navigate = useNavigate();
  const { fetchData } = useFetch();
  const [loading, setLoading] = useState(false);
  const { fetchFsm } = useFechItems();
  const location = useLocation();
  const [errorPage, setErrorPage] = useState({ isError: false, type: null });
  const [filter, setFilter] = useState([]);
  const [filterForm, setFilterForm] = useState({
    filterType: 'all',
    filterPrice: 'all',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterError, setFilterError] = useState(null);
  const { filterPrice, filterType } = filterForm;
  const { mainDetails, itemsData } = useContext(Fsm);
  const brands = mainDetails.data?.brands;
  const categories = mainDetails.data?.categories;
  const items = itemsData.data;
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFilteredProducts] = useState(products || []);
  const params = useParams();
  const findType = (find) => {
    let text = null;
    brands.map((brand) => {
      if (brand.name === find) {
        text = 'brand';
      }
    });
    if (!text) {
      categories.map((category) => {
        if (category.name === find) {
          text = 'category';
        }
      });
    }

    return text;
  };
  const updateQueryParams = ({ type, price }) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (type === 'all') {
      updatedParams.delete('brand');
      updatedParams.delete('category');
    } else {
      const typeCategory = findType(params.type.trim().replace(/\s+/g, ''));
      if (typeCategory === 'category') {
        updatedParams.set('brand', type);
      } else if (typeCategory === 'brand') {
        updatedParams.set('category', type);
      }
    }

    if (price === 'all') {
      updatedParams.delete('price');
    } else {
      updatedParams.set('price', price);
    }

    setSearchParams(updatedParams.toString());
  };
  function parseQueryParams(location) {
    const searchParams = new URLSearchParams(location.search);
    const queryParamsArray = [];

    for (const [key, value] of searchParams.entries()) {
      queryParamsArray.push({ [key]: value });
    }

    return queryParamsArray;
  }
  function filterProducts(products, criteria) {
    return products.filter((product) => {
      let brandMatch = true;
      let priceMatch = true;
      let categoryMatch = true;

      const brandCriteria = criteria.find((c) => c.brand);
      const priceCriteria = criteria.find((c) => c.price);
      const categoryCriteria = criteria.find((c) => c.category);

      if (brandCriteria) {
        brandMatch =
          product.brand.toLowerCase() === brandCriteria.brand.toLowerCase();
      }

      if (categoryCriteria) {
        categoryMatch =
          product.category.toLowerCase() ===
          categoryCriteria.category.toLowerCase();
      }
      if (priceCriteria) {
        if (parseFloat(priceCriteria.price) < 30000) {
          priceMatch = product.price <= parseFloat(priceCriteria.price);
        } else {
          priceMatch = product.price >= parseFloat(priceCriteria.price);
        }
      }

      return brandMatch && categoryMatch && priceMatch;
    });
  }
  useLayoutEffect(() => {
    const type = findType(params.type.trim().replace(/\s+/g, ''));

    if (!type) {
      setErrorPage({
        isError: true,
        type: {
          code: 404,
          message: 'page you are looking for does not exist',
        },
      });
      return;
    }
    if (type === 'brand') {
      setFilter(categories.map((item) => item.name));
    } else if (type === 'category') {
      setFilter(brands.map((item) => item.name));
    }
    if (!itemsData.isFetched) {
      const getData = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams(location.search);
        queryParams.set(type, params.type);

        const res = await fetchData(`/all/getItems?${queryParams.toString()}`);
        fetchFsm(false);
        if (!res.ok) {
          setErrorPage({
            isError: true,
            type: {
              code: 500,
              message: 'server error or something went wrong',
            },
          });
          setLoading(false);
          return;
        }
        if (res.data.length < 1) {
          setErrorPage({
            isError: true,
            type: {
              code: 400,
              message: 'No products found matched your search',
            },
          });
          setLoading(false);
          return;
        }
        const datas = res.data;
        for (const data of datas) {
          data.imgUrl = await ImageSrc(data.imgUrl);
        }
        setFilteredProducts(datas);
        setLoading(false);
      };
      getData();
    } else {
      let datas = [];
      if (type === 'brand') {
        datas = items.filter((item) => item.brand === params.type);
      }
      if (type === 'category') {
        datas = items.filter((item) => item.category === params.type);
      }

      const filtred = filterProducts(datas, parseQueryParams(location));
      setFilteredProducts(filtred);
    }
  }, [params, location, filterPrice, filterType]);
  useEffect(() => {
    const type = findType(params.type.trim().replace(/\s+/g, ''));
    const queryParams = parseQueryParams(location);
    let price = 'all';
    let fType = 'all';

    queryParams.forEach((param) => {
      if (param.price) {
        price = param.price;
      }
      if (param.category) {
        fType = param.category;
      }
      if (param.brand) {
        fType = param.brand;
      }
      setFilterForm({ filterType: fType, filterPrice: price });
    });
  }, []);
  if (loading) {
    return <MainSpinner />;
  }
  if (errorPage.isError && errorPage.type.code !== 400) {
    return (
      <Result
        status={errorPage.type.code}
        title={
          <p className='text-[18px] text-[gray] capitalize'>
            {errorPage.type.message}
          </p>
        }
        extra={
          <Button
            onClick={() => {
              errorPage.type.code === 404
                ? navigate('/')
                : window.location.reload();
            }}
            variant='contained'
            type='primary'
          >
            {errorPage.type.code === 404 ? 'go home' : 'refresh page'}
          </Button>
        }
      />
    );
  }

  return (
    <div className='p-[10px]  bg-white'>
      <header className=' gap-[5px] mb-4 '>
        <Breadcrumbs
          aria-label='breadcrumb'
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
        ></Breadcrumbs>
        {/* {selected.desc && (
          <div className='mt-[10px]  pb-[10px] shadow-bsh64b'>
            <label className='font-bold'>description</label>
            <p>{selected.desc}</p>
          </div>
        )} */}
      </header>
      <main className='py-[10px] bg-[#f5f5f5] px-[10px] mx-[-10px]'>
        <header className='flex gap-[10px] justify-between  pb-[10px]'>
          <div className='flex  flex-col gap-[5px]'>
            <p className='capitalize'>
              Filter by{' '}
              {findType(params.type.trim().replace(/\s+/g, '')) !== 'category'
                ? 'category'
                : 'brand'}
            </p>
            <Select
              className='text-center max-w-[200px] min-w-[130px]  capitalize'
              onChange={(value) => {
                setFilterForm((prev) => ({ ...prev, filterType: value }));
                updateQueryParams({
                  type: value,
                  price: filterForm.filterPrice,
                });
              }}
              value={filterType}
              placeholder='Select an option' // Placeholder added here
            >
              <Select.Option value={'all'}>all</Select.Option>
              {filter.map((d, index) => (
                <Select.Option key={index} value={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className='flex  flex-col gap-[5px]'>
            <p className='capitalize'>price filter</p>
            <Select
              className='text-center max-w-[200px] min-w-[130px] capitalize'
              onChange={(value) => {
                setFilterForm((prev) => ({ ...prev, filterPrice: value }));
                updateQueryParams({
                  type: filterForm.filterType,
                  price: value,
                });
              }}
              value={filterPrice}
              placeholder='Select an option' // Placeholder added here
            >
              {optionPrices.map((d, index) => (
                <Select.Option key={index} value={d.value}>
                  {d.label}
                </Select.Option>
              ))}
            </Select>
          </div>
        </header>
      </main>
      {filtredProducts.length < 1 ? (
        <>
          <Result
            status={'404'}
            title={
              <p className='text-[18px] text-[gray] capitalize'>
                {'No products found matched your search'}{' '}
                <span
                  onClick={() => {
                    setSearchParams({});
                    setFilterForm({ filterType: 'all', filterPrice: 'all' });
                  }}
                  className='underline text-[blue] cursor-pointer'
                >
                  reset
                </span>
              </p>
            }
          />
        </>
      ) : (
        <div className='parentGrid  py-[15px]'>
          {filtredProducts?.map((d) => (
            <section key={d._id} className='parentCard '>
              <ProductCard
                imgUrl={d.imgUrl}
                rating={4.5}
                price={d.price}
                offer={d.offer}
                name={d.name}
                desc={d.desc.substring(0, 100)}
              />
            </section>
          ))}
          {filtredProducts.length < 4 && (
            <>
              <section className='parentCard '></section>
              <section className='parentCard '></section>
              <section className='parentCard '></section>
            </>
          )}
          {/* <ProductCard imgUrl={AM011} rating={4.5} price, offer, name /> */}
          {/* <ProductCard imgUrl={AM011} />
                <ProductCard imgUrl={AM011} />
                <ProductCard imgUrl={AM011} />
                <ProductCard imgUrl={AM011} />
                <ProductCard imgUrl={AM011} />
                <ProductCard imgUrl={AM011} /> */}
        </div>
      )}
    </div>
  );
}
