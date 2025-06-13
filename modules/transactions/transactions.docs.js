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
