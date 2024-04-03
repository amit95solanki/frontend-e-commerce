export function addToCart(item) {
  return new Promise((resolve) => {
    fetch(`http://localhost:8000/api/v1/cart`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}

export function fetchItemsByUserId(id) {
  return new Promise((resolve) => {
    fetch(`http://localhost:8000/api/v1/cart?id=${id}`)
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}

export function updateCart(update) {
  return new Promise((resolve) => {
    fetch(`${process.env.LOCAL_URL}cart/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise((resolve) => {
    fetch(`${process.env}cart/${itemId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then(() => resolve({ data: { id: itemId } }));
  });
}

export function resetCart() {
  return new Promise((resolve) => {
    fetchItemsByUserId()
      .then((response) => response.data)
      .then((items) => Promise.all(items.map((item) => deleteItemFromCart(item.id))))
      .then(() => resolve({ status: 'success' }));
  });
}
