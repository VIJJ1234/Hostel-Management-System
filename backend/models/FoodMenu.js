import mongoose from 'mongoose';

const foodMenuSchema = new mongoose.Schema({
    day:{
        type:String,
        required:true
    },
   breakfast:{
         type:String,
    },
    lunch:{
        type:String,
    },
    dinner:{
        type:String,
    },
});

const FoodMenu = mongoose.model('FoodMenu',foodMenuSchema);
export default FoodMenu;