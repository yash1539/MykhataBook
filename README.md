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
// trasact walletId:
curl --location 'http://localhost:8080/api/transact/67cda8255ce56edceff6bf9d' \
--header 'Content-Type: application/json' \
--data '{
    "description":"trans",
    "amount":"-1"
}'
// get transaction by walletId:
curl --location 'http://localhost:8080/api/transactions?walletId=67cda8255ce56edceff6bf9d'

// get wallet by walletId
curl --location 'http://localhost:8080/api/wallet/67cda8255ce56edceff6bf9d'




LOOM- https://www.loom.com/share/9f9fbd5d657046e998dbaf064d70bfa3?sid=3c927777-14cf-4c30-833f-925f9290aa9b

DEPLOYED_URL- https://67cdd2b467df743b185a7072--stellular-mooncake-4fc274.netlify.app/