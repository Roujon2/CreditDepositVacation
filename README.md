# Vacation Credit Deposit API

A simple API to handle payment processing using Stripe, designed to accept deposit payments and manage payment intents. This API includes functionality for creating and retrieving payment intents, simulating deposits, and saving payment data.

## Table of Contents
1. [Installation](#installation)
2. [Environment Setup](#environment-setup)
3. [API Endpoints](#api-endpoints)
4. [Testing with Curl](#testing-with-curl)
5. [Notes](#notes)

---

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Roujon2/CreditDepositVacation
   cd server
   ```

2. **Install dependencies**:
   You need to have `npm` or `yarn` installed on your system. Run the following command to install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**:
   Copy the `.env.example` file to `.env` and fill in the necessary credentials (e.g., Stripe keys):
   ```bash
   cp .env.example .env
   ```

   Add the following environment variables to your `.env` file:
   ```env
   SERVER_PORT=3000
   SERVER_HOST=localhost
   NODE_ENV=development
   CORS_ORIGIN=*
   STRIPE_API_SECRET=<your_stripe_secret_key>
   STRIPE_API_KEY=<your_stripe_public_key>
   ```


4. **Run the application**:
   Start the server by running:
   ```bash
   npm start
   # or
   yarn start
   ```

   The API will be available on `http://localhost:3000`.

---

### API Endpoints

#### POST `/api/v1/deposit`
This endpoint creates a new deposit entry.

**Request Body Example**:
```json
{
  "guestName": "John Doe",
  "guestEmail": "john.doe@example.com",
  "checkInDate": "2025-06-01",
  "checkOutDate": "2025-06-10",
  "securityDeposit": 300
}
```

**Response Example**:
```json
{
  "status": "success",
  "message": "Deposit created successfully",
  "data": {
    "depositId": 1
  }
}
```

#### POST `/api/v1/payment/:depositId`
This endpoint processes a payment for a specific deposit, using a payment intent ID from Stripe.

**Request Body Example**:
```json
{
  "paymentIntentId": "pi_1FxyVx2eZvKYlo2CJ7TtN1FG00lD8gkEmA",
  "paymentStatus": "succeeded",
  "paymentMethodId": "pm_card_visa"
}
```

**Response Example**:
```json
{
  "status": "success",
  "message": "Payment created successfully",
  "data": {
    "payment_id": 1
  }
}
```

#### GET `/api/v1/payment/:paymentId`
This endpoint retrieves details of a payment by its paymentId.

**Response Example**:
```json
{
  "status": "success",
  "message": "Payment details retrieved successfully",
  "data": {
    "paymentId": 1,
    "paymentIntentId": "pi_1FxyVx2eZvKYlo2CJ7TtN1FG00lD8gkEmA",
    "paymentStatus": "succeeded",
    "paymentMethodId": "pm_card_visa"
  }
}
```

#### GET `/api/v1/deposit/:depositId`
This endpoint retrieves details of a deposit by its depositId.

**Response Example**:
```json
{
  "status": "success",
  "message": "Deposit details retrieved successfully",
  "data": {
    "depositId": 1,
    "guestName": "John Doe",
    "guestEmail": "john.doe@example.com",
    "checkInDate": "2025-06-01",
    "checkOutDate": "2025-06-10",
    "securityDeposit": 300
  }
}
```

---

### Testing with Curl

Here are some `curl` examples to test the API:

1. **Test Payment Creation**:
   Use this `curl` command to simulate a payment for a deposit. Replace `<depositId>` with the appropriate deposit ID and `<paymentIntentId>` with a real Stripe payment intent ID.

   ```bash
   curl -X POST http://localhost:3000/api/v1/payment/1    -H "Content-Type: application/json"    -d '{"paymentIntentId": "pi_1FxyVx2eZvKYlo2CJ7TtN1FG00lD8gkEmA", "paymentStatus": "succeeded", "paymentMethodId": "pm_card_visa"}'
   ```

   **Expected Response**:
   ```json
   {
     "status": "success",
     "message": "Payment created successfully",
     "data": {
       "payment_id": 1
     }
   }
   ```

2. **Test Payment with Invalid Deposit ID**:
   If you try to use a non-existent deposit ID, you’ll get an error message:
   ```bash
   curl -X POST http://localhost:3000/api/v1/payment/999    -H "Content-Type: application/json"    -d '{"paymentIntentId": "pi_1FxyVx2eZvKYlo2CJ7TtN1FG00lD8gkEmA", "paymentStatus": "succeeded", "paymentMethodId": "pm_card_visa"}'
   ```

   **Expected Response**:
   ```json
   {
     "status": "error",
     "message": "Deposit not found. Payment cannot be processed."
   }
   ```

---

### Notes
  
- **Simulated Database**: The current project uses an in-memory array (`deposits` and `payments`) to simulate a database.