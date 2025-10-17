This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

Then, run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

This project includes comprehensive unit tests using Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
pnpm test
# or
npm test
# or
yarn test

# Run tests in watch mode
pnpm test:watch
# or
npm run test:watch
# or
yarn test:watch

# Run tests with coverage
pnpm test:coverage
# or
npm run test:coverage
# or
yarn test:coverage

# Run specific test file
pnpm test -- dateHelpers.test.ts
# or
npm test -- dateHelpers.test.ts
```

### Test Structure

- **Unit Tests**: Located in `src/utils/__tests__/` for utility functions
- **Component Tests**: Located in `src/components/__tests__/` for React components
- **Integration Tests**: Test complete user workflows and API integrations

The test suite covers:

- Date utility functions with edge cases and locale formatting
- Responsive table components with pagination and sorting
- API data fetching and error handling
- Internationalization (i18n) functionality

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Absences Management System

This application provides a comprehensive absence management system with the following features:

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Pagination & Sorting**: Efficient data browsing with customizable page sizes
- **Internationalization**: Support for English, Spanish, and German languages
- **API Integration**: Real-time data fetching from BrightHR APIs
- **Conflict Detection**: Automatic identification of scheduling conflicts
- **Type Safety**: Full TypeScript support with comprehensive type definitions
