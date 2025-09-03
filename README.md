# Image Processing API

A scalable Image Processing API built with Node.js, Express, and TypeScript that provides image resizing functionality with caching capabilities.

## Features

- **Image Resizing**: Resize JPG images to specified dimensions
- **Caching**: Automatically cache resized images to improve performance
- **Error Handling**: Comprehensive error handling for invalid parameters and missing files
- **TypeScript**: Full TypeScript support for type safety
- **Testing**: Complete unit and integration test coverage with Jest
- **Linting & Formatting**: ESLint and Prettier for code quality
- **RESTful API**: Clean REST API design

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd image-processing-api
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Usage

### Development

1. Start the development server:

```bash
npm start
```

The server will start on `http://localhost:3000`

### Production

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## API Endpoints

### GET /api/images

Resize an image to specified dimensions.

**Query Parameters:**

- `filename` (required): Name of the image file (must be a JPG file)
- `width` (required): Desired width in pixels (positive integer)
- `height` (required): Desired height in pixels (positive integer)

**Example Request:**

```
GET /api/images?filename=fjord.jpg&width=200&height=200
```

**Success Response (200):**

- Returns the resized image file

**Error Responses:**

- `400 Bad Request`: Missing or invalid parameters
- `500 Internal Server Error`: Image processing failed or file not found

**Example Error Response:**

```json
{
  "error": "Missing required parameters: filename, width, height"
}
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

Run linting:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

## Project Structure

```
image-processing-api/
├── src/
│   ├── routes/
│   │   └── image.ts          # Image processing routes
│   ├── utils/
│   │   └── imageProcessor.ts # Image processing utilities
│   └── server.ts             # Express server setup
├── tests/
│   ├── helpers/
│   │   └── setup.ts          # Test setup
│   ├── imageProcessor.spec.ts # Unit tests for image processor
│   └── server.spec.ts        # Integration tests for API
├── dist/                     # Compiled JavaScript files
├── thumbs/                   # Cached resized images
├── node_modules/             # Dependencies
├── package.json              # Project configuration
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest configuration
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
└── README.md                 # Project documentation
```

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **TypeScript**: Typed JavaScript
- **Sharp**: High-performance image processing
- **Jest**: Testing framework
- **Supertest**: HTTP endpoint testing
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Development

### Adding New Features

1. Create feature branch from `main`
2. Implement changes with tests
3. Ensure all tests pass: `npm test`
4. Run linting: `npm run lint`
5. Format code: `npm run format`
6. Submit pull request

### Code Quality

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Jest** for unit and integration testing

## API Examples

### Successful Image Resize

```bash
curl "http://localhost:3000/api/images?filename=fjord.jpg&width=300&height=200"
```

### Error Examples

Missing parameters:

```bash
curl "http://localhost:3000/api/images"
# Returns: {"error": "Missing required parameters: filename, width, height"}
```

Invalid dimensions:

```bash
curl "http://localhost:3000/api/images?filename=fjord.jpg&width=-100&height=200"
# Returns: {"error": "Width and height must be positive numbers"}
```

Non-existent file:

```bash
curl "http://localhost:3000/api/images?filename=nonexistent.jpg&width=200&height=200"
# Returns: {"error": "Internal server error"}
```

## Caching

The API automatically caches resized images in the `thumbs/` directory. When the same image is requested with the same dimensions, the cached version is served instead of reprocessing the image.

Cache files are named using the pattern: `{filename}_{width}x{height}.jpg`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on the GitHub repository.
