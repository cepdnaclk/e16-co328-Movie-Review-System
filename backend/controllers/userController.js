import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from '../models/userModel.js';

const jwtSecret = `${process.env.JWT_SECRET}`;

export const getAllUsers = async (req, res) => {
    console.log(`GET : getAllUsers`);

    // check if user authenticated: auth middleware adds userid to request
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    try {
        const user = await User.find();
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const signin = async (req, res) => {
    console.log(`POST : signin`);

    const { email, password } = req.body;

    try {
        // find the user for the given email
        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        // compare the encrypted password
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Inavalid credentials" });
        }

        // generates a jsonwebtoken with the id,email and jwtSecret(from env variables) and token expires in one hour.
        const token = jwt.sign({
            id: foundUser._id,
            email: foundUser.email,
        },
            jwtSecret,
            {
                expiresIn: "1h"
            }
        );

        // sends the loggeduser's data and the token
        res.status(200).json({ result: foundUser, token });

    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async (req, res) => {

    console.log(`POST : signup`);

    // get signup POST data from the request body 
    const { firstName, lastName, email, role, joinDate, password } = req.body;

    try {

        // check whether the email has used before as a user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName,
            lastName,
            email,
            role,
            joinDate,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {

        res.status(409).json({ message: error.message });
    }
};

export const getUserbyId = async (req, res) => {

    console.log(`GET : getUserbyId`);

    // check if user authenticated: auth middleware adds userid to request
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    // get user id from request parameters
    const { id } = req.params;

    try {

        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }

};

export const deleteUserbyId = async (req, res) => {

    console.log(`DELETE : deleteUserbyId`);

    // check if user authenticated: auth middleware adds userid to request
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    const { id } = req.params;

    // check whether the requsted id is valid ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No user with id: ${id}` });
    }

    // find for the user to be deleted
    const deluser = await User.findById(id);

    // A user can only delete his/her user data.(check with authenticated id and user id)
    if (deluser._id == req.userId) {
        // remove the data from database
        const deleteduser = await User.findByIdAndRemove(id);
        res.status(200).json({ message: "User deleted successfully", deleteduser });

    } else {
        res.status(403).json({ message: "Cannot delete other accounts" });
    }

};

export const updateUserbyId = async (req, res) => {

    console.log(`PATCH : UpdateUserbyId`);

    // check if user authenticated: auth middleware adds userid to request
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    // get user id from parameters and the data to be updated from the request body
    const { id } = req.params;
    const { firstName, lastName, email, role, joinDate, oldPassword, newPassword } = req.body;

    try {

        // check whether the requsted id is valid ObjectId type
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No user with id: ${id}` });
        }

        // find for the user to be updated
        const existingUser = await User.findById(id);

        // A user can only update his/her user data.(check with authenticated id and user id)
        if (existingUser._id != req.userId) {
            return res.status(403).json({ message: "Cannot update other accounts" });
        }

        const updateUserData = {
            _id: id,
            firstName,
            lastName,
            email,
            role,
            joinDate
        };

        // response message
        const resMsg = {};

        // check whether user wants to update password (if these properties ae present in the req.body)
        if (oldPassword && newPassword) {

            // compare the existing password with oldpassword
            const isPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);

            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Inavalid credentials" });
            }

            // encrypt the newPassword 
            const hashedPassword = await bcrypt.hash(newPassword, 12);

            // add the password property to the updateduserdata
            updateUserData.password = hashedPassword;

            // set a messag for password acknowledement in the response json message
            resMsg.pswdAck = "Password updates";
        }

        // update new data in the database
        const updateduser = await User.findByIdAndUpdate(id, updateUserData, { new: true });

        // set a messag for succesful updaes in the response json message
        resMsg.message = "User updated successfully";

        res.status(200).json({ resMsg, updateduser });


    } catch (error) {
        res.status(409).json({ message: "server error" });
    }

};