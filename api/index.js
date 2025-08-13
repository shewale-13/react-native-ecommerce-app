const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 8000;
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

// Pass Tejas@25 becomes as Tejas%4025 in the connection string
mongoose.connect("mongodb://localhost:27017/e-commerce-project",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
})

app.listen(port, "0.0.0.0", () => {
    console.log("Server is running port 8000")
})

// create endpoints for Register

const User = require('./models/users');
const Order = require('./models/orders');

// Function to send verification email
const sendVerificationEmail = async (email, token) => {
    //create a nodeMailer transport object
    const transporter = nodemailer.createTransport({
        // configure your email service
        service: 'gmail',
        auth : {
            user : 'shewaletejas13@gmail.com',
            pass : 'hzhk qvoc bhhl aqaa'
        }
    })
    // create the email options
    const mailOptions = {
        from: 'amazon.in <no-reply@amazon.in>',
        to: email,
        subject: 'Verify your Account',
        text: `Verify your account: http://localhost:8000/verify/${token}`
    }
    // send the email
    try{
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    }catch(error){
        console.log("Error sending verification email:", error);
    }
} 

app.post('/register', async (req , res) => {
    try{
        const {name, email, password} = req.body;   
        const existingUSer = await User.findOne({email})
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields required" });
        }
        if(existingUSer){
            return res.status(400).json({message: "User already exists"});
        }
        const newUser = new User({name, email, password});

        // generate and save a verification token
        newUser.verificationToken = crypto.randomBytes(20).toString('hex');

        // save the user to the database
        await newUser.save();

        // send verification email
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(200).json({ message: "User registered successfully" });
    }catch(error){
        console.log("Error in registering user:", error);
        res.status(500).json({ message: "Registeration Failed" });
    }
})

// endpoint to verify email
app.get('/verify/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ verificationToken: token });
        if(!user){
            return res.status(400).json({ message: "Invalid verification token" });
        }
        // mark the user as verified
        user.verified = true;
        user.verificationToken = undefined; // clear the token
        await user.save();
    } catch (error) {
        console.log("Error in verifying user:", error);
        res.status(500).json({ message: "Verification Failed" });
    }
})

// endpoint to login user
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}

const secretKey = generateSecretKey();

app.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields required" });
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({ message: "Invalid mail or password" });
        }
        if(user.password !== password){
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({token})
    }catch(error){
        console.log("Error in logging in user:", error);
        res.status(500).json({ message: "Login Failed" });
    }
})

//endpoint to add address
app.post('/addresses', async (req, res) => {
    try{
        const {userId, address} = req.body
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.address.push(address)
        await user.save()
        res.status(200).json({message:"Address added Successfully"})
    }catch(err){
        res.status(500).json({Error:"Can't add address"})
    }
})

//endpoint to get address
app.get('/addresses/:userId', async (req, res) => {
    try{
        const userId = req.params.userId
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"Can't find user"})
        }
        const address = user.address
        res.status(200).json({address})
    }catch(err){
        res.status(500).json({Error:"Error in retrieving address"})
    }
})

// endpoint to store all orders 
app.post('/orders', async (req, res) => {
    try {
        console.log("Incoming order data:", req.body);

        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found for ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        const product = cartItems.map((item) => ({
            name: item?.title,
            quantity: item?.quantity,
            price: item?.price,
            image: item?.image
        }));

        const order = new Order({
            user: userId,
            products: product,
            totalPrice,
            shippingAddress,
            paymentMethod
        });

        await order.save();
        res.status(200).json({ message: "Order stored successfully" });
    } catch (error) {
        console.error("Error creating orders:", error.message, error.stack);
        return res.status(500).json({ message: "Error at creating orders" });
    }
});


// endpoint for userProfile
app.get('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
        if(!user){
            return res.status(500).json({message: "No user found"})
        }
        res.status(200).json({user}) 
    } catch (error) {
        res.status(500).json({message:"Error in fetching user"})
    }
})

app.get('/orders/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const orders = await Order.find({user:userId}).populate("user")
        if(!orders || orders.length === 0){
            return res.status(500).json({message: "No order found in user"})
        }
        res.status(200).json({orders}) 
    } catch (error) {
        cons
        res.status(500).json({message:"Error in fetching orders"})
    }
})



