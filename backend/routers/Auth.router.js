const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { registerValidation, loginValidation, handleValidationErrors } = require('../Auth-validation/validation');
const jwt = require('jsonwebtoken');


router.post('/register', registerValidation, handleValidationErrors,  async(req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

   await newUser.save()
    .then(()=>{
        res.status(201).json({ message: 'Registration successful!' });
    })
.catch((error)=>{
        console.error('Registration mein error:', error);
        if(error.code === 11000){
            res.status(400).json({ message: 'Email already exists.' });
        }else{
            res.status(500).json({ message: 'Server error. Registration failed.' });
        }
    });


});

router.post('/login', loginValidation, handleValidationErrors, async (req,res)=>{
    const { email, password } = req.body;
try{
    const userfind = await User.findOne({ email });
    if(!userfind){
        res.status(400).json({ message: 'Invalid credentials' });
    }
    const  isMatch = await userfind.comparePassword(password);
    if(!isMatch){
        res.status(400).json({ message: 'Invalid credentials' });
    }
    // JWT token generate karna
   const playload = { user: { id: userfind.id } }  
  
    jwt.sign(playload , process.env.JWT_SECRET,{expiresIn:'1h'}, (err, token)=>{
        if(err) throw err;
        res.status(200).json({ message: 'Login successful!', token: token });
       
    }
    );
}catch(error){
    console.error('Login mein error:', error);
    res.status(500).json({ message: 'Server error. Login fail ho gaya.' });
}

});




module.exports = router;