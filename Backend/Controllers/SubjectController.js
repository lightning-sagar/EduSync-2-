import mongoose from "mongoose";
import User from "../Models/User.js";
import Subject from "../Models/Subject.js";
import {v2 as cloudinary} from "cloudinary";

const Addsubject = async (req, res) => {
    try {
        console.log(req.user._id, "req.user._id",req.body);
        const { subjectname, coverImg, description } = req.body;
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
            desc: description
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

const AddNotice = async (req, res) => {
    try {
        const { textContent } = req.body;
        let { imgUrl } = req.body;
        const userId = req.user._id;
        const { Sid } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const subject = await Subject.findById(Sid);
        if (!subject) {
            return res.status(404).json({ error: "Subject not found" });
        }

        if (!textContent) {
            return res.status(400).json({ error: "Notice text content is required" });
        }

        if (imgUrl) {
            const uploadResponse = await cloudinary.uploader.upload(imgUrl)
            imgUrl = uploadResponse.url
        }
        const newNotice = {
            NoticeText: textContent,
            img: imgUrl || null   
        };

        subject.notice.push(newNotice);
        await subject.save();
        return res.status(201).json({ message: "Notice added successfully" });
    } catch (error) {
        // Log error and send server error response
        console.error('Error adding notice:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const GetNotice = async (req, res) => {
    try {
        const { Sid } = req.params;
        const subject = await Subject.findById(Sid);
        if (!subject) {
            return res.status(404).json({ error: "Subject not found" });
        }
        return res.status(200).json(subject.notice);
    } catch (error) {
        console.error('Error getting notices:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {Addsubject,GetSubject,AddNotice,GetNotice};