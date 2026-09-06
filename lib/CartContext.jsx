'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart, getMe, logoutUser } from './api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cart, setCart] = useState({ items: [], subtotal: 0, totalQuantity: 0 });
  const [cartLoading, setCartLoading] = useState(false);

  // Check auth state
  const checkAuth = useCallback(async () => {
    try {
      setAuthLoading(true);
      const res = await getMe();
      if (res?.success && res?.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // Fetch cart
  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart({ items: [], subtotal: 0, totalQuantity: 0 });
      return;
    }
    try {
      setCartLoading(true);
      const res = await getCart();
      if (res?.success && res?.data) {
        setCart(res.data);
      }
    } catch (err) {
      console.warn('Failed to fetch cart:', err.message);
    } finally {
      setCartLoading(false);
    }
  }, [user]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [], subtotal: 0, totalQuantity: 0 });
    }
  }, [user, fetchCart]);

  const addItem = async (productId, size, quantity = 1) => {
    if (!user) {
      return { success: false, requireAuth: true, message: 'Please log in to add items to cart.' };
    }
    try {
      const res = await addToCart(productId, size, quantity);
      if (res.success) {
        await fetchCart();
        return { success: true, message: res.message || 'Added to cart' };
      }
      return { success: false, message: res.message || 'Could not add item.' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const updateItemQty = async (id, quantity) => {
    try {
      const res = await updateCartItem(id, quantity);
      if (res.success) {
        await fetchCart();
      }
    } catch (err) {
      console.error('Update qty error:', err);
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await removeCartItem(id);
      if (res.success) {
        await fetchCart();
      }
    } catch (err) {
      console.error('Remove item error:', err);
    }
  };

  const emptyCart = async () => {
    try {
      await clearCart();
      setCart({ items: [], subtotal: 0, totalQuantity: 0 });
    } catch (err) {
      console.error('Clear cart error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      setCart({ items: [], subtotal: 0, totalQuantity: 0 });
      window.location.href = '/';
    }
  };

  return (
    <CartContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        authLoading,
        cart,
        cartLoading,
        checkAuth,
        fetchCart,
        addItem,
        updateItemQty,
        removeItem,
        emptyCart,
        handleLogout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
