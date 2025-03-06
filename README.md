Backend (Node.js + Express)
Database Selection: MongoDB (using Mongoose) for easy document-based storage.
Routes to Implement:
POST /setup: Create a new wallet.
POST /transact/:walletId: Handle credit/debit transactions.
GET /transactions: Fetch wallet transactions with pagination.
GET /wallet/:id: Retrieve wallet details.


Concurrency Handling:
Use transactions (session in MongoDB) to prevent race conditions.
Ensure atomic updates to maintain wallet balance consistency.
Frontend (React.js + Tailwind)
Page 1 (Wallet Setup & Transactions):
If no wallet exists, show a form to create one.
Display wallet balance and allow transactions (credit/debit toggle).
Store wallet ID in localStorage for persistence.

Page 2 (Transaction History):
Show transaction table with sorting (date, amount).
Implement pagination and CSV export.

Deployment
Backend: Deploy using Vercel, Railway, or Render.
Database: Use MongoDB Atlas.
Frontend: Deploy using Vercel or Netlify.
Extras

Create a README explaining API endpoints.
Record a video walkthrough of your implementation.
Share the GitHub repo privately with dev-highlevel.
Would you like me to generate boilerplate code for the backend? 🚀