import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: {type: String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    id: String,
    
    


});

const User =  mongoose.model('User', userSchema);
export default User;