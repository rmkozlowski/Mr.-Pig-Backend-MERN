const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  balance: { type: Number, required: true },
});

// Define the user model
const User = mongoose.model('User', userSchema);

// Connect to the database
mongoose.connect('mongodb+srv://rmkozlowski31:Kozlowski1!@cluster0.adctlef.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the DAL functions
async function getUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get users');
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get user with ID ${id}`);
  }
}

async function createUser(data) {
  try {
    const user = new User(data);
    await user.save();
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
}

async function updateUser(id, data) {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to update user with ID ${id}`);
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to delete user with ID ${id}`);
  }
}

// Export the DAL functions
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};