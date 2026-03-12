import { NextRequest, NextResponse } from 'next/server';
import { QuoteRequest } from '@/types';
import { products } from '@/data/products';

// In-memory storage for hackathon (replace with database later)
let quotes: QuoteRequest[] = [];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const product = products.find(p => p.id === data.productId);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const quote: QuoteRequest = {
      id: `Q${Date.now()}`,
      customerId: `C${Date.now()}`,
      customer: {
        id: `C${Date.now()}`,
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        address: data.address,
      },
      productId: product.id,
      product,
      quantity: data.quantity,
      notes: data.notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    quotes.push(quote);

    // TODO: Send email notification to customer
    console.log('Quote created:', quote.id);

    return NextResponse.json({ success: true, quoteId: quote.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ quotes });
}
