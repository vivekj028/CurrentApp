import React, { createContext, useState, ReactNode, useContext} from 'react';
import {CartItem} from './types'

type CartContextType = {
  cartItems: CartItem[];
  addedItems: { [key: number]: boolean };
  addItemToCart: (item: CartItem) => void;
  clearCart: () =>void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};


export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const initialCartItems: CartItem[] = [];
  const initialAddedItems: { [key: number]: boolean } = {};

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [addedItems, setAddedItems] = useState<{ [key: number]: boolean }>(initialAddedItems);


  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex >= 0) {
        return prevItems;
      } else {
        setAddedItems((prevAddedItems) => ({ ...prevAddedItems, [item.id]: true }));
        return [...prevItems, item];
      }
    });
  };

  const clearCart = () => {
    setCartItems(initialCartItems);
    setAddedItems(initialAddedItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addedItems, addItemToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
