const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (name,email,password,address) VALUES (?,?,?,?)";
  db.query(sql, [name, email, hashedPassword, address], async (err, result) => {
    if (err){
        return res.status(500).json(err);
    }
      res.json({ message: "User registered successfully", 
        user : {
          name : name,
          email : email,
          address : address      
        }
       });
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (err){
        return res.status(500).json(err);
    }        
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign(
      { id: user.id, 
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token, user:{
      name : user.name,
      email : user.email,
      address : user.address
    } });
  });
};