const User = require('./models');
const app = require('./server.js');

// Create a new user

async function createUser (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = await User.create({name: name, email: email, password: password});
    console.log(newUser);
    res.json(newUser);
};

//loginUser
async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }


//deposit 
async function deposit(req, res) {
    const { email, amount } = req.body;
    if (!email || !amount) {
      return res.status(400).json({ message: "Email and amount are required" });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.balance += amount;
      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async function withdraw(req, res) {
    const { email, amount } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ message: "Email and amount are required" });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      user.balance -= amount;
      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

//api/users
async function getUsers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

//all data
async function getAllData(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

//delete users
async function deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

//transfer
async function transfer(req, res) {
  const { senderId, recipientId } = req.params;
  const { transferAmount, senderBalance, recipientBalance } = req.body;

  try {
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (sender.balance < transferAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    sender.balance -= transferAmount;
    recipient.balance += transferAmount;

    await sender.save();
    await recipient.save();

    res.json({ message: 'Transfer successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {createUser, loginUser, deposit, withdraw, getUsers, getAllData, deleteUser, transfer};