import { NextRequest, NextResponse } from 'next/server';
import { Order, SAPOrderData } from '@/types';

// In-memory storage
let orders: Order[] = [];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const orderId = `ORD${Date.now()}`;
    const customerId = `C${Date.now()}`;
    
    // Create SAP-ready data
    const sapData: SAPOrderData = {
      orderId,
      customerCode: customerId,
      orderDate: new Date().toISOString(),
      items: [], // Would be populated from cart
      totalAmount: 0,
      currency: 'USD',
      deliveryAddress: data.address,
      paymentTerms: 'NET30',
    };

    const order: Order = {
      id: orderId,
      customerId,
      customer: {
        id: customerId,
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        address: data.address,
      },
      items: [],
      totalAmount: 0,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deliveryAddress: data.address,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      trackingNumber: `TRK${Date.now()}`,
      sapData,
    };

    orders.push(order);

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ orders });
}
