# Những thứ cần install trong cmd

Install Git:
git init
git commit -m "first commit”
git branch -M main
git remote add origin https://github.com/Phu-not-Phu/ProjectSercurity_Health.git
git push -u origin main

Install mysql lib:
npm install express 
npm install cors
npm install body-parser --save 
npm install nodemon 
npm install mysql (hoặc mysql2)

Install jwt:
npm init
npm i express jsonwebtoken dotenv
-> Allow to create a .env file to store secret key.
npm i express bcrypt
-> Use bcrypt library for encrypt and decrypt password stuffs.
npm i --save-dev nodemon

Tạo secret key dùng node:
node
require('crypto').randomBytes(64).toString('hex')
