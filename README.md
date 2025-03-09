Backend (Node.js + Express)

POST /setup: Create a new wallet.
POST /transact/:walletId: Handle credit/debit transactions.
GET /transactions: Fetch wallet transactions with pagination.
GET /wallet/:id: Retrieve wallet details.


Frontend (React.js + Tailwind)

Page 1 (Wallet Setup & Transactions):
If no wallet exists, show a form to create one.
Display wallet balance and allow transactions (credit/debit toggle).
Store wallet ID in localStorage for persistence.
Show transaction table with sorting (date, amount).
Implement pagination and CSV export.