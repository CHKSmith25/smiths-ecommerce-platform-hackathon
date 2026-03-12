'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId;

  // Mock SAP data for demonstration
  const sapData = {
    orderId: orderId,
    customerCode: 'CUST001',
    orderDate: new Date().toISOString(),
    items: [
      {
        materialNumber: 'MAT-SWAB-NARC-100',
        quantity: 2,
        unitPrice: 150,
        totalPrice: 300,
      },
      {
        materialNumber: 'MAT-BATTERY-PACK',
        quantity: 1,
        unitPrice: 450,
        totalPrice: 450,
      },
    ],
    totalAmount: 750,
    currency: 'USD',
    deliveryAddress: '123 Airport Security Blvd, City, State 12345',
    paymentTerms: 'NET30',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-smiths-blue text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Order Confirmation</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600">Order ID: {orderId}</p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
            <p className="text-gray-700 mb-2">
              <strong>Estimated Delivery:</strong> {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Tracking Number:</strong> TRK{orderId}
            </p>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-blue-800">
                You will receive email updates about your order status and delivery progress.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">SAP Integration Data</h3>
          <p className="text-sm text-gray-600 mb-4">
            This order data is ready for SAP insertion:
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
            {JSON.stringify(sapData, null, 2)}
          </pre>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/shop"
            className="inline-block bg-smiths-blue text-white px-8 py-3 rounded hover:bg-smiths-light-blue transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
