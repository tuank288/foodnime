import express from "express";
import cors from "cors";
import mysql from 'mysql';
import foodRouter from './routers/food.router'
import userRouter from './routers/user.router'
import orderRouter from './routers/order.router'
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const server = express();

server.use(express.json());

server.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}))

const port = 6000;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

export const db = mysql.createConnection({
    host: 'localhost',
    user:  dbUser,
    password: dbPassword,
    database: dbDatabase
})

db.connect(function(error: mysql.MysqlError) {
    if(error){
        console.log('Error Connecting to DB')
    }else{
        console.log('Succsessfully Connected to DB')
    }
});

server.listen(port, () => {
    console.log("Website server on http://localhost:" + port)
});

// server.use(express.static('public'));
// server.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'public', 'index.html'))
// })

server.use("/api/foods", foodRouter);
server.use("/api/users", userRouter);
server.use("/api/orders", orderRouter);






