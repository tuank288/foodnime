import { Router } from "express";
import { db } from "../server";
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, HTTP_OK } from '../constants/http_status';
import { OrderStatus } from '../constants/order_status';
import auth from '../middlewares/auth.mid';


const router = Router();
router.use(auth);

router.post('/create', (req:any, res) => {
  const requestOrder = req.body;

  if(requestOrder.items.length <= 0){
    res.status(HTTP_BAD_REQUEST).send('Giỏ hàng trống');
    return;
  }
  const deleteQuery = 'DELETE FROM orders WHERE user_id = ? AND status = ?';
  const deleteValues = [req.user_id, OrderStatus.NEW];
  db.query(deleteQuery, deleteValues, (error, results) => {
    if(error){
      console.log(error);
      res.status(HTTP_INTERNAL_SERVER_ERROR).send("Internal Server Error");
      return;
    }
    console.log(`${results.affectedRows} order(s) deleted`);
  });

  let restaurantId;  
  for (const item of requestOrder.items) {
    restaurantId = item.food.restaurant_id;
  }
  // console.log(restaurantId);
  
  const orderData = {
    user_id: req.user_id,
    restaurant_id: restaurantId,
    receiver: requestOrder.full_name,
    delivery_phone: requestOrder.phone_number,
    order_date: new Date,
    total_price: requestOrder.total_price,
    address: requestOrder.address,
    addressLatLng: JSON.stringify(requestOrder.addressLatLng),
    status: OrderStatus.NEW,
    updated_at: new Date
  };
  
  db.query(`INSERT INTO orders SET ?`, orderData, (error, results) => {
    if (error) {
      console.log(error);
      res.status(HTTP_INTERNAL_SERVER_ERROR).send('Không tạo được đơn hàng mới');
      return;
    }
    // Lấy id của bản ghi mới thêm vào bảng order_id
    const order_id = results.insertId;
    // Thêm bản ghi mới vào bảng order_items
    const insertItemsSql =
      'INSERT INTO order_items (order_id, food_id, quantity, price, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)';
    let successCount = 0;
    for (const item of requestOrder.items) {
      const insertItemsValues = [
        order_id,
        item.food.food_id,
        item.quantity,
        item.price,
        new Date(),
        new Date(),
      ];
      db.query(insertItemsSql, insertItemsValues, (error, itemsResult) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`New order item with ID ${itemsResult.insertId} has been created`);
        }
        successCount++;
        if (successCount === requestOrder.items.length) {
          res.send({ success: true });
        }
      });
    }
  });
});


router.get('/newOrderForCurrentUser', async (req, res) => {
  try {
    const order = await getNewOrderForCurrentUser(req);

    if (order) {
      res.send(order);
    } else {
      res.status(HTTP_BAD_REQUEST).send();
    }
  } catch (error) {
    console.error(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR).send();
  }
});  

router.post('/pay', async (req: any, res) => {
  let { payment_id } = req.body;
  let status;
  if(!payment_id)
  {
    status = OrderStatus.UNPAID
  }else{
    status = OrderStatus.PAYED
  }
  const order:any = await getNewOrderForCurrentUser(req);

  if (!order) {
    res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
    return;
  }
  const query = `
    UPDATE orders SET payment_id = ? , status = ? WHERE order_id = ?`;
  const values = [payment_id, status, order.order_id];
  
  db.query(query, values, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(HTTP_INTERNAL_SERVER_ERROR).send('Failed to update order!');
    } else {
      // console.log(order);
      res.status(200).send( order.order_id.toString());
    }
  });
});

router.get('/track/:orderId', async (req:any, res:any) => {
  const orderId = req.params.orderId  
  const query = `SELECT orders.*, users.*, order_items.*, food.*, orders.address
                 FROM orders
                 JOIN users ON orders.user_id = users.user_id
                 JOIN order_items ON orders.order_id = order_items.order_id
                 JOIN food ON order_items.food_id = food.food_id
                 WHERE orders.order_id = '${orderId}'
                 `;
  db.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
      return;
    }
    if (results.length === 0) {
      
      res.status(404).send('Order not found');
      return;
    }
    const order = {
      order_id: results[0].order_id,
      items: results.map((result:any) => ({
        food: {
          food_id: result.food_id,
          category_id: result.category_id,
          restaurant_id: result.restaurant_id,
          food_name: result.food_name,
          price: result.price,
          food_image: result.food_image
        },
        price: result.price * result.quantity,
        quantity: result.quantity,
      })),
      total_price: results[0].total_price,
      user_id: results[0].user_id,
      receiver: results[0].receiver,
      delivery_phone: results[0].delivery_phone,
      order_date: results[0].order_date,
      email: results[0].email,
      payment_id: results[0].payment_id,
      address: results[0].address,
      addressLatLng: JSON.parse(results[0].addressLatLng),
      status: results[0].status,
      updated_at: results[0].updated_at,
    };
    // console.log(order);
    res.send(order);
  });
})


router.get('/get-orders', async (req:any, res:any) => {
  const userId = req.user_id
  const query = `SELECT orders.*, users.*, order_items.*, food.*
                 FROM orders
                 JOIN users ON orders.user_id = users.user_id
                 JOIN order_items ON orders.order_id = order_items.order_id
                 JOIN food ON order_items.food_id = food.food_id
                 WHERE orders.user_id = '${userId}' AND status != '${OrderStatus.NEW}'
                 `;
  db.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
      return;
    }
    if (results.length === 0) {
      
      res.status(404).send('Order not found');
      return;
    }
    const orders = results.map((result: any) => ({
      order_id: result.order_id,
      items: [
        {
          food: {
            food_id: result.food_id,
            category_id: result.category_id,
            restaurant_id: result.restaurant_id,
            food_name: result.food_name,
            price: result.price,
            food_image: result.food_image
          },
          price: result.price * result.quantity,
          quantity: result.quantity,
        }
      ],
      total_price: result.total_price,
      user_id: result.user_id,
      full_name: result.full_name,
      phone_number: result.phone_number,
      receiver: result.receiver,
      delivery_phone: result.delivery_phone,
      order_date: result.order_date,
      email: result.email,
      payment_id: result.payment_id,
      address: result.address,
      addressLatLng: JSON.parse(result.addressLatLng),
      status: result.status,
      active: result.active,
      updated_at: result.updated_at,
    }));
    // console.log(orders);
    res.send(orders);
  });
})

router.put('/update-user', (req:any, res) => {
  const userId  = req.user_id
  
  const { full_name, phone_number, address} = req.body;
  
  if (!full_name && !phone_number && !address) {
    return res.status(HTTP_BAD_REQUEST).send('Không thể để trống');
  }
  
  const updateUser = `UPDATE users SET full_name = ?, phone_number = ?, address = ?, updated_at = NOW() 
                      WHERE user_id = ?`
  const valueUser = [full_name, phone_number, address, userId]
  db.query(updateUser, valueUser,(err, result) => {
  if (err) {
      console.log(err);
      return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
  }
  res.send(result[0]);
  })
})

export default router;

async function getNewOrderForCurrentUser(req: any) {
  const userId = req.user_id;
  const query = `SELECT orders.*, users.*, order_items.*, food.*, orders.address
  FROM orders
  JOIN users ON orders.user_id = users.user_id
  JOIN order_items ON orders.order_id = order_items.order_id
  JOIN food ON order_items.food_id = food.food_id
  WHERE orders.user_id = '${userId}' AND orders.status = '${OrderStatus.NEW}'`;
  return new Promise((resolve, reject) => {
    db.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        if(results.length > 0) {
          const order = {
            order_id: results[0].order_id,
            items: results.map((result: any) => ({
              food: {
                food_id: result.food_id,
                category_id: result.category_id,
                restaurant_id: result.restaurant_id,
                food_name: result.food_name,
                price: result.price,
                food_image: result.food_image
              },
              price: result.price * result.quantity,
              quantity: result.quantity,
            })),
            total_price: results[0].total_price,
            user_id: results[0].user_id,
            receiver: results[0].receiver,
            delivery_phone: results[0].delivery_phone,
            address: results[0].address,
            addressLatLng: JSON.parse(results[0].addressLatLng)
          };
          // console.log(order);
          
          resolve(order);
        }else {
          resolve(null);
        }
      } 
    });
  });
}

