import { Router } from "express";
import { db } from "../server";

const router = Router();

router.get("/tags", (req, res) => {
    db.query(`SELECT * FROM food_categories`, function(error, results, fields) {
        if(error) throw error;
        res.send(results);
    });
});

router.get("/", (req, res) => {
    db.query(`SELECT * FROM food`, function(error, results, fields) {
        if(error) throw error;
        // console.log(results);
        res.send(results);
    });
})

router.get("/:foodId", (req, res) => {
    const foodId = req.params.foodId
    db.query(`SELECT food.*, food_categories.category_name 
            FROM food
            JOIN food_categories
            ON food.category_id = food_categories.category_id
            WHERE food_id = ${foodId}`, function(error, results, fields) {
            if(error) {
        // console.log(error);
        return res.send(results);
    }
    // console.log(results[0]);
    res.send(results[0]);
});
})

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    // console.log(searchTerm);

    db.query(`SELECT food.*, food_categories.*
            FROM food 
            JOIN food_categories 
            ON food.category_id = food_categories.category_id 
            WHERE food.food_name LIKE '%${searchTerm}%' or food_categories.category_name LIKE '%${searchTerm}%'`, 
            function(error, results, fields) {
                if(error) {
                    console.log(error);
                    res.send({error: "Đã xảy ra sự cố!"});
                }
                // console.log(results);
                res.send(results);
            }
    );
});


router.get("/tag/:tagName", (req, res) => {
    db.query(`SELECT food.*, food_categories.category_name 
        FROM food
        JOIN food_categories 
        ON food.category_id = food_categories.category_id`, 
    function( error, results) {
        if(error) throw error;
        // console.log(results);
        
        res.send(results);
    })
})



export default router;

// router.get("/", (req, res) => {
//     res.send(sample_foods)
// })
// router.get("/tags", (req, res) => {
//     res.send(sample_tags)
// })

// router.get("/tag/:tagName", (req, res) => {
//     const tagName = req.params.tagName;
//     const foods = sample_foods
//     .filter(food => food.tags?.includes(tagName));
//     res.send(foods);
// })

// router.get("/search/:searchTerm", (req, res) => {
//     const searchTerm = req.params.searchTerm;
//     const foods = sample_foods
//     .filter(food => food.name.toLowerCase()
//     .includes(searchTerm.toLowerCase()));
//     res.send(foods);
// })

// router.get("/:foodId", (req, res) => {
//     const foodId = req.params.foodId;
//     const foods = sample_foods
//     .find(food => food.food_id == foodId)
//     res.send(foods);
// })