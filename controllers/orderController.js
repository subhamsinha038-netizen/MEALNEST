const db = require("../db");

exports.placeOrder = (req, res) => {
  console.log(req.body);
  const { food_name, total_price, images} = req.body;
  const user_id = req.user.id;
  const sql = `INSERT INTO orders (user_id, food_name, total_price, images, status)
               VALUES (?, ?, ?, ?, 'placed')`;
  db.query(sql, [user_id, food_name, total_price, images], (err, result) => {
    if (err){
        return res.status(500).json(err);
    }else{
        res.json({ message: "Order placed", orderId: result.insertId });
    }
  });
};

exports.getMyOrders = (req, res) => {
  const user_id = req.user.id;
  db.query("SELECT * FROM orders WHERE user_id=?", [user_id], (err, result) => {
    if (err){
        return res.status(500).json(err);
    }else{
        res.json(result);
    }
  });
};