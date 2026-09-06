const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Crucial for session cookies
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

// Products
export async function getProducts(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiFetch(`/products${queryString}`);
}

export async function getProduct(id) {
  return apiFetch(`/products/${id}`);
}

export async function getCategories() {
  return apiFetch('/categories');
}

// Cart
export async function getCart() {
  return apiFetch('/cart');
}

export async function addToCart(productId, size, quantity = 1) {
  return apiFetch('/cart', {
    method: 'POST',
    body: { productId, size, quantity },
  });
}

export async function updateCartItem(id, quantity) {
  return apiFetch(`/cart/${id}`, {
    method: 'PATCH',
    body: { quantity },
  });
}

export async function removeCartItem(id) {
  return apiFetch(`/cart/${id}`, {
    method: 'DELETE',
  });
}

export async function clearCart() {
  return apiFetch('/cart', {
    method: 'DELETE',
  });
}

// Orders
export async function createOrder(orderData) {
  return apiFetch('/orders', {
    method: 'POST',
    body: orderData,
  });
}

export async function getOrders() {
  return apiFetch('/orders');
}

export async function getOrder(id) {
  return apiFetch(`/orders/${id}`);
}

// Auth
export async function getMe() {
  return apiFetch('/auth/me');
}

export async function loginUser(email, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function registerUser(name, email, password) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: { name, email, password },
  });
}

export async function logoutUser() {
  return apiFetch('/auth/logout', {
    method: 'POST',
  });
}
