'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ChatBot from '@/components/ChatBot';
import Cart from '@/components/Cart';
import { CartItem, DetectionMode, Certification } from '@/types';
import Link from 'next/link';

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'main-device' | 'spare' | 'consumable'>('all');
  const [detectionFilter, setDetectionFilter] = useState<DetectionMode | 'all'>('all');
  const [certificationFilter, setCertificationFilter] = useState<Certification | 'all'>('all');
  const [priceSort, setPriceSort] = useState<'none' | 'low-high' | 'high-low'>('none');
  const [showFilters, setShowFilters] = useState(false);

  const addToCart = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing) {
        return prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    // Detection mode filter
    if (detectionFilter !== 'all') {
      filtered = filtered.filter(p => p.detectionMode === detectionFilter);
    }

    // Certification filter
    if (certificationFilter !== 'all') {
      filtered = filtered.filter(p => p.certification === certificationFilter);
    }

    // Price sorting
    if (priceSort === 'low-high') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [searchQuery, typeFilter, detectionFilter, certificationFilter, priceSort]);

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setDetectionFilter('all');
    setCertificationFilter('all');
    setPriceSort('none');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-smiths-blue text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:opacity-90">Smiths Detection</Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:underline">Admin Portal</Link>
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-white text-smiths-blue px-4 py-2 rounded hover:bg-gray-100 transition flex items-center gap-2"
            >
              🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-smiths-blue focus:border-transparent"
              />
              <span className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white px-6 py-3 rounded-lg shadow-sm border hover:bg-gray-50 transition flex items-center gap-2"
            >
              🎛️ Filters
              {(typeFilter !== 'all' || detectionFilter !== 'all' || certificationFilter !== 'all') && (
                <span className="bg-smiths-blue text-white text-xs px-2 py-1 rounded-full">Active</span>
              )}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-smiths-blue hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Product Type */}
              <div>
                <label className="block font-semibold mb-2 text-sm">Product Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="all">All Types</option>
                  <option value="main-device">Main Devices</option>
                  <option value="spare">Spares</option>
                  <option value="consumable">Consumables</option>
                </select>
              </div>

              {/* Detection Mode */}
              <div>
                <label className="block font-semibold mb-2 text-sm">Detection Mode</label>
                <select
                  value={detectionFilter}
                  onChange={(e) => setDetectionFilter(e.target.value as any)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="all">All Modes</option>
                  <option value="narcotics">Narcotics</option>
                  <option value="explosives">Explosives</option>
                  <option value="dual">Dual Mode</option>
                  <option value="enhanced-narcotics">Enhanced Narcotics</option>
                </select>
              </div>

              {/* Certification */}
              <div>
                <label className="block font-semibold mb-2 text-sm">Certification</label>
                <select
                  value={certificationFilter}
                  onChange={(e) => setCertificationFilter(e.target.value as any)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="all">All Certifications</option>
                  <option value="TSA">TSA</option>
                  <option value="CAAC">CAAC</option>
                  <option value="IPMO">IPMO</option>
                  <option value="ROW">ROW</option>
                </select>
              </div>

              {/* Price Sort */}
              <div>
                <label className="block font-semibold mb-2 text-sm">Sort by Price</label>
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value as any)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="none">Default</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Quick Category Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${
              typeFilter === 'all'
                ? 'bg-smiths-blue text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setTypeFilter('main-device')}
            className={`px-4 py-2 rounded-lg transition ${
              typeFilter === 'main-device'
                ? 'bg-smiths-blue text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Main Devices ({products.filter(p => p.type === 'main-device').length})
          </button>
          <button
            onClick={() => setTypeFilter('spare')}
            className={`px-4 py-2 rounded-lg transition ${
              typeFilter === 'spare'
                ? 'bg-smiths-blue text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Spares ({products.filter(p => p.type === 'spare').length})
          </button>
          <button
            onClick={() => setTypeFilter('consumable')}
            className={`px-4 py-2 rounded-lg transition ${
              typeFilter === 'consumable'
                ? 'bg-smiths-blue text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Consumables ({products.filter(p => p.type === 'consumable').length})
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No products found</p>
            <button
              onClick={clearFilters}
              className="text-smiths-blue hover:underline"
            >
              Clear filters to see all products
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </div>

      {showCart && <Cart cart={cart} setCart={setCart} onClose={() => setShowCart(false)} />}
      <ChatBot />
    </div>
  );
}
