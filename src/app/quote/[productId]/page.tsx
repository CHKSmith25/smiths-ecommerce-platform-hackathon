'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';

export default function QuotePage() {
  const params = useParams();
  const router = useRouter();
  const product = products.find(p => p.id === params.productId);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    address: '',
    quantity: 1,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product?.id,
        ...formData,
      }),
    });

    if (response.ok) {
      alert('Quote request submitted successfully! You will receive an email when it is reviewed.');
      router.push('/shop');
    }
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-smiths-blue text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Request Quote</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-smiths-blue">Base Price: ${product.price.toLocaleString()}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label className="block font-semibold mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Company *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Delivery Address *</label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Quantity *</label>
            <input
              type="number"
              min="1"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={4}
              placeholder="Any specific requirements or questions..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-smiths-blue text-white py-3 rounded hover:bg-smiths-light-blue transition"
          >
            Submit Quote Request
          </button>
        </form>
      </div>
    </div>
  );
}
