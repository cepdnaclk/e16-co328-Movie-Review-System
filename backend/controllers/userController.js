import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from '../models/userModel.js';

const jwtSecret = `${process.env.JWT_SECRET}`;

export const getAllUsers = async (req, res) => {
    console.log(`GET : getAllUsers`);

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
        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Inavalid credentials" });
        }

        const token = jwt.sign({
            id: foundUser._id,
            email: foundUser.email,
        },
            jwtSecret,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({result: foundUser, token});

    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({message: "Something went wrong"});
    }
};

export const signup = async (req, res) => {

    console.log(`POST : signup`);

    const { firstName, lastName, email, role, joinDate, password } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

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

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No user with id: ${id}` });
    }

    const deleteduser = await User.findByIdAndRemove(id);
    res.status(200).json({ message: "User deleted successfully", deleteduser });
};

export const updateUserbyId = async (req, res) => {

    console.log(`PATCH : UpdateUserbyId`);

    const { id } = req.params;
    const { firstName, lastName, email, role, joinDate, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No user with id: ${id}` });
    }

    const updatedUser = {
        _id: id,
        firstName,
        lastName,
        email,
        role,
        joinDate,
        password
    };

    const updateduser = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.status(200).json(updateduser);

};