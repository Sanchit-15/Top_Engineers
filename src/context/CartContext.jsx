import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'top_engineers_cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  // Synchronize cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // Display a brief toast notification
  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  /**
   * Add a product to the cart. If already present, increment quantity.
   */
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    const addQty = Math.max(1, parseInt(quantity, 10) || 1);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + addQty,
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          category_name: product.category_name,
          price: product.price,
          show_price: product.show_price,
          image_url: product.image_url,
          quantity: addQty,
        },
      ];
    });

    triggerToast(`Added "${product.name}" (${addQty} unit${addQty > 1 ? 's' : ''}) to Quote Cart`);
  };

  /**
   * Update quantity of an item
   */
  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  /**
   * Increment item quantity by 1
   */
  const incrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  /**
   * Decrement item quantity by 1 (removes if reaches 0)
   */
  const decrementQuantity = (productId) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  /**
   * Remove an item completely from cart
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const target = prevItems.find((item) => item.id === productId);
      if (target) {
        triggerToast(`Removed "${target.name}" from Quote Cart`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setCartItems([]);
    triggerToast('Quote Cart cleared');
  };

  // Total count of distinct units in cart
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Subtotal calculation strictly for items with verified show_price
  const pricedItems = cartItems.filter((item) => item.show_price && typeof item.price === 'number');
  const unpricedItems = cartItems.filter((item) => !item.show_price || typeof item.price !== 'number');

  const subtotal = pricedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const hasPricedItems = pricedItems.length > 0;
  const hasUnpricedItems = unpricedItems.length > 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        hasPricedItems,
        hasUnpricedItems,
        toast,
        dismissToast: () => setToast(null),
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
