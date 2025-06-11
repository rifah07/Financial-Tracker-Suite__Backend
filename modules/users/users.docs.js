/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: User login
 *     description: Authenticates a user with email and password, returns access token and sets HTTP-only cookies for both access and refresh tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: "mySecurePassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only cookies containing access token (15 min) and refresh token (7 days)
 *             schema:
 *               type: string
 *               example: "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict; Max-Age=900, refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict; Max-Age=604800"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   type: string
 *                   example: "Login Successful"
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token for API authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWJjZGVmMTIzNDU2Nzg5MCIsImlhdCI6MTY4OTc4OTEyMywiZXhwIjoxNjg5Nzg5ODIzfQ.abc123def456"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email and password are required"
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     email_not_found:
 *                       value: "This email does not exist"
 *                     wrong_password:
 *                       value: "Email and Password do not match"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *     security: []
 */
/**
 * @swagger
 * /api/users/dashboard:
 *   get:
 *     tags: [Users]
 *     summary: Get user dashboard data
 *     description: Retrieves authenticated user's profile information and recent transactions. User must be logged in with valid JWT token.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: object
 *                   description: User profile data (password excluded)
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64abcdef1234567890"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     balance:
 *                       type: number
 *                       example: 1500.75
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-10T10:30:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-15T14:20:00.000Z"
 *                 transactions:
 *                   type: array
 *                   description: Last 5 transactions ordered by creation date (descending)
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64xyz789abc123def456"
 *                       user_id:
 *                         type: string
 *                         example: "64abcdef1234567890"
 *                       amount:
 *                         type: number
 *                         example: -50.25
 *                       type:
 *                         type: string
 *                         example: "debit"
 *                       description:
 *                         type: string
 *                         example: "Online purchase"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-15T09:45:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-15T09:45:00.000Z"
 *       400:
 *         description: Bad request - Database error or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   examples:
 *                     user_not_found:
 *                       value: "User not found"
 *                     database_error:
 *                       value: "Database connection error"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   examples:
 *                     no_token:
 *                       value: "Access token required"
 *                     invalid_token:
 *                       value: "Invalid or expired token"
 *       403:
 *         description: Forbidden - Token valid but insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "Access denied"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT access token obtained from login
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 *       description: HTTP-only cookie containing JWT access token
 */