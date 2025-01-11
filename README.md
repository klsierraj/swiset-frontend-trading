# Vue Application

This is a Vue 3 application that allows users to create and manage trades. The application also lists brokers and assets associated with a user. However, before creating a trade, certain prerequisites must be fulfilled.

## Prerequisites

- Ensure you have **Node.js** (v16 or higher) installed.
- Install **npm** or **yarn** for dependency management.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:5173`.

   ```

## Registration Flow

The application includes a user registration flow with the following features:

1. **Email Validation:**
   - Upon entering an email, the application checks if the email is already associated with an existing user.

2. **Account Verification:**
   - After registration, a verification code is sent to the user's email.
   - The user must enter this code to activate their account.

## Creating a Trade

Before you can create a trade, you need to ensure the following:

1. **Assets:**

   - Assets need to be assigned to a user.
   - The application currently lists assets, but there is no endpoint available to create assets for a user.

2. **Brokers:**

   - Brokers are listed and can be created.
   - Use the "Add Broker" functionality in the app to create a broker if none are available.

3. **Trade Creation:**

   - Once assets and brokers are set up, you can create trades by providing the necessary details like side (BUY/SELL), mood, prices, and associated asset and broker IDs.
   - Ensure the details are valid to avoid validation errors.

## Notes
- The functionality to create a broker has been implemented, but it only allows adding one broker. This is designed to simulate the flow of creating a trade and ensuring the prerequisites for manually adding a trade are met.
- Assets and brokers are prerequisites for creating trades.
- While the app is capable of listing and creating brokers, the lack of an endpoint to create assets limits some functionalities.
- FOR NOW, ENSURE ASSETS ARE PRE-ASSIGNED TO THE USER THROUGH THE SWISET APP
- Due to time reasons it was not possible to implement the tests :c 


## Troubleshooting

If you encounter any issues:

- Ensure your backend API is running and accessible.
- Verify that the API endpoints for brokers and trades are properly configured.
- Check the browser console for any errors.

## Features Overview

- **Registration:** Includes email validation and account verification via a code.
- **Brokers:** List, create, and manage brokers.
- **Assets:** View assets associated with a user.
- **Trades:** Create and manage trades with validations.

For further assistance, feel free to reach out or refer to the codebase for additional context.

