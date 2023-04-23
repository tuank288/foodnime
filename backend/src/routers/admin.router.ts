import { Router } from "express";
import { db } from "../server";
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, HTTP_OK } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

router.get('/get-users', (req, res) => {
    db.query('SELECT * FROM users', (error, result) => {
        if(error) throw error;
        res.send(result);
    })
})

router.get('/orders', (req, res) => {
    db.query(`SELECT * FROM orders WHERE status = 'PAYED'`, (error, result) => {
        if(error) throw error;
        res.send(result);
    })
})

router.get('/totalPrice', (req, res) => {
    db.query(`SELECT total_price FROM orders WHERE status = 'PAYED'`, (error, result) => {
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
        res.send(result);
    })
})

router.post('/post-foods', (req, res) => {
    const { category_id, food_image, food_name, price } = req.body;

    if (!category_id || category_id.length === 0) {
        return res.status(HTTP_BAD_REQUEST).send('At least one category must be specified');
    }

    db.query(`INSERT INTO food(category_id ,restaurant_id, food_image, food_name, price, created_at, updated_at)
            VALUES ('${category_id}',1, '${food_image}', '${food_name}', '${price}', NOW(), NOW())`, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        } else {
            console.log(`Inserted ${result.affectedRows} row(s) into food.`);
        }        
        res.send(result);       
    })
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

    if (!category_id || category_id.length === 0) {
        return res.status(HTTP_BAD_REQUEST).send('At least one category must be specified');
    }

    db.query(`UPDATE food 
            SET category_id = '${category_id}', food_image = '${food_image}', food_name = '${food_name}', price = '${price}', updated_at = NOW() 
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

    if (!category_name) {
        return res.status(HTTP_BAD_REQUEST).send('Please provide category name.');
    }

    db.query(`INSERT INTO food_categories(category_image, category_name, created_at, updated_at)
            VALUES ('${category_image}', '${category_name}', NOW(), NOW())`, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
        } else {
            console.log(`Inserted ${result.affectedRows} row(s) into food.`);
        }        
        res.send(result);       
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

    db.query(`UPDATE food_categories 
            SET category_image = '${category_image}', category_name = '${category_name}', updated_at = NOW() 
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

    if (!full_name && !email && !phone_number && !password && !address && !role) {
        return res.status(HTTP_BAD_REQUEST).send('Please provide category name.');
    }

    const query = 'SELECT * FROM users WHERE email = ? OR phone_number = ?';
    const values = [email, phone_number];

    db.query(query, values, async (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else if (result.length > 0) {
        res.status(HTTP_BAD_REQUEST).send("Email hoặc số điện thoại đã tồn tại!");
        }else {
            const encryptedPassword = await bcrypt.hash(password, 8);
            const query = 'INSERT INTO users (full_name, email, phone_number, password, address, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
            const values = [full_name, email, phone_number, encryptedPassword, address, role];

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
    db.query(`SELECT * FROM users 
            WHERE user_id = '${userId}'`, async (error, result) => {
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
    const { full_name, email, phone_number, address, role} = req.body;

    // if (!category_name) {
    //     return res.status(HTTP_BAD_REQUEST).send('Please provide category name.');
    // }

    db.query(`UPDATE food_categories 
            SET full_name = '${full_name}', phone_number = '${phone_number}', address = '${address}', role = '${role}', updated_at = NOW() 
            WHERE user_id = '${userId}'`, (err, result) => {
    if (err) {
        console.log(err);
        
        return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Internal server error');
    }
    res.send(result[0]);
    })
})


export default router;