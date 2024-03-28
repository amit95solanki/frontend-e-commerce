export function addToCart(item) {
  return new Promise((resolve) => {
    fetch('https://backend-e-commerce-amit.onrender.com/api/v1//cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}

export function fetchItemsByUserId() {
  return new Promise((resolve) => {
    fetch('https://backend-e-commerce-amit.onrender.com/api/v1//cart')
      .then((response) => response.json())
      .then((data) => resolve({ data }));
  });
}

export function updateCart(update) {
  return new Promise((resolve) => {
    fetch(`https://backend-e-commerce-amit.onrender.com/api/v1//cart/${update.id}`, {
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
    fetch(`https://backend-e-commerce-amit.onrender.com/api/v1//cart/${itemId}`, {
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
