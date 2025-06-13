/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management routes
 */
/**
 * @swagger
 * /api/transactions/addIncome:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Add income transaction
 *     description: Adds a new income transaction for the authenticated user and increases the user balance.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - remarks
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               remarks:
 *                 type: string
 *                 example: Freelance payment for May
 *     responses:
 *       200:
 *         description: Income added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Income added successfully
 *       400:
 *         description: Invalid input or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 error:
 *                   type: string
 *                   example: Amount must be a number
 */
/**
 * @swagger
 * /api/transactions/addExpense:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Add expense transaction
 *     description: Adds a new expense transaction for the authenticated user and decreases the user balance.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - remarks
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 150
 *               remarks:
 *                 type: string
 *                 example: Grocery shopping
 *     responses:
 *       200:
 *         description: Expense added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Expense added successfully
 *       400:
 *         description: Invalid input or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 error:
 *                   type: string
 *                   example: Amount must be a number
 */
/**
 * @swagger
 * /api/transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get all transactions for the logged-in user
 *     description: Retrieves all income and/or expense transactions for the authenticated user. Optionally filter by transaction type using query parameters.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: transaction_type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Filter transactions by type (income or expense)
 *     responses:
 *       200:
 *         description: List of user's transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: All your transaction information are here
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 665fa6d842e82a6dd63bda1f
 *                       user_id:
 *                         type: string
 *                         example: 665fa6c2bfa29a29f2e5a10a
 *                       amount:
 *                         type: number
 *                         example: 500
 *                       transaction_type:
 *                         type: string
 *                         example: income
 *                       remarks:
 *                         type: string
 *                         example: Freelance payment
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid query or authentication error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 error:
 *                   type: string
 *                   example: Unauthorized or invalid input
 */
/**
 * @swagger
 * /api/transactions/{transaction_id}:
 *   delete:
 *     tags:
 *       - Transactions
 *     summary: Delete a specific transaction
 *     description: Deletes a transaction by ID and updates the user's balance accordingly (reverses the transaction).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transaction_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ObjectId of the transaction to be deleted
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Transaction deleted successfully
 *       400:
 *         description: Invalid transaction ID or transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 error:
 *                   type: string
 *                   example: Please provide a valid id!
 */
/**
 * @swagger
 * /api/transactions/:
 *   patch:
 *     tags:
 *       - Transactions
 *     summary: Edit an existing transaction
 *     description: Update remarks, amount, and/or transaction type of a specific transaction. It also adjusts the user's balance accordingly.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transaction_id
 *             properties:
 *               transaction_id:
 *                 type: string
 *                 example: 665d2e3f60c3402d3c45a1a8
 *               remarks:
 *                 type: string
 *                 example: Updated expense for groceries
 *               amount:
 *                 type: number
 *                 example: 200
 *               transaction_type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Transaction updated successfully!
 *       400:
 *         description: Invalid input or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 error:
 *                   type: string
 *                   example: You must enter Transaction Id
 */
/**
 * @swagger
 * /api/transactions/report:
 *   get:
 *     summary: Generate transaction report with filters and download option
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Filter by transaction type (income or expense)
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering transactions (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering transactions (YYYY-MM-DD)
 *       - in: query
 *         name: download
 *         schema:
 *           type: string
 *           enum: [csv]
 *         description: Set to 'csv' to download the report as a CSV file
 *     responses:
 *       200:
 *         description: Filtered transactions or downloadable CSV
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6658dce9fc13ae1d610002b4"
 *                       user_id:
 *                         type: string
 *                         example: "6658dc8dfc13ae1d610001f1"
 *                       amount:
 *                         type: number
 *                         example: 150
 *                       transaction_type:
 *                         type: string
 *                         example: expense
 *                       remarks:
 *                         type: string
 *                         example: "Bought books"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-10T09:00:00Z"
 *       400:
 *         description: Invalid input or missing parameters
 */
