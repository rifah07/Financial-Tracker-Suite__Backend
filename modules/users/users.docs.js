/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     description: Creates a new user account and returns an access token. Sends a welcome email upon successful registration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirm_password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (minimum 5 characters)
 *                 example: "securePassword123"
 *               confirm_password:
 *                 type: string
 *                 format: password
 *                 description: Must match the password
 *                 example: "securePassword123"
 *               balance:
 *                 type: number
 *                 description: Optional initial balance (optional)
 *                 example: 500
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Congratulations! You've registered successfully!"
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request - Missing or invalid inputs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Password must be at least 5 characters long."
 *       409:
 *         description: Conflict - Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "This email already has an account, try with another E-mail"
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
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags: [Users]
 *     summary: User logout
 *     description: Logs out the authenticated user by deleting refresh tokens from database and clearing HTTP-only cookies. Invalidates both specific token and all user tokens for security.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: false
 *       description: No request body required
 *     responses:
 *       200:
 *         description: Logout successful
 *         headers:
 *           Set-Cookie:
 *             description: Clears both access token and refresh token HTTP-only cookies
 *             schema:
 *               type: string
 *               example: "accessToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0, refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
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
 *                   example: "Logged out successfully"
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
 *                     database_error:
 *                       value: "Database connection error"
 *                     token_deletion_failed:
 *                       value: "Failed to delete refresh token"
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
 *         description: Internal server error (fallback for unexpected errors)
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
 *     parameters: []
 *     examples:
 *       successful_logout:
 *         summary: Successful logout with cookies cleared
 *         description: User successfully logged out, all tokens invalidated
 *         value:
 *           status: "Success"
 *           message: "Logged out successfully"
 *       partial_logout:
 *         summary: Logout without refresh token cookie
 *         description: User logged out but no refresh token cookie was present (still successful)
 *         value:
 *           status: "Success"
 *           message: "Logged out successfully"
 */
/**
 * @swagger
 * /api/users/deleteAccount/{user_id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user account
 *     description: |
 *       Permanently deletes the specified user's account (admin/internal use).
 *       Also deletes related refresh tokens and user data, and clears cookies if applicable.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         headers:
 *           Set-Cookie:
 *             description: Clears access and refresh token cookies (if applicable)
 *             schema:
 *               type: string
 *               example: "accessToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
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
 *                   example: "Account deleted successfully"
 *       400:
 *         description: Bad request
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
 *                   example: "User ID required"
 *       401:
 *         description: Unauthorized
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
 *                   example: "Access token required"
 *       404:
 *         description: User not found
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
 *                   example: "User not found or already deleted"
 *       500:
 *         description: Server error
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
 * /api/users/forgotpw:
 *   post:
 *     tags: [Users]
 *     summary: Send password reset code
 *     description: Sends a 5-digit reset code to the user's email address if the account exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Reset code sent to email successfully
 *       400:
 *         description: Bad request (missing email or user not found)
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
 *                   examples:
 *                     missing_email:
 *                       value: "Your E-mail must be provided"
 *                     email_not_found:
 *                       value: "This email address does not exist in the system!"
 *       500:
 *         description: Internal server error (e.g., email sending failed)
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
 *                   example: "Internal server error"
 *     x-codeSamples:
 *       - lang: 'curl'
 *         source: |
 *           curl -X POST https://your-domain.com/api/users/forgot-password \
 *           -H 'Content-Type: application/json' \
 *           -d '{"email": "user@example.com"}'
 *       - lang: 'JavaScript'
 *         source: |
 *           fetch('/api/users/forgot-password', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json'
 *             },
 *             body: JSON.stringify({ email: 'user@example.com' })
 *           })
 *           .then(res => res.json())
 *           .then(data => console.log(data));
 */
