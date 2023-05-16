import { Router } from "express";
import jwt from 'jsonwebtoken';
import { db } from "../server";
import bcrypt from 'bcryptjs';
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR } from '../constants/http_status';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    db.query(query, values, async (error, results) => {
        if (error) {
            console.log(error);
          return res.status(HTTP_INTERNAL_SERVER_ERROR).send("Internal Server Error");
        } else if (results.length === 0) {
          return res.status(HTTP_BAD_REQUEST).send("Tên người dùng hoặc mật khẩu không hợp lệ!");
        } else {
            const user = results[0];
            if(await bcrypt.compare(password, user.password)) {
              const dbUser = {
                user_id: user.user_id,
                email: user.email,
                full_name: user.full_name,
                address: user.address,
                phone_number: user.phone_number,
                role: user.role
            }
            // console.log(dbUser);
                res.send(generateTokenResponse(dbUser));
            } else {
              return res.status(HTTP_BAD_REQUEST).send("Tên người dùng hoặc mật khẩu không hợp lệ");
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
          return res.status(HTTP_INTERNAL_SERVER_ERROR).send("Internal Server Error");
        } else if (results.length > 0) {
          return res.status(HTTP_BAD_REQUEST).send("Email hoặc số điện thoại đó đã tồn tại!");
        } else {
          const encryptedPassword = await bcrypt.hash(password, 8);
          const query = 'INSERT INTO users (full_name, email, phone_number, password, address, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
          const values = [full_name, email, phone_number, encryptedPassword, address, 2];
  
          db.query(query, values, async (error, results) => {
            if (error) {
              console.log(error);
              return res.status(HTTP_INTERNAL_SERVER_ERROR).send("Internal Server Error");
            } else {
              const dbUser = {
                user_id: results.insertId,
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

  router.post("/login-admin", (req, res) => {
    const {email, password} = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    db.query(query, values, async (error, results) => {
        if (error) {
            console.log(error);
            return  res.status(HTTP_INTERNAL_SERVER_ERROR).send("Internal Server Error");
        } else if (results.length === 0 || results[0].role === '2') {
            return  res.status(HTTP_BAD_REQUEST).send("Tên người dùng hoặc mật khẩu không hợp lệ");
        } else {
            const user = results[0];
            if(await bcrypt.compare(password, user.password)) {
              const dbUser = {
                user_id: user.user_id,
                email: user.email,
                full_name: user.full_name,
                address: user.address,
                phone_number: user.phone_number,
                role: user.role
            }
              res.send(generateTokenResponse(dbUser));
            } 
        }
    });
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign({
    user_id: user.user_id, email:user.email, role: user.role
  },process.env.JWT_SECRET!,{
    expiresIn:"30d"
  });

  return {
    user_id: user.user_id,
    email: user.email,
    full_name: user.full_name,
    phone_number: user.phone_number,
    address: user.address,
    role: user.role,
    token: token
  };
}


export default router;