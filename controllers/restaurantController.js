const db = require("../db");

exports.getRestaurants = (req, res) => {
  db.query("SELECT * FROM restaurants", (err, result) => {
    if (err){
        return res.status(500).json(err);
    }else{
        res.json(result);
    }
  });
};

exports.getMenuByRestaurant = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM menu_items WHERE restaurant_id=?",
    [id],
    (err, result) => {
      if (err){
        return res.status(500).json(err);
      }else{
        res.json(result);
      }
    }
  );
};