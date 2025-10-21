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

## Building Icons Sprite

This project uses individual SVG files combined into a sprite for optimal performance. The sprite needs to be built before running the application.

### Generating the Sprite

```bash
# Build the SVG sprite from individual icon files
pnpm build:sprite
# or
npm run build:sprite
# or
yarn build:sprite
```

The sprite is automatically built when running:

- `pnpm build` (production build)
- `pnpm dev` (development server)

### Icon System

Individual SVG icons are stored in `src/icons/` and combined into a single sprite file at `public/icons/sprite.svg`. This approach provides:

- **Performance**: Single HTTP request for all icons
- **Maintainability**: Individual SVG files are easier to manage
- **Optimization**: Automated minification and deduplication
- **Type Safety**: TypeScript definitions for all available icons

Available icons include: chevron-up, chevron-down, chevron-left, chevron-right, x, document, exclamation-circle, check-circle.

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

## Absences Management System

This application provides a comprehensive absence management system with the following features:

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Pagination & Sorting**: Efficient data browsing with customizable page sizes
- **Internationalization**: Support for English, Spanish, and German languages
- **API Integration**: Real-time data fetching from BrightHR APIs
- **Conflict Detection**: Automatic identification of scheduling conflicts
- **Type Safety**: Full TypeScript support with comprehensive type definitions
