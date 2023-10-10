const {createUser, loginUser, deposit, withdraw, getUsers, getAllData, deleteUser, transfer} = require('./controllers');
const express = require('express');
const router = express.Router();
const app = require('./server.js');

router.post('/create-account', createUser);
router.post('/login', loginUser);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.get('/users', getUsers);
router.get('/all-data', getAllData);
router.delete('/users/:id', deleteUser);
router.put('/users/:senderId/:recipientId', transfer);


module.exports = router;