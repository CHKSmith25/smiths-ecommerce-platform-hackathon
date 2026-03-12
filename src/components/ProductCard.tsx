'use client';

import { useState } from 'react';
import { Product } from '@/types';
import Link from 'next/link';

interface Props {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* Product Image Placeholder */}
      <div className="bg-gradient-to-br from-smiths-blue to-smiths-light-blue h-48 flex items-center justify-center">
        <span className="text-white text-6xl">
          {product.type === 'main-device' ? '📡' : product.type === 'spare' ? '🔧' : '📦'}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Product Type Badge */}
        <div className="mb-3">
          <span className={`text-xs px-3 py-1 rounded-full ${
            product.type === 'main-device' 
              ? 'bg-purple-100 text-purple-800' 
              : product.type === 'spare'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-teal-100 text-teal-800'
          }`}>
            {product.type === 'main-device' ? 'Main Device' : product.type === 'spare' ? 'Spare Part' : 'Consumable'}
          </span>
        </div>

        <h3 className="text-lg font-bold text-smiths-blue mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-1">
          {product.description}
        </p>
        
        {/* Detection Mode & Certification Tags */}
        {(product.detectionMode || product.certification) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {product.detectionMode && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {product.detectionMode.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            )}
            {product.certification && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {product.certification} Certified
              </span>
            )}
            {product.hasPrinter && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                🖨️ Printer
              </span>
            )}
          </div>
        )}

        {/* Stock Status */}
        <div className="mb-3">
          {product.inStock ? (
            <span className="text-xs text-green-600 flex items-center gap-1">
              ✓ In Stock {product.stockQuantity && `(${product.stockQuantity} available)`}
            </span>
          ) : (
            <span className="text-xs text-red-600 flex items-center gap-1">
              ✗ Out of Stock
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-smiths-blue">
            ${product.price.toLocaleString()}
          </p>
          {product.requiresQuote && (
            <p className="text-xs text-gray-500 mt-1">Base price - Quote required</p>
          )}
        </div>

        {/* Action Buttons */}
        {product.requiresQuote ? (
          <Link
            href={`/quote/${product.id}`}
            className="block w-full bg-smiths-blue text-white text-center py-3 rounded-lg hover:bg-smiths-light-blue transition font-semibold"
          >
            Request Quote
          </Link>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max={product.stockQuantity || 999}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, product.stockQuantity || 999))}
                className="w-20 border rounded-lg px-3 py-2 text-center"
              />
              <button
                onClick={() => {
                  onAddToCart(product.id, quantity);
                  setQuantity(1);
                }}
                disabled={!product.inStock}
                className="flex-1 bg-smiths-blue text-white py-2 rounded-lg hover:bg-smiths-light-blue transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
