Installation commands:

1. npm init
2. npm install express
3. npm install nodemon
4. npm install express-async-errors
5. npm install mongoose
6. npm install dotenv
7. 



Steps:

1. Install the first 5 packages and create a file in the project directory as "app.js"
2. Go to "package.json" and in "scripts" add "," at end of 'test" line and add new line for start as-> "start": "nodemon app.js"
3. In app.js, require/import express, express-async-errors
4. Create an express app(const app, app.listen...), the code is in app.js
5. Create a new folder named "handler" and a file inside it as "errorHandler.js" and write code for it, see in the file
6. In terminal type "npm start" to run the project, it should be running.
7. Now install packages in the above list (6)
8. Go to 'app.js' and import "dotenv"
9. Import mongoose, write codes in app.js to connect database, add api in the .env file showed as example.env file
10. Now to do modular configuration, to next steps, it is needed to maintain large project efficiently and easily
11. Create a new folder in the main project directory as "modules" and add folder "transactions" and "users"
12. Inside "modules/users" add a file "users.routes.js"
13. Inside "modules/users" add a folder as "controllers" and add a file as "register.js"
14. Write code in register.js for just cheking status (just for now) and add routing code for it in 'users.routes.js'
15. Add 'users.routes.js' in app,js and run code then check in postman
