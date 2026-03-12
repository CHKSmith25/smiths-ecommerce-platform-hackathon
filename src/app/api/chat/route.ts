import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Simple product information chatbot (can be enhanced with OpenAI later)
    const lowerMessage = message.toLowerCase();
    
    let response = '';

    if (lowerMessage.includes('ionscan') || lowerMessage.includes('device') || lowerMessage.includes('main')) {
      response = 'The IONSCAN 600 is available in several configurations:\n\n' +
        '• Narcotics-only detection (cocaine, heroin, methamphetamine)\n' +
        '• Explosives-only detection (TNT, RDX, PETN)\n' +
        '• Dual-mode (both explosives and narcotics)\n' +
        '• Enhanced narcotics (includes synthetic opioids like fentanyl)\n\n' +
        'We also offer TSA, CAAC, IPMO, and ROW certified models. What specific configuration interests you?';
    } else if (lowerMessage.includes('swab')) {
      response = 'We offer specialized swabs for both narcotics and explosives detection. Each pack contains 100 swabs and costs $150. These swabs are compatible with all IONSCAN 600 models and are essential for collecting trace residues from surfaces.';
    } else if (lowerMessage.includes('battery') || lowerMessage.includes('power')) {
      response = 'Our rechargeable battery pack costs $450 and provides extended portable operation for all IONSCAN 600 models. It\'s a high-capacity battery designed for field use.';
    } else if (lowerMessage.includes('printer')) {
      response = 'Some IONSCAN 600 configurations include an integrated thermal printer for logging and printing screening results. We also sell replacement thermal paper rolls ($45 for a pack of 10).';
    } else if (lowerMessage.includes('certification') || lowerMessage.includes('tsa') || lowerMessage.includes('caac')) {
      response = 'We offer models with different regulatory certifications:\n\n' +
        '• TSA: US Transportation Security Administration (cargo screening)\n' +
        '• CAAC: Civil Aviation Administration of China\n' +
        '• IPMO: Israeli Prime Minister\'s Office\n' +
        '• ROW: Rest of World (standard model)\n\n' +
        'Which certification do you need?';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = 'Main IONSCAN 600 devices range from $45,000 to $62,000 depending on configuration and certification. Spares and consumables are available for direct order at lower prices. Would you like specific pricing for a particular model?';
    } else {
      response = 'I can help you with information about:\n\n' +
        '• IONSCAN 600 device configurations\n' +
        '• Detection modes (narcotics, explosives, dual, enhanced)\n' +
        '• Regulatory certifications (TSA, CAAC, IPMO, ROW)\n' +
        '• Spares and consumables (swabs, batteries, printer paper)\n' +
        '• Pricing and availability\n\n' +
        'What would you like to know?';
    }

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ response: 'Sorry, I encountered an error.' }, { status: 500 });
  }
}
