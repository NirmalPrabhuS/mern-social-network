const express = require('express');

const router = express.Router();

const {check,validationResult} = require('express-validator')

const User = require('../../models/User');

const bcyrpt = require('bcryptjs');

const jwt =require('jsonwebtoken');

const config= require('config');

//@route  POST api/users
//@access public 
// @desc   Register user
router.post('/',
[
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter valid email').isEmail(),
    check('password','Please enter 6 or more character').isLength({min:6})
],
async (req,res)=> {  
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    
    const { name,email,password } = req.body;

    try{
    
        //see if user exist

    let user = await User.findOne({email});

        if(user)
        {
          return res.status(400).json({ errors: [ {msg:' User alreay exist'} ] });
        }
           
        
        user = new User({
            name,
            email,
            password
        });

        //encyrpt password
        const salt =   await bcyrpt.genSalt(10);

        user.password =  await bcyrpt.hash(password,salt)

        // inserting user to MongoDB
        await user.save();

        
        //returning json web token
        const payload = {
            user:{id:user.id}
        };

        jwt.sign(
            payload,
            config.get('SecretKey'),
            {expiresIn:360000},
            (err,token)=> {
                if(err) throw err;
                res.json({token});
            }
        );
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server error');
    }
   
});

module.exports=router;
