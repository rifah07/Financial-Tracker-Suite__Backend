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