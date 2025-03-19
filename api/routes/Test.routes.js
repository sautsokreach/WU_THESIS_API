import {
  getAllTransaction,
  createTransaction,
} from "../controller/Test.controller.js";

const transaction = (app) => {
  /**
   @swagger
   * /api/PaymentDeposit:
   *   get:
   *     summary: Get all transactions
   *     description: Retrieve a list of all transactions
   *     responses:
   *       200:
   *         description: A list of transactions
   */
  app.get("/api/PaymentDeposit", getAllTransaction);

  /**
   * @swagger
   * /api/PaymentDeposit:
   *   post:
   *     summary: Create a transaction
   *     description: Add a new transaction to the system
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               bill_no :
   *                 type: string
   *                 example: "0000000000"
   *               transaction_id :
   *                 type: string
   *                 example: "0000000000"
   *               transaction_date:
   *                 type: string
   *                 example: "20251903"
   *               transaction_time :
   *                 type: string
   *                 example: "134200"
   *               payer_account_no :
   *                 type: string
   *                 example: "0000000000"
   *               payer_name:
   *                 type: string
   *                 example: "Testing"
   *               currency_code  :
   *                 type: string
   *                 example: "USD"
   *               payment_method  :
   *                 type: string
   *                 example: "BANK"
   *               amount :
   *                 type: string
   *                 example: "0.01"
   *               sender_bank_name :
   *                 type: string
   *                 example: "ABA"
   *               sender_account_name :
   *                 type: string
   *                 example: "test"
   *               settlement_date:
   *                 type: string
   *                 example: "20250319"
   *               settlement_time :
   *                 type: string
   *                 example: "140000"
   *               settlement_status :
   *                 type: string
   *                 example: "YES"
   *               settlement_error_message:
   *                 type: string
   *                 example: "NO ERROR"
   *               remark :
   *                 type: string
   *                 example: "Hello World"

   *     responses:
   *       201:
   *         description: Transaction created successfully
   */
  app.post("/api/PaymentDeposit", createTransaction);
};

export default transaction;
