'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QuoteRequest } from '@/types';
import { products } from '@/data/products';

export default function QuoteReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | 'amend'>('approve');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [approverNotes, setApproverNotes] = useState('');
  const [suggestedProductId, setSuggestedProductId] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    const response = await fetch('/api/quotes');
    const data = await response.json();
    const foundQuote = data.quotes.find((q: QuoteRequest) => q.id === params.quoteId);
    setQuote(foundQuote);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/quotes/${params.quoteId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'amended',
        discountPercentage: action === 'approve' ? discountPercentage : undefined,
        approverNotes,
        suggestedProductId: action === 'amend' ? suggestedProductId : undefined,
      }),
    });

    if (response.ok) {
      alert('Quote updated successfully!');
      router.push('/admin');
    }
  };

  if (!quote) return <div>Loading...</div>;

  const baseTotal = quote.product.price * quote.quantity;
  const discountedTotal = baseTotal * (1 - discountPercentage / 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-smiths-blue text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Review Quote - {quote.id}</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">{quote.product.name}</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-3">Customer Information</h3>
              <p><strong>Name:</strong> {quote.customer.name}</p>
              <p><strong>Company:</strong> {quote.customer.company}</p>
              <p><strong>Email:</strong> {quote.customer.email}</p>
              <p><strong>Phone:</strong> {quote.customer.phone}</p>
              <p><strong>Address:</strong> {quote.customer.address}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Product Details</h3>
              <p><strong>Product:</strong> {quote.product.name}</p>
              <p><strong>Quantity:</strong> {quote.quantity}</p>
              <p><strong>Unit Price:</strong> ${quote.product.price.toLocaleString()}</p>
              <p><strong>Total:</strong> ${baseTotal.toLocaleString()}</p>
              {quote.product.detectionMode && (
                <p><strong>Detection Mode:</strong> {quote.product.detectionMode}</p>
              )}
              {quote.product.certification && (
                <p><strong>Certification:</strong> {quote.product.certification}</p>
              )}
            </div>
          </div>

          {quote.notes && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Customer Notes</h3>
              <p className="bg-gray-50 p-4 rounded">{quote.notes}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block font-semibold mb-3">Action</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="approve"
                  checked={action === 'approve'}
                  onChange={(e) => setAction(e.target.value as any)}
                  className="mr-2"
                />
                Approve Quote
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="amend"
                  checked={action === 'amend'}
                  onChange={(e) => setAction(e.target.value as any)}
                  className="mr-2"
                />
                Suggest Amendment
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="reject"
                  checked={action === 'reject'}
                  onChange={(e) => setAction(e.target.value as any)}
                  className="mr-2"
                />
                Reject Quote
              </label>
            </div>
          </div>

          {action === 'approve' && (
            <div>
              <label className="block font-semibold mb-2">Discount Percentage (Optional)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(parseFloat(e.target.value) || 0)}
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-sm text-gray-600 mt-2">
                Final Price: ${discountedTotal.toLocaleString()} 
                {discountPercentage > 0 && ` (${discountPercentage}% discount applied)`}
              </p>
            </div>
          )}

          {action === 'amend' && (
            <div>
              <label className="block font-semibold mb-2">Suggest Alternative Product</label>
              <select
                value={suggestedProductId}
                onChange={(e) => setSuggestedProductId(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select a product...</option>
                {products.filter(p => p.type === 'main-device' && p.id !== quote.product.id).map(p => (
                  <option key={p.id} value={p.id}>{p.name} - ${p.price.toLocaleString()}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-semibold mb-2">Notes to Customer</label>
            <textarea
              value={approverNotes}
              onChange={(e) => setApproverNotes(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={4}
              placeholder="Add any notes or explanations for the customer..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-smiths-blue text-white py-3 rounded hover:bg-smiths-light-blue transition"
          >
            Submit Decision
          </button>
        </form>
      </div>
    </div>
  );
}
