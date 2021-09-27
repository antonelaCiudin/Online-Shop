const express = require('express');
const { User } = require('../models/userModel.js');
const expressAsyncHandler = require('express-async-handler');
const { generateToken, isAuth } = require('../utils.js');

const userRouter = express.Router();

userRouter.get("/createadmin",
	expressAsyncHandler(async(req, res) => {
		try {
			const user = new User({
				name:'admin',
				email:'admin@example.com',
				password:'1admin',
				isAdmin: true,
			});

			const createUser = await user.save();
			res.send(createUser);
		} catch(error) {
			res.status(500).send({message:err.message});
		}
	})
);

userRouter.get('/'), 
	expressAsyncHandler(async (req, res) => {
		try {
			const users = await User.values();
			console.log(users);
			res.send(users);
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
})

userRouter.post('/signin', 
	expressAsyncHandler(async (req, res) => {
		const signinUser = await User.findOne({
			email: req.body.email,
			password: req.body.password
		});

		if (!signinUser) {
			res.status(401).send({
				message: 'Invalid Email or Password',
			});
		} else {
			res.send({
				_id:signinUser._id,
				name: signinUser.name,
				email: signinUser.email,
				isAdmin: signinUser.isAdmin,
				token: generateToken(signinUser),
			})
		}
	})
);

userRouter.post('/register', 
	expressAsyncHandler(async (req, res) => {
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		const registerUser = await newUser.save();

		if (!registerUser) {
			res.status(401).send({
				message: 'Invalid Data',
			});
		} else {
			res.send({
				_id: registerUser._id,
				name: registerUser.name,
				email: registerUser.email,
				isAdmin: registerUser.isAdmin,
				token: generateToken(registerUser),
			});
		}
	})
);

userRouter.put('/:id', isAuth,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id);

		if (!user) {
			res.status(404).send({
				message: 'User not Found',
			});
		} else {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			user.password = req.body.password || user.password;
			
			const updatedUser = await user.save();
			res.send({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser),
			});
		}
	})
);

module.exports = {
  userRouter
}