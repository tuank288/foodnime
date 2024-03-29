import { Router } from "express";
import { db } from "../server";
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR} from '../constants/http_status';
import bcrypt from 'bcryptjs';
import { OrderStatus } from "../constants/order_status";

const router = Router();

router.get('/get-users', (req, res) => {
    db.query('SELECT * FROM users', (error, result) => {
        if(error) throw error;
        res.send(result);
    })
})

router.get('/orders', (req, res) => {
    db.query(`SELECT * FROM orders WHERE (active = '${OrderStatus.SUCCESS}' OR active = '${OrderStatus.CANCELED}')`, (error, result) => {
        if(error) throw error;
        res.send(result);
    })
})

router.get('/totalPrice', (req, res) => {
    db.query(`SELECT total_price FROM orders WHERE active = '${OrderStatus.SUCCESS}'`, (error, result) => {
        if(error) throw error;
        res.send(result);
    })
})

//  food 
router.get('/get-foods', (req, res) => {
    db.query(`SELECT food.*, food_categories.category_name FROM food
              JOIN food_categories 
              ON food.category_id = food_categories.category_id`, (error, result) => {
        if(error) throw error;
        // console.log(result);
        
        res.send(result);
    })
})

router.post('/post-foods', (req, res) => {
    const { category_id, food_image, food_name, price } = req.body;

    if(!food_name || !price || !food_image || !category_id) {
        return res.status(HTTP_BAD_REQUEST).send('Xin vui lòng điền đầy đủ')
    }

    const foodName = food_name
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());
    
    db.query(`SELECT * FROM food WHERE food_name = '${foodName}'`, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        }
    
        if (results.length > 0) {
          return res.status(HTTP_BAD_REQUEST).send('Tên thực phẩm đã tồn tại');
        }
        
        db.query(`INSERT INTO food(category_id, restaurant_id, food_image, food_name, price, created_at, updated_at)
          VALUES ('${category_id}', 1, '${food_image}', '${foodName}', '${price}', NOW(), NOW())`, (error, result) => {
            if (error) {
              console.log(error);
              return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
            } else {
              console.log(`Inserted ${result.affectedRows} row(s) into food.`);
            }        
            res.send(result);       
          });
      });
})

router.delete('/delete-foods/:foodId', (req, res) => {
    const { foodId } = req.params;
    
    db.query(`DELETE FROM food WHERE food_id = '${foodId}'`, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        } else {
            console.log(`Deleted ${result.affectedRows} row(s) into food.`);
        } 
        res.send(result[0]);
    })
})

router.get('/detail-foods/:foodId', (req, res) => {
    const { foodId } = req.params
    db.query(`SELECT food.*, food_categories.category_name FROM food
            JOIN food_categories 
            ON food.category_id = food_categories.category_id
            WHERE food.food_id = '${foodId}'`, async (error, result) => {
    if (error) {
        console.log(error);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        } else if (result.length === 0) {
            return res.status(404).send('Food not found');
        } 
    res.send(result[0]);
    })      
})

router.put('/update-foods/:foodId', (req, res) => {
    const { foodId } = req.params
    const { food_image, food_name, category_id, price} = req.body;

    const foodName = food_name
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());

    db.query(`UPDATE food 
            SET category_id = '${category_id}', food_image = '${food_image}', food_name = '${foodName}', price = '${price}', updated_at = NOW() 
            WHERE food_id = '${foodId}'`, (err, result) => {
        if (err) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        }
        res.send(result[0]);
    })

})

// categories 
router.get('/get-categories', (req, res) => {
    db.query(`SELECT * FROM food_categories`, (error, result) => {
        if(error) throw error;
        res.send(result);
    })
})

router.delete('/delete-category/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    
    db.query(`DELETE FROM food_categories WHERE category_id = '${categoryId}'`, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        } else {
            console.log(`Deleted ${result.affectedRows} row(s) into food.`);
        } 
        res.send(result[0]);
    })
})

router.post('/post-category', (req, res) => {
    const { category_image, category_name} = req.body;

    if (!category_name || !category_image) {
        return res.status(HTTP_BAD_REQUEST).send('Xin vui lòng điền đầy đủ');
    }
    
    const categoryName = category_name
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());
    
    db.query(`SELECT * FROM food_categories WHERE category_name = '${categoryName}'`, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        }
        if (results.length > 0) {
          return res.status(HTTP_BAD_REQUEST).send('Tên danh mục đã tồn tại');
        }

        db.query(`INSERT INTO food_categories(category_image, category_name, created_at, updated_at)
                VALUES ('${category_image}', '${categoryName}', NOW(), NOW())`, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
            } else {
                console.log(`Inserted ${result.affectedRows} row(s) into food.`);
            }        
            res.send(result);       
        })
    })
})

router.get('/detail-category/:categoryId', (req, res) => {
    const { categoryId } = req.params
    db.query(`SELECT * FROM food_categories 
            WHERE category_id = '${categoryId}'`, async (error, result) => {
    if (error) {
        console.log(error);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        } else if (result.length === 0) {
            return res.status(404).send('Food not found');
        } 
    res.send(result[0]);
    })      
})

router.put('/update-category/:categoryId', (req, res) => {
    const { categoryId } = req.params
    const { category_image, category_name} = req.body;

    if (!category_name) {
        return res.status(HTTP_BAD_REQUEST).send('Please provide category name.');
    }
    const categoryName = category_name
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());

    db.query(`UPDATE food_categories 
            SET category_image = '${category_image}', category_name = '${categoryName}', updated_at = NOW() 
            WHERE category_id = '${categoryId}'`, (err, result) => {
    if (err) {
        console.log(err);
        
        return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
    }
    res.send(result[0]);
    })

})

//user

router.delete('/delete-user/:userId', (req, res) => {
    const { userId } = req.params;
    
    db.query(`DELETE FROM users WHERE user_id = '${userId}'`, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        } else {
            console.log(`Deleted ${result.affectedRows} row(s) into food.`);
        } 
        res.send(result[0]);
    })
})

router.post('/post-user', (req, res) => {
    const { full_name, email, phone_number, password, address, role} = req.body;
    
    if (!full_name || !email || !phone_number || !password || !address || !role) {
        return res.status(HTTP_BAD_REQUEST).send('Xin vui lòng điền đầy đủ');
    }

    const query = 'SELECT * FROM users WHERE email = ? OR phone_number = ?';
    const values = [email, phone_number];

    const fullName = full_name
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());

    const addRess = address
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());

    db.query(query, values, async (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }else if (result.length > 0) {
            return res.status(HTTP_BAD_REQUEST).send("Email hoặc số điện thoại đã tồn tại");
        }else {
            const encryptedPassword = await bcrypt.hash(password, 8);
            const query = 'INSERT INTO users (full_name, email, phone_number, password, address, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
            const values = [fullName, email, phone_number, encryptedPassword, addRess, role];

            db.query(query, values, async (error, results) => {
                if (error) {
                  console.log(error);
                  res.status(500).send("Internal Server Error");
                }
                res.send(results);
            });
        }      
    })
})

router.get('/detail-user/:userId', (req, res) => {
    const { userId } = req.params

    const selectUser = `SELECT user_id, full_name, email, phone_number, address, role, created_at, updated_at FROM users WHERE user_id = ?`;
    const valueUser = [userId];
    db.query(selectUser, valueUser, async (error, result) => {
    if (error) {
        console.log(error);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        } else if (result.length === 0) {
            return res.status(404).send('Food not found');
        } 
    res.send(result[0]);
    })      
})

router.put('/update-user/:userId', (req, res) => {
    const { userId } = req.params
    const { full_name, phone_number, address, role} = req.body;

    if (!full_name || !phone_number || !address || !role) {
        return res.status(HTTP_BAD_REQUEST).send('Xin vui lòng điền đầy đủ');
    }
    
    const checkPhoneNumberQuery = 'SELECT user_id FROM users WHERE phone_number = ? AND user_id != ?';
    db.query(checkPhoneNumberQuery, [phone_number, userId], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        }

        if (rows.length > 0) {
            return res.status(HTTP_BAD_REQUEST).send('Số điện thoại đã tồn tại');
        }
        const fullName = full_name
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());

        const addRess = address
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());

        const updateUser = `UPDATE users SET full_name = ?, phone_number = ?, address = ?, role = ?, updated_at = NOW() 
                            WHERE user_id = ?`
        const valueUser = [fullName, phone_number, addRess, role, userId]
        db.query(updateUser, valueUser,(err, result) => {
        if (err) {
            console.log(err);
            
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        }
        res.send(result[0]);
        })
    });
})

//order

router.get('/get-orders', async(req, res) => {
    const query = `SELECT orders.*, users.*, order_items.*, food.*, orders.updated_at, orders.address
                    FROM orders
                    JOIN users ON orders.user_id = users.user_id
                    JOIN order_items ON orders.order_id = order_items.order_id
                    JOIN food ON order_items.food_id = food.food_id
                    WHERE status != '${OrderStatus.NEW}' AND (active IS NULL OR active = '${OrderStatus.SHIPPED}')
                    GROUP BY orders.order_id, order_items.order_item_id
                    `;
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal server error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Order not found');
            return;
        }
        const orders = results.reduce((accumulator: any, result: any) => {
            const orderIndex = accumulator.findIndex((order: any) => order.order_id === result.order_id);
            const food = {
                food_name: result.food_name,
                price: result.price,
            };
            const orderItem = {
                food: food,
                price: result.price * result.quantity,
                quantity: result.quantity,
            };
            if (orderIndex !== -1) {
                accumulator[orderIndex].items.push(orderItem);
            } else {
                const order = {
                    order_id: result.order_id,
                    items: [orderItem],
                    total_price: result.total_price,
                    user_id: result.user_id,
                    full_name: result.full_name,
                    phone_number: result.phone_number,
                    receiver: result.receiver,
                    delivery_phone: result.delivery_phone,
                    email: result.email,
                    address: result.address,
                    addressLatLng: JSON.parse(result.addressLatLng),
                    status: result.status,
                    active: result.active,
                    order_date: result.order_date,
                    updated_at: result.updated_at
                };
                accumulator.push(order);
            }
            return accumulator;
        }, []);
        // console.log(orders);
        res.send(orders);
    });
})


router.get('/detail-order/:orderId', async (req:any, res:any) => {
    const orderId = req.params.orderId  
    const query = `SELECT orders.*, users.*, order_items.*, food.*, orders.updated_at, orders.address
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
        full_name: results[0].full_name,
        phone_number: results[0].phone_number,
        receiver: results[0].receiver,
        delivery_phone: results[0].delivery_phone,
        order_date: results[0].order_date,
        email: results[0].email,
        payment_id: results[0].payment_id,
        address: results[0].address,
        addressLatLng: JSON.parse(results[0].addressLatLng),
        status: results[0].status,
        active: results[0].active,
        updated_at: results[0].updated_at
      };
    //   console.log(order);
      res.send(order);
    });
  })


  router.put('/update-order/:orderId', (req, res) => {
    const { orderId } = req.params
    const {status, active} = req.body;
    
    db.query(`UPDATE orders
            SET status = '${status}', active = '${active}', updated_at = NOW()
            WHERE order_id = '${orderId}'`, (err, result) => {
    if (err) {
        console.log(err);
        
        return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
    }
    res.send(result[0]);
    })
})

//total order

router.get('/get-total-orders', async(req, res) => {
    const query = ` SELECT orders.*, users.*, order_items.*, food.*, orders.updated_at, orders.address
                    FROM orders
                    JOIN users ON orders.user_id = users.user_id
                    JOIN order_items ON orders.order_id = order_items.order_id
                    JOIN food ON order_items.food_id = food.food_id
                    WHERE status != '${OrderStatus.NEW}' AND (active = '${OrderStatus.SUCCESS}' OR active = '${OrderStatus.CANCELED}')
                    GROUP BY orders.order_id, order_items.order_item_id
                    `;
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
            
        }
        if (results.length === 0) {
            return res.status(404).send('Order not found');
        }
        
        const orders = results.reduce((accumulator: any, result: any) => {
            const orderIndex = accumulator.findIndex((order: any) => order.order_id === result.order_id);
            const food = {
                food_name: result.food_name,
                price: result.price,
            };
            const orderItem = {
                food: food,
                price: result.price * result.quantity,
                quantity: result.quantity,
            };
            if (orderIndex !== -1) {
                accumulator[orderIndex].items.push(orderItem);
            } else {
                const order = {
                    order_id: result.order_id,
                    items: [orderItem],
                    total_price: result.total_price,
                    user_id: result.user_id,
                    receiver: result.receiver,
                    delivery_phone: result.delivery_phone,
                    email: result.email,
                    address: result.address,
                    addressLatLng: JSON.parse(result.addressLatLng),
                    status: result.status,
                    active: result.active,
                    order_date: result.order_date,
                    updated_at: result.updated_at
                };
                accumulator.push(order);
            }
            return accumulator;
        }, []);
        // console.log(orders);
        res.send(orders);
    });
})

export default router;