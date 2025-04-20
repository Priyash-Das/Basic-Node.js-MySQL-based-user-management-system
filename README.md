# Basic Node with MySQL

A Node.js + MySQL based user management system with CRUD functionality, using EJS, and fake user generation via Faker.js.

## 📽️ Demo Video

👉 [Watch the demo](https://github.com/Priyash-Das/Photos/blob/main/Basic%20Node.js%20%2B%20MySQL%20based%20user%20management%20system.mkv)

## 🚀 Project Overview

**DeltaUserManager** is a web application that allows you to:
- Display the total number of users
- View all registered users
- Edit usernames (with password confirmation)

## 🧠 Core Features

- **Fake user generation** with [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)
- **User management** with MySQL
- **Templating engine**: EJS
- **Method override** for supporting PATCH in forms
- Clean routing with Express.js

## 📁 Project Structure

```
Project-root/
        │
        ├── node_modules/
        │
        ├── views/
        │       ├── home.ejs
        │       ├── showusers.ejs
        │       ├── edit.ejs
        │
        ├── index.js
        ├── package-lock.json
        ├── package.json
        │
        └── schema.sql
```

## 🔧 Tech Stack

| Tool/Library         | Purpose                                |
|----------------------|----------------------------------------|
| Node.js              | Backend runtime environment            |
| Express.js           | Web framework                          |
| MySQL                | Relational database                    |
| EJS                  | Templating engine                      |
| method-override      | Support for PUT/PATCH in forms         |
| @faker-js/faker      | Fake data generation                   |
| uuid                 | Unique user ID generation              |
| nodemon              | Dev environment auto-restart           |
