'use client';

import { useEffect, useState } from 'react';
import { QuoteRequest } from '@/types';
import Link from 'next/link';

export default function AdminPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes');
      const data = await response.json();
      setQuotes(data.quotes || []);
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const pendingQuotes = quotes.filter(q => q.status === 'pending');
  const processedQuotes = quotes.filter(q => q.status !== 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-smiths-blue text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Smiths Detection - Admin Portal</h1>
          <Link href="/shop" className="hover:underline">Customer View</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Quote Management</h2>

        {loading ? (
          <p>Loading quotes...</p>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Pending Quotes ({pendingQuotes.length})</h3>
              {pendingQuotes.length === 0 ? (
                <p className="text-gray-500">No pending quotes</p>
              ) : (
                <div className="space-y-4">
                  {pendingQuotes.map(quote => (
                    <div key={quote.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold">{quote.product.name}</h4>
                          <p className="text-gray-600">Quote ID: {quote.id}</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded">
                          Pending
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-semibold mb-2">Customer Details</h5>
                          <p><strong>Name:</strong> {quote.customer.name}</p>
                          <p><strong>Company:</strong> {quote.customer.company}</p>
                          <p><strong>Email:</strong> {quote.customer.email}</p>
                          <p><strong>Phone:</strong> {quote.customer.phone}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Order Details</h5>
                          <p><strong>Quantity:</strong> {quote.quantity}</p>
                          <p><strong>Base Price:</strong> ${quote.product.price.toLocaleString()}</p>
                          <p><strong>Total:</strong> ${(quote.product.price * quote.quantity).toLocaleString()}</p>
                          <p><strong>Delivery:</strong> {quote.customer.address}</p>
                        </div>
                      </div>

                      {quote.notes && (
                        <div className="mb-4">
                          <h5 className="font-semibold mb-2">Customer Notes</h5>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded">{quote.notes}</p>
                        </div>
                      )}

                      <Link
                        href={`/admin/quote/${quote.id}`}
                        className="inline-block bg-smiths-blue text-white px-6 py-2 rounded hover:bg-smiths-light-blue transition"
                      >
                        Review Quote
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Processed Quotes ({processedQuotes.length})</h3>
              {processedQuotes.length === 0 ? (
                <p className="text-gray-500">No processed quotes</p>
              ) : (
                <div className="space-y-4">
                  {processedQuotes.map(quote => (
                    <div key={quote.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold">{quote.product.name}</h4>
                          <p className="text-gray-600">Quote ID: {quote.id}</p>
                          <p className="text-gray-600">Customer: {quote.customer.name}</p>
                        </div>
                        <span className={`px-3 py-1 rounded ${
                          quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                          quote.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {quote.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
