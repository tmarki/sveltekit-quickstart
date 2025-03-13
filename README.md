# SvelteKit Quickstart Template

A modern, feature-rich SvelteKit starter template that helps you build production-ready applications faster.

## Features

- 🚀 [SvelteKit](https://kit.svelte.dev/) - The official application framework for Svelte
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🔒 Authentication with Magic Links using JWT and SendGrid
- 💳 [Stripe](https://stripe.com/) integration for payments and subscriptions
- 🌐 SEO optimization with meta tags and OpenGraph support
- 🌍 Internationalization (i18n) support
- 📝 [Formspark](https://formspark.io/) contact form integration
- 🧪 [Playwright](https://playwright.dev/) for end-to-end testing
- 📱 Responsive design ready
- 🔒 Basic security headers configured
- 📦 Pre-configured development environment

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/svelte-template.git my-app

# Navigate to the project directory
cd my-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev -- --open
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Authentication
JWT_SECRET="your-secret-key"
EMAIL_FROM="your-email@example.com"
SENDGRID_API_KEY="your-sendgrid-api-key"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID="your-price-id"
STRIPE_CREDIT_PACK_100_PRICE_ID="your-price-id"
PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"

# Formspark
PUBLIC_FORMSPARK_FORM_ID="your-form-id"

# SEO
SEO_TITLE="Your Site Name"
SEO_DESCRIPTION="Your site description"
SEO_CANONICAL="https://your-site.com"
SEO_OPENGRAPH_TITLE="Your Site Name"
SEO_OPENGRAPH_DESCRIPTION="Your site description"
SEO_OPENGRAPH_IMAGE="https://your-site.com/opengraph-image.jpg"
SEO_TWITTER_CARD="summary_large_image"
SEO_TWITTER_SITE="@yourhandle"
SEO_TWITTER_TITLE="Your Site Name"
SEO_TWITTER_DESCRIPTION="Your site description"
SEO_TWITTER_IMAGE="https://your-site.com/twitter-image.jpg"

# Public URL
PUBLIC_URL="https://your-site.com"
```

## Development

The development server includes:

- Hot module replacement
- Error overlay
- Auto-refresh on file changes

```bash
# Start development server
npm run dev

# Start with network access
npm run dev -- --host

# Open in browser automatically
npm run dev -- --open

# Run tests
npm run test
```

## Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Deployment

This template can be deployed to any platform that supports Node.js. You may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment:

- Vercel: `@sveltejs/adapter-vercel`
- Netlify: `@sveltejs/adapter-netlify`
- Static hosting: `@sveltejs/adapter-static`
- Node.js: `@sveltejs/adapter-node`

## Project Structure

```
my-app/
├── src/
│   ├── lib/         # Your components and utilities
│   │   ├── components/  # Reusable UI components
│   │   ├── server/      # Server-side utilities
│   │   └── i18n/        # Internationalization
│   ├── routes/      # Page components and API routes
│   │   ├── api/     # API endpoints
│   │   └── (auth)/  # Authentication routes
│   └── app.html     # HTML template
├── static/          # Static assets
├── tests/          # Playwright test files
├── prisma/         # Database schema and migrations
└── svelte.config.js # SvelteKit configuration
```

## Testing

This template includes Playwright for end-to-end testing:

```bash
# Run tests
npm run test

# Run tests in UI mode
npm run test:ui

# Run tests in headed mode
npm run test:headed
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Built with [`sv`](https://github.com/sveltejs/cli), the official SvelteKit project creator.
