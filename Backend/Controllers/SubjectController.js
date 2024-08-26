import mongoose from "mongoose";
import User from "../Models/User.js";
import Subject from "../Models/Subject.js";

const Addsubject = async (req, res) => {
    try {
        console.log(req.user._id, "req.user._id",req.body);
        const { subjectname, coverImg } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!subjectname) {
            return res.status(400).json({ error: "Subject name is required" });
        }

        if (!coverImg) {
            return res.status(400).json({ error: "Cover image is required" });
        }

        const newSubject = new Subject({
            sname: subjectname,
            teacher: user.username, 
            coverImg,
        });

        const savedSubject = await newSubject.save();

        user.class.push({ subject: savedSubject._id });
        await user.save();

        return res.status(201).json({ message: "Subject added successfully", subject: savedSubject });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const GetSubject = async (req,res) => {
    try {
        console.log(req.params.Uid, "req.params");
        const userId = req.params.Uid;

        if(!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const username = user.username;

        const subjects = await Subject.find({ teacher: username });

        if(!subjects) {
            return res.status(404).json({ error: "Subjects not found" });
        }

        return res.status(200).json( subjects );
    } catch (error) {
        console.log(error);
    }
}

export {Addsubject,GetSubject};