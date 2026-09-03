export const postData = async (url, data) => {
  console.log('url: ', url);
  console.log('data:---->>>>>> ', data);
  const response = await client.post(url, data);
  console.log('response we are gettinnngggg--->>>>', response.data);
  return response?.data;
};
export const deleteData = async (url, payload) => {
  console.log('url: ', url);
  const response = await client.delete(url, {data: payload});
  return response;
};
export const putData = async (url, data) => {
  console.log('url: ', url);
  const response = await client.put(url, data);
  console.log('response we are gettinnngggg--->>>>', response.data);
  return response;
};

export const getData = async url => {
  console.log('url: ', url);
  const response = await client.get(url);
  return response?.data;
};
