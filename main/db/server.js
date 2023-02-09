const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer')
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies_db'
  },
  console.log(`Connected to the employee_db database.`)
);