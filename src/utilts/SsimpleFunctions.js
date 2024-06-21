export const calculatePrice = (price, offer) => {
  return parseInt(price) - (parseInt(price) * parseInt(offer)) / 100;
};

export const convertImgUrlToBlob = async (url) => {
  const DomainApi = import.meta.env.VITE_DOMAINAPI;
  const AppTimeStamp = new Date().getTime();
  return await fetch(`${DomainApi}${url}?v=${AppTimeStamp}`).then((response) =>
    response.blob()
  );
};
