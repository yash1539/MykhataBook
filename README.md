Backend (Node.js + Express)

POST /setup: Create a new wallet.
POST /transact/:walletId: Handle credit/debit transactions.
GET /transactions: Fetch wallet transactions with pagination.
GET /wallet/:id: Retrieve wallet details.

env - MONGO_URI

steps-
npm install
npm run dev


Frontend (React.js + Tailwind)

Page 1 (Wallet Setup & Transactions):
If no wallet exists, show a form to create one.
Display wallet balance and allow transactions (credit/debit toggle).
Store wallet ID in localStorage for persistence.
Show transaction table with sorting (date, amount).
Implement pagination and CSV export.

steps-
npm install
npm start
npm run build


MongoDB with Mongoose for schema validation.
Wallet and Transaction as separate collections (1-to-Many relationship).
Balance stored in both Wallet and Transaction for audit tracking.
Indexes on walletId and date for faster lookups.
PLEASE REFER MODELS


//we can use deployed URL: https://mcq-live-test.onrender.com for PROD
setup:
curl --location 'http://localhost:6000/api/setup' \
--header 'Content-Type: application/json' \
--data '{
    "name":"yash",
    "balance":"20"
}'




LOOM- https://www.loom.com/share/95cd8f3db27b42ed8ce2718b924b71e8?sid=8e8ff5b3-3da0-4490-ba0e-2b6cf8c5a5e5

DEPLOYED_URL- https://67cd21ec5e0d2d5f61c6539c--stellular-mooncake-4fc274.netlify.app/