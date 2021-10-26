import User from '../models/userModel.js';
import mongoose from 'mongoose';


export const getAllUsers = async (req, res) => {
    console.log(`GET : getAllUsers`);
    
    try {
        const user = await User.find();
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {

    console.log(`POST : createUser`);

    const { firstName, lastName, email, role, joinDate, password } = req.body;

    const newUser = new User({ 
        _id : new mongoose.Types.ObjectId(),
        firstName, 
        lastName, 
        email, 
        role, 
        joinDate, 
        password 
    });

    try {

        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {

        res.status(409).json({ message: error.message });
    }
};

export const getUserbyId = async (req, res) => {

    console.log(`GET : getUserbyId`);
    
    const {id} = req.params;
   
    try {
        
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (error) {
        
        res.status(404).json({message: error.message})
    }
  
};

export const deleteUserbyId = async (req, res) => {

    console.log(`DELETE : deleteUserbyId`);
    
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: `No user with id: ${id}`});
    }
    
    const deleteduser = await User.findByIdAndRemove(id); 
    res.status(200).json({ message: "User deleted successfully", deleteduser })
};

export const updateUserbyId =  (req,res) => {
    
    console.log(`PATCH : deleteUserbyId`);
    const Id = req.params.id;
    
    // TODO: validate req.body and Update user

    res.send(`updateUserbyId: ${Id} - Not implemented `)
};