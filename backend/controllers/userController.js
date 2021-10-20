import { v4 as uuid } from 'uuid';

export const getAllUsers = (req, res) => {
    console.log(`GET : getAllUsers`);
    
    // TODO: GET users from DB
    
    res.send(`getAllUsers - Not implemented`);
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