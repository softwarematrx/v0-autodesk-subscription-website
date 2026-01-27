# Autodesk Subscriptions E-Commerce Platform

A modern, responsive e-commerce website for selling Autodesk subscriptions with a professional admin dashboard for managing orders, products, and pricing.

## Features

### Customer-Facing Features
- **Modern Landing Page** - Eye-catching hero section with product showcase
- **Product Catalog** - Browse all major Autodesk applications (AutoCAD, Revit, Fusion 360, Maya, 3ds Max, etc.)
- **Dynamic Pricing** - Support for monthly and annual subscription plans with discount options
- **Shopping Cart** - Add/remove products, manage quantities, real-time cart updates
- **Secure Checkout** - Integrated Stripe payment processing
- **Order Tracking** - View order history and subscription details
- **Responsive Design** - Mobile-first, fully responsive interface

### Admin Dashboard Features
- **Admin Login** - Secure authentication for administrators
- **Dashboard Overview** - Key metrics including total revenue, order count, and customer statistics
- **Orders Management** - View all orders, filter by status, track customer information
- **Product Management** - Add, edit, and delete products with images and descriptions
- **Pricing Management** - Configure pricing for different subscription plans
- **Real-time Updates** - Live dashboard with up-to-date information

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Neon (PostgreSQL)
- **Payment Processing**: Stripe
- **Hosting**: Vercel (Recommended)

## Prerequisites

Before you begin, make sure you have:
- A Stripe account with API keys
- A Neon PostgreSQL database
- Node.js 18+ installed locally

## Environment Variables

Set these environment variables in your Vercel project:

```env
# Database
DATABASE_URL=postgresql://user:password@host/database

# Stripe
STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production)
STRIPE_WEBHOOK_SECRET=whsec_...

# Base URL (for redirects)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Database**
   - The database schema is automatically initialized when you run the app
   - Check `/scripts/init-db.sql` for the schema details

3. **Configure Environment Variables**
   - Add the required environment variables to your Vercel project

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   - Open http://localhost:3000

5. **Access Admin Dashboard**
   - Navigate to `/admin/login`
   - Default credentials: Use `admin@example.com` / `admin123` (change these immediately in production!)

## Database Schema

### Tables
- **products** - Autodesk applications and subscription offerings
- **pricing** - Subscription plan pricing (monthly/annual)
- **orders** - Customer orders and transactions
- **order_items** - Individual items in each order
- **admin_users** - Administrator accounts

## API Endpoints

### Public APIs
- `GET /api/products` - Fetch all products with pricing
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/orders` - Create new order record
- `GET /api/orders/:id` - Get order details

### Admin APIs
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products` - Update product
- `DELETE /api/admin/products` - Delete product

### Webhooks
- `POST /api/webhook/stripe` - Stripe payment webhook (configure in Stripe dashboard)

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com and import your repository
   - Add environment variables in the project settings
   - Deploy

3. **Configure Stripe Webhook**
   - In Stripe Dashboard, add webhook endpoint: `https://yourdomain.com/api/webhook/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Admin Dashboard Login

The admin dashboard is protected. To create an admin user:

1. Access the database directly
2. Insert an admin record with a bcrypt-hashed password
3. Use the credentials to login at `/admin/login`

## File Structure

```
├── app/
│   ├── admin/              # Admin dashboard pages
│   ├── api/                # API routes
│   ├── product/            # Product detail pages
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── pricing/            # Pricing page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── page.tsx            # Landing page
├── components/
│   ├── admin/              # Admin components
│   ├── hero-section.tsx    # Hero section
│   ├── product-grid.tsx    # Product showcase
│   ├── pricing-comparison.tsx
│   └── ...
├── lib/
│   ├── db.ts              # Database utilities
│   ├── stripe.ts          # Stripe utilities
│   ├── cart-context.tsx   # Cart state management
│   ├── admin-context.tsx  # Admin auth context
│   └── ...
└── scripts/
    └── init-db.sql        # Database initialization
```

## Customization

### Change Admin Credentials
Update the admin user in the database with your desired email and password.

### Modify Product Catalog
Use the admin dashboard to add/edit products, or insert them directly into the database.

### Customize Pricing
Configure pricing tiers and discounts through the admin dashboard or database.

### Branding
- Update colors in `/app/globals.css`
- Modify company name in component headers/footers
- Add your logo to `/public`

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correctly set
- Check Neon network access rules
- Ensure your IP address is whitelisted

### Stripe Errors
- Verify `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are correct
- Check Stripe webhook configuration
- Ensure test keys are used in development

### Admin Login Issues
- Check admin user exists in database
- Verify password is correctly hashed
- Clear browser cache and try again

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API response errors in browser console
3. Check server logs for detailed error messages

## License

This project is proprietary and for internal use only.

## Next Steps

1. Configure your Stripe account and get API keys
2. Set up Neon database and get connection string
3. Deploy to Vercel and add environment variables
4. Configure Stripe webhook
5. Create admin user in database
6. Start selling Autodesk subscriptions!
