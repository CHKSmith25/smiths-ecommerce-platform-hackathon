# Smiths Detection E-commerce Platform

IONSCAN 600 trace detection device e-commerce platform built for hackathon.

## Features

### Customer Portal
- Browse IONSCAN 600 configurations (narcotics, explosives, dual-mode, enhanced)
- Direct ordering for spares and consumables
- Quote requests for main devices
- AI chatbot for product guidance
- Shopping cart and checkout
- Order confirmation with SAP-ready data

### Admin Portal
- View and manage quote requests
- Approve/reject/amend quotes
- Add discounts
- Suggest alternative products
- Customer management

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- In-memory data storage (for hackathon demo)

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables (optional for AI chatbot):
```bash
cp .env.example .env
# Add your OPENAI_API_KEY if you want enhanced chatbot
```

3. Run development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Routes

- `/` - Home page
- `/shop` - Product catalog
- `/quote/[productId]` - Request quote for main devices
- `/checkout` - Checkout for direct orders
- `/order/[orderId]` - Order confirmation with SAP data
- `/admin` - Admin dashboard
- `/admin/quote/[quoteId]` - Review and process quotes

## Product Types

### Main Devices (Quote Required)
- IONSCAN 600 configurations with different:
  - Detection modes: Narcotics, Explosives, Dual, Enhanced Narcotics
  - Certifications: TSA, CAAC, IPMO, ROW
  - Hardware options: With/without printer

### Spares & Consumables (Direct Order)
- Swabs (narcotics/explosives)
- Battery packs
- Verification pens
- Printer paper rolls
- Carrying cases

## Future Enhancements
- Customer authentication
- Real database integration
- Email notifications
- Payment processing integration
- Real-time order tracking
- Enhanced AI chatbot with OpenAI
