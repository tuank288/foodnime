import { Router } from "express";
import { db } from "../server";
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderStatus } from '../constants/order_status';
import asyncHandler from 'express-async-handler';
import auth from '../middlewares/auth.mid';
const router = Router();
router.use(auth);

// router.post('/create',(async (req:any, res:any) => {
//     const requestOrder = req.body;

//     if(requestOrder.items.length <= 0){
//         res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
//         return;
//     }

//     const deleteQuery = 'DELETE FROM orders WHERE user_id = ? AND status = ?';
//     const deleteValues = [req.user.id, OrderStatus.NEW];
//     await db.query(deleteQuery, deleteValues);

//     const insertQuery = 'INSERT INTO orders (items, total, status) VALUES (?, ?, ?, ?)';
//     const insertValues = [req.user.id, JSON.stringify(requestOrder.items), requestOrder.total, OrderStatus.NEW];
//     const result = await db.query(insertQuery, insertValues);

//     const newOrder = {
//         id: result.insertId,
//         user_id: req.user.id,
//         items: requestOrder.items,
//         total: requestOrder.total,
//         status: OrderStatus.NEW
//     };
//     res.send(newOrder);
// })

router.post('/create', (req: any, res: any) => {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
        return;
    }

    const deleteQuery = 'DELETE FROM orders WHERE user_id = ? AND status = ?';
    const deleteValues = [req.users.user_id, OrderStatus.NEW];
    db.query(deleteQuery, deleteValues, (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
            return;
        }

        const orderDate = new Date().toISOString().slice(0,19).replace("T"," ");
        const totalPrice = requestOrder.totalPrice;
        const deliveryAddress = requestOrder.address;

        const insertOrderValues = [req.users.user_id, requestOrder.restaurant_id, orderDate, totalPrice, deliveryAddress, OrderStatus.NEW, orderDate, orderDate]
        const insertOrderQuery = `INSERT INTO orders (user_id, restautant_id, order_date, total_price, delivery_address, status, created_at, update_at)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        db.query(insertOrderQuery, insertOrderValues, (error, result) => {
            if (error) {
                console.log('Error deleting order:', error);
                res.status(500).send('Internal Server Error');
                return;
        }})

        const orderId = result.insertId;

        const orderItems = requestOrder.items.map((item: { foodId: any; quantity: any; price: any; }) => [orderId, item.foodId, item.quantity, item.price, orderDate, orderDate]);

        const insertOrderItemQuery = 'INSERT INTO order_items (order_id, food_id, quantity, price, created_at, update_at) VALUES ?';

        db.query(insertOrderItemQuery, [orderItems], (err, result) => {
            if (err) {
                console.log('Error creating order items:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.send({ id: orderId });
        });
        
    })

})


export default router;