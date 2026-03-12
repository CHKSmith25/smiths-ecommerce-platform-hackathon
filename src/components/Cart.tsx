'use client';

import { CartItem } from '@/types';
import Link from 'next/link';

interface Props {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  onClose: () => void;
}

export default function Cart({ cart, setCart, onClose }: Props) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const removeItem = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">${item.product.price} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${(item.product.price * item.quantity).toLocaleString()}</p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-smiths-blue">${total.toLocaleString()}</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full bg-smiths-blue text-white text-center py-3 rounded hover:bg-smiths-light-blue transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
