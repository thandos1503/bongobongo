# Bongobongo API & UI Test Automation

This repository contains automated tests for Bongobongo's API and UI using Playwright and k6.

## Project Structure

```
pw-api-tests/
├── cicd/
│   ├── api-performance-test.yml   # GitHub Actions workflow for API performance tests
│   └── ui-test.yml                # GitHub Actions workflow for UI tests
├── features/
│   └── api.feature                # Cucumber feature files for API scenarios
├── tests/
│   ├── performance/               # Performance test scripts (Playwright or k6)
│   └── ui/                        # Playwright UI test scripts
├── package.json                   # Node.js dependencies and scripts
└── README.md                      # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/)
- [Playwright](https://playwright.dev/)
- [k6](https://k6.io/) (if using k6 for performance tests)

### Installation

1. Clone the repository:
    ```sh
    git clone <repo-url>
    cd pw-api-tests
    ```

2. Install dependencies:
    ```sh
    npm ci
    ```

3. Install Playwright browsers:
    ```sh
    npx playwright install
    ```

## Running Tests Locally

### API Functional Tests (Playwright)

```sh
npm test
```

### API Performance Tests (k6)

```sh
k6 run tests/performance/performance.js
```

> If you use Playwright for API performance, run:
> ```sh
> npx playwright test tests/performance/
> ```

## CI/CD Workflows

- **UI Tests:** `cicd/ui-test.yml`
- **API Performance Tests:** `cicd/api-performance-test.yml`

These workflows run automatically on push to `main` or via manual trigger.

  