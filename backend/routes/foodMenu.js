import express from 'express';
const router = express.Router();
import FoodMenu from '../models/FoodMenu.js';

router.post('/',async (req,res)=>{
    const {day,breakfast,lunch,dinner} = req.body;
    try {
        let menu = await FoodMenu.findOne({day});
        if(menu){
            menu.breakfast = breakfast;
            menu.lunch = lunch;
            menu.dinner = dinner;
            await menu.save();
        }
        else{
        const newFoodMenu = new FoodMenu({
            day,
            breakfast,
            lunch,
            dinner
        });
        await newFoodMenu.save();
    }
        res.status(201).json({message:'Food Menu added successfully'});
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
});

router.get('/',async (req,res)=>{
    try {
        const foodMenu = await FoodMenu.find();
        res.status(200).json(foodMenu);
    } catch (error) {
        res.status(500).json({message:'Server Error'});
    }
});

router.delete('/:day', async (req, res) => {
    try {
      const menu = await FoodMenu.findOneAndDelete({ day: req.params.day });
      if (!menu) return res.status(404).json({ message: 'Menu not found' });
      res.json({ message: 'Menu deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;