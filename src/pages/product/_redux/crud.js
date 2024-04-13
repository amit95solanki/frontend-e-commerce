import axios from 'axios';

// export const resource = 'http://localhost:8000/api/v1/product/all';
export const resource = 'https://backend-e-commerce-amit.onrender.com/api/v1/product/all';
export const resource1 = 'https://backend-e-commerce-amit.onrender.com/api/v1/product/';
export const resource2 = 'http://localhost:8000/api/v1/product/new?id=65f9677f36d5437f135e4e3b';
// CREATE =>  POST: add a new item to the server
export function createItem(data) {
  console.log('9999', data.photo);
  return axios.post(resource2, data);
}

// CLONE
export function cloneItem(id) {
  return axios.get(`${resource}/${id}/clone`);
}

// READ
export function getAllItems() {
  return axios.get(resource);
}

export function getItemById(id) {
  return axios.get(`${resource1}/${id}`);
}

export function findItems(queryParams) {
  const { search, sort, category, price, page } = queryParams;

  let base = `?search=${search}&page=${page}`;

  const query = ({ price, sort, category }) => {
    if (price) base += `&price=${price}`;
    if (sort) base += `&sort=${sort}`;
    if (category) base += `&category=${category}`;

    return base;
  };

  const queryString = query({ price, search, sort, category, page });
  console.log('queryString', queryString);
  return axios.get(`${resource}${queryString}`);
}

export function findSelectItems(titleField) {
  return axios.get(`${resource}?filter={"fields":["id", "${titleField}"]}`);
}

// UPDATE => PATCH: update the data on the server
export function updateItem(data) {
  const newData = { ...data };
  delete newData.id;
  return axios.put(`${resource1}${data.id}`, newData);
}

// UPDATE Status
export function updateStatusForItems(ids, status) {
  return axios.patch(`${resource}?where={"id":{"inq":${JSON.stringify(ids)}}}`, {
    ids,
    status,
  });
}

// DELETE => delete the item from the server
export function deleteItem(id) {
  return axios.delete(`${resource}/${id}`);
}

// DELETE Items by ids
export function deleteItems(ids) {
  return axios.post(`${resource}/delete`, { ids });
}
