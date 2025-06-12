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
