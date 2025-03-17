Installation commands:

1. npm init
2. npm install express
3. npm install nodemon
4. npm install express-async-errors
5. npm install mongoose
6. npm install dotenv
7. npm install bcrypt/ npm i @gab706/becrypt



Steps:

1. Install the first 5 packages and create a file in the project directory as "app.js"
2. Go to "package.json" and in "scripts" add "," at end of 'test" line and add new line for start as-> "start": "nodemon app.js"
3. In app.js, require/import express, express-async-errors
4. Create an express app(const app, app.listen...), the code is in app.js
5. Create a new folder named "handler" and a file inside it as "errorHandler.js" and write code for it, see in the file
6. In terminal type "npm start" to run the project, it should be running.
7. Add "models" folder ans add user schema there, with validation message
8. Now install packages in the above list (6)
9. Go to 'app.js' and import "dotenv"
10. Import mongoose, write codes in app.js to connect database, add api in the .env file showed as example.env file
11. Now to do modular configuration, to next steps, it is needed to maintain large project efficiently and easily
12. Create a new folder in the main project directory as "modules" and add folder "transactions" and "users"
13. Inside "modules/users" add a file "users.routes.js"
14. Inside "modules/users" add a folder as "controllers" and add a file as "register.js"
15. Write code in register.js for just cheking status (just for now) and add routing code for it in 'users.routes.js'
16. Add 'users.routes.js' in app,js and run code then check in postman
17. A tip: to get a specific code file , in VS Code press CTRL + P, and type file name
18. Go to register.js
19. Import mongoose
20. Add usersModel, this name should be same as you exported in "models" it Now add registration part code in register..js
21. Add registration paer code in register.js, add custom validation there for confirming all type of validations and handling error
22. Now run, registration must be working
23. Install 'becrypt' to encode password for ensuring security, use code in above point 7
24. Now in register.js, use bacrypt to has password (use second parameter to enode multiple times 10-12 is standard) and save.
25. Run the project, it must be ok.
26. Impliment login paer as in file login.js
27. In login.js, decrypt password using becrypt and check password to login.