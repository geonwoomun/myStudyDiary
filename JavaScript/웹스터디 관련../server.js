const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 8080;

const connection = mysql.createConnection({
    host : 'ai.cdxxehj8l1sk.ap-northeast-2.rds.amazonaws.com',
    user : "admin",
    password : 'mypassword',
    database : 'aiDB'
});

connection.connect((error)=> {
    if(error){
        console.log('Error')
    }else {
        console.log('Connected')
    }
})

app.get('/', (req, res) => {
    connection.query("select * from user", (err, rows, field) => {
        if(err){
            console.log('Error');
        }else {
            console.log('Success');
        }
    })
})

app.listen(port, () => {
    console.log(`${port} server opened`)
});
