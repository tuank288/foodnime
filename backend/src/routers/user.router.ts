import { Router } from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import { db } from "../server";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { HTTP_BAD_REQUEST } from '../constants/http_status';

const router = Router();

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    const query = `SELECT email, full_name, password, address FROM users WHERE email = ?`;
    const values = [email];

    db.query(query, values, async (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else if (results.length === 0) {
            res.status(HTTP_BAD_REQUEST).send("Username or password not valid!");
        } else {
            const user = results[0];
            if(await bcrypt.compare(password, user.password)) {
              const dbUser = {
                email: user.email,
                full_name: user.full_name,
                address: user.address,
                role: user.role
            }
                res.send(generateTokenResponse(dbUser));
            } else {
                res.status(HTTP_BAD_REQUEST).send("Username or password not valid!");
            }
        }
    });
});

router.post('/register', (
     (req, res) => {
      const {full_name, email, phone_number, password, address} = req.body;
      const query = 'SELECT * FROM users WHERE email = ? OR phone_number = ?';
      const values = [email, phone_number];
  
      db.query(query, values, async (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send("Internal Server Error");
        } else if (results.length > 0) {
          res.status(HTTP_BAD_REQUEST).send("Email hoặc số điện thoại đó đã tồn tại!");
        } else {
          const encryptedPassword = await bcrypt.hash(password, 8);
          const query = 'INSERT INTO users (full_name, email, phone_number, password, address, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
          const values = [full_name, email, phone_number, encryptedPassword, address, 2];
  
          db.query(query, values, async (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).send("Internal Server Error");
            } else {
              const dbUser = {
                id: results.insertId,
                full_name,
                email,
                phone_number,
                password: encryptedPassword,
                address,
                role: 2,
              };
              res.send(generateTokenResponse(dbUser));
            }
          });
        }
      });
    }
  ));



const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email:user.email, role:user.role
    }, "SomeRandomText", {
        expiresIn: "30d"
    })
    user.token = token;
    return user;
}


export default router;



// router.post("/login", (req, res) => {
//     const {email, password} = req.body;
//     const user = sample_users.find(user => user.email === email && user.password === password)

//     if(user){
//         res.send(generateTokenResponse(user));
//     }else{
//         res.status(400).send("User name of password not valid!")
//     }
// })