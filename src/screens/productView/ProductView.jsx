import React, { useContext, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetchHook';
import { Result } from 'antd';
import { Breadcrumbs, Button } from '@mui/material';
import ProductCard from '@/Cards/ProductCard';
import OneProduct from './OneProduct';
import { Fsm } from '../../context/Fsm';
import { useFechItems } from '../../hooks/useFsmState';
import { ImageSrc } from '../../utilts/SimpleFunction';
import MainSpinner from '../../assets/spinners/MainSpinner';
function ProductView() {
  const { mainDetails, itemsData } = useContext(Fsm);
  const brands = mainDetails.data?.brands;
  const [loading, setLoading] = useState(false);
  const { fetchData } = useFetch();
  const { fetchCards } = useFechItems();
  const categories = mainDetails.data?.categories;
  const items = itemsData.data;
  const [products, setProducts] = useState([]);
  const [errorPage, setErrorPage] = useState({ isError: false, type: null });
  const params = useParams();
  const navigate = useNavigate();
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
    let normalizedParams = params.name.replace(/-/g, ' ').toLowerCase();

    if (!itemsData.isFetched) {
      const getData = async () => {
        setLoading(true);
        const res = await fetchData(
          `/all/getItems?${type}=${params.type}&name=${normalizedParams}`
        );
        fetchCards(false);
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
              code: 404,
              message: 'page you are looking for does not exist',
            },
          });
          setLoading(false);
          return;
        }
        setLoading(false);
        const datas = res.data;
        for (const data of datas) {
          data.imgUrl = await ImageSrc(data.imgUrl);
        }
        setProducts(datas);
      };
      getData();
    } else {
      const filtred = filterItemsByName(items, normalizedParams);
      if (filtred.length < 1) {
        setErrorPage({
          isError: true,
          type: {
            code: 404,
            message: 'page you are looking for does not exist',
          },
        });
        return;
      }
      setProducts(filtred);
    }
  }, [params]);
  if (loading) {
    return <MainSpinner />;
  }
  if (errorPage.isError) {
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
    <>
      {products.length === 1 ? (
        <OneProduct product={products[0]} />
      ) : (
        <div className='p-[10px]  bg-white'>
          <div className='parentGrid  py-[15px]'>
            {products?.map((d) => (
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
            {products.length < 4 && (
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
        </div>
      )}
    </>
  );
}
const filterItemsByName = (items, query) => {
  // Remove double quotes from the query
  const name = query.replace(/"/g, '');

  // Split the cleaned query into individual words
  const words = name.split(/\s+/).filter((word) => word.trim() !== '');

  // Create a regex pattern for each word, case-insensitive
  const patterns = words.map((word) => new RegExp(`\\b${word}\\b`, 'i'));

  // Filter items where the name matches all regex patterns
  return items.filter((item) =>
    patterns.every((pattern) => pattern.test(item.name))
  );
};

export default ProductView;
