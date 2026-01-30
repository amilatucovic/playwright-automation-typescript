# Playwright Automation - TypeScript

A comprehensive Playwright-based test automation project for learning and practicing UI and API test automation, written in TypeScript. This project was developed as part of a Udemy course during my QA Automation Internship.


## About

This repository contains a complete test automation framework built with Playwright and TypeScript. It demonstrates various testing concepts including:

- API testing with different HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Authentication and authorization testing
- Schema validation
- UI automation with various web elements
- File upload handling
- Test data management
- Assertions and validations
- Auto-waiting and timeouts



## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor (VS Code recommended)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/amilatucovic/playwright-automation-typescript.git
cd playwright-automation-typescript
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run a specific test file
```bash
npx playwright test tests/apitests/GetApiRequest04.spec.ts
```

## Test Coverage

This project includes tests for:

### API Testing
- **Authentication**: Token-based authentication flows
- **CRUD Operations**: Create, Read, Update, Delete operations on booking resources
- **HTTP Methods**: GET, POST, PUT, PATCH, DELETE
- **Schema Validation**: JSON schema validation for API responses

### UI Testing
- **Locators**: CSS selectors, XPath, text-based selectors
- **User Interactions**: Clicks, typing, form submissions
- **Dropdowns**: Standard, bootstrap, and auto-suggest dropdowns
- **File Operations**: Upload and download files
- **Dialogs & Popups**: Alert handling, authentication popups
- **Tables**: Dynamic tables, pagination
- **Frames**: iFrame interactions
- **Assertions**: Built-in and custom assertions
- **Auto-waiting**: Playwright's automatic waiting mechanisms
- **Browser Context**: Managing browser contexts and cookies

## Contributing

This is a learning project, but suggestions and improvements are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is created for educational purposes.

## Author

**Amila Tucovic**

- Created during QA Automation Internship
- Built following Udemy course curriculum

---

**Note**: This is a practice project for learning Playwright automation with TypeScript.