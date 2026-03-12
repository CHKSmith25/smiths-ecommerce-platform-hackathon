'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-smiths-blue text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Smiths Detection</h1>
          <div className="space-x-4">
            <Link href="/shop" className="hover:underline">Shop</Link>
            <Link href="/admin" className="hover:underline">Admin Portal</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-smiths-blue mb-4">
            IONSCAN 600
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Advanced Trace Detection for Security Environments
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Ion Mobility Spectrometry technology for detecting microscopic amounts of 
            explosives and narcotics in airports, border control, cargo screening, and law enforcement.
          </p>
          <Link 
            href="/shop"
            className="bg-smiths-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-smiths-light-blue transition"
          >
            Browse Products
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-smiths-blue mb-3">Multiple Configurations</h3>
            <p className="text-gray-600">
              Choose from narcotics-only, explosives-only, dual-mode, or enhanced detection for synthetic opioids.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-smiths-blue mb-3">Certified Solutions</h3>
            <p className="text-gray-600">
              TSA, CAAC, IPMO certified models available for specific regulatory requirements.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-smiths-blue mb-3">Complete Support</h3>
            <p className="text-gray-600">
              Spares, consumables, and expert guidance available for all your operational needs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
