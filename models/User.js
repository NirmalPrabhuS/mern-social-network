const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
        name:{
            type:String,
            //required:[true,"enter name"]
            required:true
        },
        email:{
            type:String,
            //required:[true,"enter email"],
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
            //required:[true,"enter password"]
        },
        date:{
            type:Date,
            default:Date.now()
        }
    }
    //, {typeKey:'$type'}
    );

    UserSchema.pre("save", async function(next){

        const user=this

        if(user.isModified("password")){
            user.password= await bcrypt.hash(user.password,10);
        }
        next();
    })

    module.exports = User = mongoose.model('user',UserSchema);

