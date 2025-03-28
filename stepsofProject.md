Installation commands:

1. npm init
2. npm install express
3. npm install nodemon
4. npm install express-async-errors
5. npm install mongoose
6. npm install dotenv
7. npm install bcrypt/ npm i @gab706/becrypt
8. npm install jsonwebtoken
9. npm i validator
10. npm i nodemailer



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
28. Add login roure in users.routes.js
29. CReate a file as "userDashboard.js" and add the function, export t and add its route like point 28.
30. Type above 8 point code in terminal and run, this is JWT for implementing authetication.
31. Import jsonwebtoken in login.js.
32. Add secret in .env
33. Save and Run.
34. Create a new folder in the main project folder as 'middleware" and inside that reate a new file as 'auth.js"
35. Go to "user.routes.js" and before the Dashboard route, add route as you see in the file.
36. In auth.js, write the codes and see the 'req.use" in userDashboard by console.
37. In postman, go to dashboard and choose "Authorization" ans then "Bearer Token" and enter you access token there.
38. Save and run (npm start).
39. Go to userDashboard now
40. Write codes to fetch data by req.user
41. See the code where data shows and add .select("-password -the filed you want not to show") to hide the foels you don't want to see.
42. In users.model, add timestamp to true ans create new account and log in.
43. Update register.js, with jsonwebtokrn verification.
44. Create new folder as 'managers", new file in it as jwtManager.js.
45. Centralize jwt sign process by writing code in jwtManager.js. 
46. Then update register and login with jwtManager.
47. In models folder, duplicate the users.model.js and rename as transactions.model.js and update the file.
48. Add the model route in app.js.
49. Add transactionRoute file and add the route in app.js.
50. Create new folder, "controllers" inside transactions folder and create a new file as 'addIncome.js".
51. Write code in addIncome.js.
52. Run point 9 in terminal.
53. Add code in addIncome.js.
54. Now copy paste addIncome.js and rename as addExpense.js.
55. Update addExpense.js, change function name and module exports name, and
56. In part of "$inc", multiply the ammount with "-1"
57. Add custom validation for negative value input in addIncome, and addExpense part, add these routes.
58. Save and run in postman (i.e. "http://localhost:8000/api/transactions/addExpense",
     "http://localhost:8000/api/transactions/addIncome").
59. Add getTransaction.js in transactions>controllers to read/get transaction info.
60. Add this in routes i.e.-> transactionRoutes.get("/", getTransactions),
    (to test in postman - http://localhost:8000/api/transactions).
61. This route is like this because to get results easity, if someone wants to just get the result, just pass '/' in api.
62. In getTransactions.js, write code to find transaction by user_id.
63. This is a route that can filter expense or income, without hard coding routes-> http://localhost:8000/api/transactions?transaction_type=income
64. This part is called query string parameter-> "?transaction_type=income"
65. To get this, don't need to craete files, simply add in the getTransactions find filter this code -> "...req.query,"
66. ...req.query-> is same as same as transaction_type: 'income'/'expense' this query here.
67. To filter with multiple variable, you can just use "&", like-> "http://localhost:8000/api/transactions?transaction_type=expense&amount=10"
68. Go to userDashboard.js, add transactions model and find transactions by id.
69. Add sort and limit finction to order and see only some recent transactions.
70. Run in your terminal-> the 10 point above, nodemailer.
71. Go and create an account in "Mailtrap", so that we can work with email without sending to real recepents.
72. Now, copy and paste code for "node" /"nodemailer" in registration code.
73. Add from, to, text, subject for email, after importing nodemailer in register.js.
74. Now after registration you should see mail in Mailtrap mailbox.
75. Add 'html' part also, for sending mail as in the code file.
76. Now, to recover when forgotten password create a file in 'users' -> 'controllers' -> "forgotPassword.js".
77. Initialize and add in routes.
78. Update users model file, add a new field as 'reset_code'.
79. Update forgotePassword.js with code.
80. We are usimg email sending process multiple times, so we can use it reusable. For that, in 'managers' folder createa  file as "emailManager.js".
81. In that file, add to, html, subject, text instead of req, res because they are dynamic and will be passed when called this module.
82. Update for forget password, reset password also.
83. Now it is time for delete transaction part.
84. Add 'deleteTransaction.js' inside transactions->controllers.
85. Write the code, add the route and save then check.
86. To edit any transaction, add new file side transactions->controllers as 'editTransaction.js" and add in routes.
87. 
