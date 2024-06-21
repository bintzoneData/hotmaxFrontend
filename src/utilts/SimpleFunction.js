export const clientLogout = async (
  fetchPrivateData,
  setSmallNotify,
  navigate
) => {
  const res = await fetchPrivateData('/clients/logout');
  if (!res.ok) {
    setSmallNotify({
      show: true,
      msg: res.message,
      type: 'error',
      time: 3000,
    });
    return;
  }
  localStorage.removeItem('authToken');
  setSmallNotify({
    show: true,
    msg: res.data.message || 'Logged out successfully',
    type: 'success',
    time: 3000,
  });
};

export const getFieldValues = (array, fieldName) => {
  // Use map to extract the specified field from each object
  return array.map((item) => item[fieldName]);
};

export const filterTypes = (brands, datas, name) => {
  const brandNamesInDatas = getFieldValues(datas, name);
  return brands
    .filter((brand) => brandNamesInDatas.includes(brand.name))
    .map((brand) => brand.name); // Map to extract just the 'name' field
};

export const ImageSrc = async (image) => {
  const img = await convertImgUrlToBlob(image);
  return img;
};

export const convertImgUrlToBlob = async (url) => {
  const DomainApi = import.meta.env.VITE_DOMAINAPI;
  const AppTimeStamp = new Date().getTime();
  return await fetch(`${DomainApi}${url}?v=${AppTimeStamp}`).then((response) =>
    response.blob()
  );
};
