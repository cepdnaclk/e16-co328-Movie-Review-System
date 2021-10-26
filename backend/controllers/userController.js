import { v4 as uuid } from 'uuid';
import User from '../models/userModel.js';


export const getAllUsers = async (req, res) => {
    console.log(`GET : getAllUsers`);
    
    try {
        const user = await User.find();
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = (req, res) => {   
    
    console.log(`POST : createUser`);
    const user = req.body;
    const userId = uuid();
    
    // TODO: POST user to DB

    res.send(`createUser - Not implemented`)
};

export const getUserbyId = (req, res) => {
    
    console.log(`GET : getUserbyId`);
    const Id = req.params.id;

    // TODO: Find by Id from DB

    res.send(`getUserbyId: ${Id} - Not implemented `)
};

export const deleteUserbyId = (req, res) => { 
    
    console.log(`DELETE : deleteUserbyId`);
    const Id = req.params.id;
    
    // TODO: Delete from DB

    res.send(`deleteUserbyId: ${Id} - Not implemented `)
};

export const updateUserbyId =  (req,res) => {
    
    console.log(`PATCH : deleteUserbyId`);
    const Id = req.params.id;
    
    // TODO: validate req.body and Update user

    res.send(`updateUserbyId: ${Id} - Not implemented `)
};